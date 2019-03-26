import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
// import BlurOverlay, { closeOverlay, openOverlay } from 'react-native-blur-overlay';
// import { BlurView, VibrancyView } from 'react-native-blur';
import { BlurView } from 'expo';
import * as appActions from "../../../redux/actions";
import testUtil from "../../../utils/test-util";
import FabMenuStyle from "./FabMenu.styles";
import Fab from '../../molecules/Fab/Fab';
import CircleButton from '../../atoms/CircleButton/CircleButton';
import { THEMES } from '../../../constants/UI';


function getMenuItems(menu) {
  return {
    main: [
      [
        { label: 'Wallet', screen: 'WalletFab' },
        { label: 'Borrow', screen: 'BorrowFab' },
        { label: 'CelPay', screen: 'CelPayFab' },
      ],
      [
        { label: 'Deposit', screen: 'DepositFab' },
        { label: 'Settings', screen: 'ProfileFab' },
        { label: 'Support', screen: 'SupportFab' },
      ],
      [
        { label: 'Community', screen: 'CommunityFab' },
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
    fabType: state.ui.fabType
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class FabMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
    };
  }

  componentDidMount = () => {
    const { fabType } = this.props;
    this.setState({
      menuItems: getMenuItems(fabType)
    });
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.fabType !== this.props.fabType && this.props.fabType !== 'hide') {
      this.setState({
        menuItems: getMenuItems(this.props.fabType)
      });
    }
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
    const { actions, fabType } = this.props;
    switch (fabType) {
      case 'main':
        this.toggleMenu();
        break;

      case 'support':
        actions.navigateTo('SupportFab');
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
    return <CircleButton key={item.label} theme={theme} onPress={() => { actions.navigateTo(item.screen); actions.closeFabMenu() }} type="menu" text={item.label} icon={item.label} iconSize={35} />;
  }

  renderFabMenu = () => {
    const style = FabMenuStyle();
    const { menuItems } = this.state;
    const tintColor = this.getTintColor();

    if (Platform.OS !== 'android') {
      return (
        <BlurView tint={tintColor} intensity={90} style={[StyleSheet.absoluteFill, style.menuContainer]} >
          <View>
            {menuItems.map(this.renderMenuRow)}
          </View>
        </BlurView>
      )
    }
    return (
      <View style={[StyleSheet.absoluteFill, style.menuContainer, style.background]}>
        {menuItems.map(this.renderMenuRow)}
      </View>

    )

  }

  renderFab = () => {
    const style = FabMenuStyle();
    const { fabType } = this.props;
    return (
      <View style={style.container}>
        <Fab onPress={this.fabAction} type={fabType} />
      </View>
    );
  }

  render() {
    const style = FabMenuStyle();
    const { fabMenuOpen, appInitialized, fabType } = this.props

    if (!appInitialized) return null;
    if (fabType === 'hide') return null;

    const FabMenuCmp = this.renderFabMenu;
    const FabButton = this.renderFab;

    return (
      <Fragment>
        {fabMenuOpen ? <FabMenuCmp style={style.menu} /> : null}
        <FabButton />
      </Fragment>
    )
  }
}

export default testUtil.hookComponent(FabMenu);
