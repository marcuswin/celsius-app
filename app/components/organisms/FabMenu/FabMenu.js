import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
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
import { KYC_STATUSES } from "../../../constants/DATA";

@connect(
  state => ({
    fabMenuOpen: state.ui.fabMenuOpen,
    theme: state.ui.theme,
    appInitialized: state.app.appInitialized,
    fabType: state.ui.fabType,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
    celpayCompliance: state.user.compliance.celpay,
    depositCompliance: state.user.compliance.deposit,
    loanCompliance: state.user.compliance.loan,
    withdrawCompliance: state.user.compliance.withdraw,
    user: state.user.profile,
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
      menuItems: this.getMenuItems(fabType)
    });
  }

  componentDidUpdate = (prevProps) => {
    if ((prevProps.fabType !== this.props.fabType && this.props.fabType !== 'hide') || (prevProps.kycStatus !== this.props.kycStatus)) {
      this.setState({
        menuItems: this.getMenuItems(this.props.fabType)
      });
    }
  };

  getMenuItems(menu) {
    const {depositCompliance, celpayCompliance, loanCompliance, withdrawCompliance, user} = this.props;
    const main = [
      [
        { label: 'Wallet', screen: 'WalletLanding' },
      ],
      [],
      [
        { label: 'Settings', screen: 'Settings' },
        // { label: 'Community', screen: 'CommunityFab' },
        // { label: 'Support', screen: 'SupportFab' }
      ]
    ];
    if (depositCompliance.allowed) main[0].push({ label: 'Deposit', screen: 'Deposit' });
    if (withdrawCompliance.allowed) main[0].push({ label: 'Withdraw', screen: 'WithdrawEnterAmount' });
    if (celpayCompliance.allowed) main[1].push({ label: 'CelPay', screen: 'CelPayChooseFriend' });
    if (loanCompliance.allowed) main[1].push({ label: 'Borrow', screen: 'BorrowLanding' });
    if (user) main[1].push({label: "Settings", screen: "Profile"});

    return {
      main,
      support: [],
    }[menu];
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
        return 'celsius';
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
    return <CircleButton key={item.label} theme={theme} onPress={() => { actions.resetToFlow(item.screen); actions.closeFabMenu() }} type="menu" text={item.label} icon={item.label} iconSize={33} />;
  }

  renderFabMenu = () => {
    const style = FabMenuStyle();
    const { menuItems } = this.state;
    const { actions } = this.props;
    const tintColor = this.getTintColor();

    if (Platform.OS !== 'android') {
      return (
        <BlurView tint={tintColor} intensity={100} style={[StyleSheet.absoluteFill, style.menuContainer]} >
          <View>
            {menuItems.map(this.renderMenuRow)}
          </View>
        </BlurView>
      )
    }
    return (
      <TouchableOpacity style={[StyleSheet.absoluteFill, style.menuContainer, style.background]} onPress={() => actions.closeFabMenu()}>
        {menuItems.map(this.renderMenuRow)}
      </TouchableOpacity>

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
