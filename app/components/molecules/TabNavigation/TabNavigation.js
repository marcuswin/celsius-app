import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import TabNavigationStyle from "./TabNavigation.styles";
import * as appActions from "../../../redux/actions";
import testUtil from "../../../utils/test-util";
import { analyticsEvents } from "../../../utils/analytics-util";

@connect(
  state => ({
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TabNavigation extends Component {
  static propTypes = {
    // [{ label, screen }]
    tabs: PropTypes.instanceOf(Array).isRequired,
  }

  static defaultProps = {
    isLoaded: true
  }

  // lifecycle methods
  // event hanlders
  goToScreen = (tab) => {
    this.props.actions.navigateTo(tab.screen);
    analyticsEvents.changeTab(tab.label)
  }

  // rendering methods
  renderTab = (tab) => {
    const { activeScreen } = this.props;
    const tabStyle = tab.screen === activeScreen ? TabNavigationStyle.activeTab : TabNavigationStyle.inactiveTab;
    const textStyle = tab.screen === activeScreen ? TabNavigationStyle.activeText : TabNavigationStyle.inactiveText;
    return (
      <TouchableOpacity ref={testUtil.generateTestHook(this, `TabNavigation.${tab.label}`)} key={tab.label} onPress={() => this.goToScreen(tab)} style={tabStyle}>
        <Text style={textStyle}>{tab.label.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { tabs, isLoaded } = this.props;
    return (
      <View style={TabNavigationStyle.tabs}>
        {isLoaded && tabs.map(this.renderTab)}
      </View>
    );
  }
}

export default testUtil.hookComponent(TabNavigation);
