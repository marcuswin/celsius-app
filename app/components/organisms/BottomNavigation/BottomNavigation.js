import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import { View } from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import Icon from '../../atoms/Icon/Icon';
import * as actions from "../../../redux/actions";
import {STYLES} from "../../../config/constants/style";

import BottomNavigationStyle from "./BottomNavigation.styles";

@connect(
  state => ({
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class BottomNavigation extends Component {
  static propTypes = {
    navItems: PropTypes.instanceOf(Array),
  }

  static defaultProps = {
    navItems: [
      { label: 'Portfolio', screen: 'Home', icon: 'Portfolio', active: ['ManageCoins'] },
      { label: 'Borrow', screen: 'EstimatedLoan', icon: 'Borrow', active: [] },
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
      <TouchableOpacity key={ navItem.label } onPress={ () => state !== 'Active' ? navigateTo(navItem.screen) : null }>
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
    const { navItems } = this.props;
    return (
      <View style={BottomNavigationStyle.container}>
        { navItems.map(this.renderNavItem) }
      </View>
    );
  }
}

export default BottomNavigation;
