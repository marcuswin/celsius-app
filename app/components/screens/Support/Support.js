import React, { Component } from 'react';
// import { View, Text } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import SupportStyle from "./Support.styles";
import StaticScreen from "../StaticScreen/StaticScreen";
import { EMPTY_STATES } from "../../../constants/UI";

@connect(
  state => ({
    style: SupportStyle(state.ui.theme),
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Support extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: "Chat with support",
        right: "close"
      }
    };
  }

  render() {
    const { header } = this.state
    // const { style } = this.props
    return (
      <StaticScreen
        header={header}
        emptyState={{ purpose: EMPTY_STATES.USER_CLEARED }}
      />
    );
  }
}

export default testUtil.hookComponent(Support);
