import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
// import {} from 'native-base';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// import {STYLES} from "../../config/constants/style";
import TabNavigationStyle from "./TabNavigation.styles";
import * as appActions from "../../../redux/actions";
import { mixpanelEvents } from "../../../services/mixpanel";

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

  // lifecycle methods
  // event hanlders
  goToScreen = (tab) => {
    this.props.actions.navigateTo(tab.screen);
    mixpanelEvents.changeTab(tab.label)
  }

  // rendering methods
  renderTab = (tab) => {
    const { activeScreen } = this.props;
    const tabStyle = tab.screen === activeScreen ? TabNavigationStyle.activeTab : TabNavigationStyle.inactiveTab;
    const textStyle = tab.screen === activeScreen ? TabNavigationStyle.activeText : TabNavigationStyle.inactiveText;
    return (
      <TouchableOpacity key={ tab.label } onPress={() => this.goToScreen(tab)} style={tabStyle}>
        <Text style={textStyle}>{ tab.label.toUpperCase() }</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { tabs } = this.props;
    return (
      <View style={TabNavigationStyle.tabs}>
        { tabs.map(this.renderTab) }
      </View>
    );
  }
}

export default TabNavigation;
