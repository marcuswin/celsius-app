import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import { View } from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import Icon from '../../atoms/Icon/Icon';
import * as actions from "../../../redux/actions";
import { actions as mixpanelActions } from '../../../services/mixpanel'
import {STYLES} from "../../../config/constants/style";


import BottomNavigationStyle from "./BottomNavigation.styles";

const walletScreens = ['NoKyc', 'WalletLanding', 'WalletDetails', 'Home', 'AmountInput', 'ConfirmTransaction', 'TransactionDetails'];

@connect(
  state => ({
    activeScreen: state.nav.routes[state.nav.index].routeName,
    bottomNavigationDimensions: state.ui.dimensions.bottomNavigation,
    screenHeight: state.ui.dimensions.screenHeight,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class BottomNavigation extends Component {
  static propTypes = {
    navItemsLeft: PropTypes.instanceOf(Array),
    navItemsRight: PropTypes.instanceOf(Array),
  }

  static defaultProps = {
    navItemsLeft: [
      { label: 'Portfolio', screen: 'Portfolio', icon: 'Portfolio', active: ['ManageCoins'] },
      { label: 'Borrow', screen: 'EstimatedLoan', icon: 'Borrow', active: [] },
    ],
    navItemsRight: [
      { label: 'Lend', screen: 'DepositCoins', icon: 'Lend', active: [] },
      { label: 'Profile', screen: 'Profile', icon: 'Profile', active: ['ChangePassword', 'ProfileImage'] },
    ]
  }

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
    // binders

    this.renderNavItem = this.renderNavItem.bind(this);
  }

  // lifecycle methods
  // event hanlders
  // rendering methods
  renderNavItem(navItem) {
    const { activeScreen, navigateTo } = this.props;
    const state = (navItem.active && navItem.active.indexOf(activeScreen) !== -1) || navItem.screen === activeScreen ? 'Active' : 'Inactive';

    const iconFill = state === 'Active' ? STYLES.PRIMARY_BLUE : '#3D4853';
    const iconStyle = state === 'Active' ? { opacity: 1 } : { opacity: 0.5 };

    return (
      <TouchableOpacity
        key={ navItem.label }
        onPress={ () => {
          mixpanelActions.navigation(navItem.label);
          if (state !== 'Active') {
            navigateTo(navItem.screen)
          }
        }}>
        <View style={BottomNavigationStyle[`item${state}`]} >
          <View style={BottomNavigationStyle.iconWrapper}>
            <Icon style={iconStyle} height="25" width="25" name={ navItem.icon } fill={ iconFill } />
          </View>
          <Text style={BottomNavigationStyle[`text${state}`]}>{ navItem.label }</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { navItemsLeft, navItemsRight, bottomNavigationDimensions, screenHeight, activeScreen, navigateTo } = this.props;

    const styles = {
      height: bottomNavigationDimensions.height,
      top: screenHeight - bottomNavigationDimensions.height,
      paddingBottom: bottomNavigationDimensions.paddingBottom,
    }

    const state = walletScreens.indexOf(activeScreen) !== -1 ? 'Active' : 'Inactive';

    return (
      <View style={[ BottomNavigationStyle.container, styles ]}>
        { navItemsLeft.map(this.renderNavItem) }

        <TouchableOpacity
          onPress={ () => {
            mixpanelActions.navigation('Home');
            navigateTo('Home');
          }}>
          <View style={BottomNavigationStyle.wallet} >
            <View style={BottomNavigationStyle[`celsius${state}`]}>
              <Icon name="CelsiusLogo" fill="white" width={30} height={30} viewBox="0 0 32 32" />
            </View>
            <Text style={BottomNavigationStyle[`text${state}`]}>Wallet</Text>
          </View>
        </TouchableOpacity>

        { navItemsRight.map(this.renderNavItem) }
      </View>
    );
  }
}

export default BottomNavigation;
