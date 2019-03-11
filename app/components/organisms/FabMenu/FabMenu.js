import React, { Component, Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { BlurView } from 'expo';

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import FabMenuStyle from "./FabMenu.styles";
import Fab from '../../molecules/Fab/Fab';
import CircleButton from '../../atoms/CircleButton/CircleButton';
import { THEMES } from '../../../constants/UI';

function getMenuItems(menu) {
  return {
    main: [
      [
        { label: 'Wallet', screen: 'WalletLanding' },
        { label: 'Borrow', screen: 'BorrowLanding' },
        { label: 'CelPay', screen: 'CelPayFab' },
      ],
      [
        { label: 'Deposit', screen: 'DepositFab' },
        { label: 'Settings', screen: 'ProfileFab' },
        { label: 'Support', screen: 'Support' },
      ],
      [
        { label: 'Community', screen: 'Community' },
      ]
    ],
    support: [],
  }[menu];
}

@connect(
  state => ({
    fabMenuOpen: state.ui.fabMenuOpen,
    theme: state.ui.theme,
    appInitialized: state.app.appInitialized,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class FabMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
      type: 'main'
    };
  }

  componentDidMount = () => {
    this.setState({
      menuItems: getMenuItems('main')
    });
  }

  // componentWillReceiveProps() {
  //   const nextScreen = "home"
  //   const currScreen = "home"
  //   if (nextScreen !== currScreen && (nextScreen === 'support' || currScreen === 'support')) {
  //     const menuType = nextScreen === 'support' ? 'support' : 'menuType'
  //     this.setState({
  //       type: menuType,
  //       menuItems: getMenuItems(menuType)
  //     });
  //   }
  // }

  getTintColor = () => {
    const { theme } = this.props;

    switch (theme) {
      case THEMES.LIGHT:
        return 'light';
      case THEMES.DARK:
        return 'dark';
      case THEMES.CELSIUS:
        return 'dark';
      default:
        return 'light'
    }
  }

  fabAction = () => {
    const { type } = this.state;
    const { actions } = this.props;
    switch (type) {
      case 'main':
        this.toggleMenu();
        break;

      case 'support':
        actions.navigateTo('Support');
        break;

      default:
        break;
    }
  }

  toggleMenu = () => {
    const { fabMenuOpen, actions } = this.props;
    if (fabMenuOpen) {
      actions.closeFabMenu()
    } else {
      actions.openFabMenu()
    }
  }

  renderMenuRow = (menuRow) => {
    const style = FabMenuStyle();

    return (
      <View key={menuRow[0].label} style={style.menuItemsContainer}>
        {menuRow.map(this.renderMenuItem)}
      </View>
    );
  }

  renderMenuItem = (item) => {
    const { theme, actions } = this.props;
    return <CircleButton key={item.label} theme={theme} onPress={() => { actions.navigateTo(item.screen); actions.closeFabMenu() }} type="menu" text={item.label} icon={item.label} />;
  }

  renderFabMenu = () => {
    const style = FabMenuStyle();
    const { menuItems } = this.state;
    const tintColor = this.getTintColor();

    return (
      <BlurView tint={tintColor} intensity={90} style={[StyleSheet.absoluteFill, style.menuContainer]}>
        {menuItems.map(this.renderMenuRow)}
      </BlurView>
    )
  }

  renderFab = () => {
    const style = FabMenuStyle();
    const { type } = this.state;
    return (
      <View style={style.container}>
        <Fab onPress={this.fabAction} type={type} />
      </View>
    );
  }

  render() {
    const { fabMenuOpen, appInitialized } = this.props

    if (!appInitialized) return null;

    const FabMenuCmp = this.renderFabMenu;
    const FabButton = this.renderFab;

    return (
      <Fragment>
        {fabMenuOpen ? <FabMenuCmp /> : null}
        <FabButton />
      </Fragment>
    )
  }
}

export default testUtil.hookComponent(FabMenu);
