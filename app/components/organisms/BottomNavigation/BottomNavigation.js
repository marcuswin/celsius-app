import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, Platform } from 'react-native';
import { View } from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import testUtil from "../../../utils/test-util";

import Icon from '../../atoms/Icon/Icon';
import * as appActions from "../../../redux/actions";
import {STYLES} from "../../../config/constants/style";


import BottomNavigationStyle from "./BottomNavigation.styles";

const walletScreens = [
  'NoKyc',
  'WalletTransactions',
  'WalletBalance',
  'WalletDetails',
  'WalletInterest',
  'Home',
  'AmountInput',
  'ConfirmTransaction',
  'TransactionDetails'
];

@connect(
  state => ({
    activeScreen: state.nav.routes[state.nav.index].routeName,
    bottomNavigationDimensions: state.ui.dimensions.bottomNavigation,
    screenHeight: state.ui.dimensions.screenHeight,
    user: state.users.user,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BottomNavigation extends Component {
  static propTypes = {
    navItemsLeft: PropTypes.instanceOf(Array),
    navItemsRight: PropTypes.instanceOf(Array),
  }

  static defaultProps = {
    navItemsLeft: [
      { label: 'Borrow', screen: 'LoanApplication', icon: 'Borrow', active: [] },
      { label: 'Earn', screen: 'InterestCalculator', icon: 'Lend', active: ['HowToEarnInterest', 'InterestCalculator'] },
    ],
    navItemsRight: [
      { label: 'Pay', screen: 'SelectCoin', icon: 'Pay', active: [] },
      { label: 'Profile', screen: 'Profile', icon: 'Profile', active: ['TwoFAInfo', "ProfileSettings", 'ProfileImage', "TwoFaAuthAppConfirmation", "TwoFaAuthAppConfirmationCode", "TwoFaWelcome", "TwoFaAuthSuccess"] },
    ]
  }

  // lifecycle methods
  // event hanlders
  goToScreen = (navItem) => {
    const { actions } = this.props;
    actions.navigateTo(navItem.screen);
  }

  goToHomeScreen = () => {
    const { actions } = this.props;
    actions.navigateTo('Home');
  }
  // rendering methods
  renderNavItem = (navItem) => {
    const { activeScreen } = this.props;
    const state = (navItem.active && navItem.active.indexOf(activeScreen) !== -1) || navItem.screen === activeScreen ? 'Active' : 'Inactive';

    const iconFill = state === 'Active' ? STYLES.PRIMARY_BLUE : '#3D4853';
    const iconStyle = state === 'Active' ? { opacity: 1 } : { opacity: 0.5 };

    return (
      <TouchableOpacity
      ref={testUtil.generateTestHook(this, `BottomNavigation.${navItem.label}`)}

        key={ navItem.label }
        onPress={ () => this.goToScreen(navItem) }

      >
        <View style={BottomNavigationStyle[`item${state}`]} >
          <View style={BottomNavigationStyle.iconWrapper}>
            <Icon style={iconStyle} height="25" width="25" name={ navItem.icon } fill={ iconFill } />
          </View>
          <Text style={BottomNavigationStyle[`text${state}`]}>{ navItem.label }</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderHomeButton(navItem) {
    const { activeScreen } = this.props;

    const ios = walletScreens.indexOf(activeScreen) !== -1 ? 'Active' : 'Inactive';
    const state = (navItem.active && navItem.active.indexOf(activeScreen) !== -1) || navItem.screen === activeScreen ? 'Active' : 'Inactive';

    const iconFill = state === 'Active' ? STYLES.PRIMARY_BLUE : '#3D4853';
    const iconStyle = state === 'Active' ? { opacity: 1 } : { opacity: 0.5 };

    if (Platform.OS === 'ios') {
      return (
      <TouchableOpacity
        onPress={ () => this.goToHomeScreen()}
      >
        <View style={BottomNavigationStyle.wallet} >
          <View style={BottomNavigationStyle.celWrapper}>
            <View style={BottomNavigationStyle[`celsius${ios}`]}>
              <Icon name="CelsiusLogo" fill="white" width={30} height={30} viewBox="0 0 32 32" />
            </View>
          </View>
          <Text style={BottomNavigationStyle[`text${ios}`]}>Wallet</Text>
        </View>
      </TouchableOpacity>
      )
    }

    if (Platform.OS === 'android') {
      return (
        <TouchableOpacity
          onPress={ () => this.goToHomeScreen()}
        >
          <View style={BottomNavigationStyle[`item${state}`]} >
            <View style={BottomNavigationStyle.iconWrapper}>
              <Icon name="CelsiusLogo" width={25} height={25} viewBox="0 0 32 32" style={[iconStyle, {marginBottom: 0}]} fill={ iconFill } />
            </View>
            <Text style={BottomNavigationStyle[`text${state}`]}>{ navItem.label }</Text>
          </View>
        </TouchableOpacity>
      )
    }
  };

  render() {
    const { navItemsLeft, navItemsRight, bottomNavigationDimensions, screenHeight } = this.props;

    const styles = {
      height: bottomNavigationDimensions.height,
      top: screenHeight - bottomNavigationDimensions.height,
      paddingBottom: bottomNavigationDimensions.paddingBottom,
    }

    return (
      <View style={[ BottomNavigationStyle.container, styles ]}>
        { navItemsLeft.map(this.renderNavItem) }

        { this.renderHomeButton({ label: 'Wallet', screen: 'Home', icon: 'CelsiusLogo', active: walletScreens }) }

        { navItemsRight.map(this.renderNavItem) }
      </View>
    );
  }
}

export default testUtil.hookComponent(BottomNavigation);
