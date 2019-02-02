import React, { Component } from 'react';
// import { View, Text } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import CommunityStyle from "./Community.styles";
import StaticScreen from "../StaticScreen/StaticScreen";
import { EMPTY_STATES } from "../../../constants/UI";

@connect(
  state => ({
    style: CommunityStyle(state.ui.theme),
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Community extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: "Celsius Community",
        right: "profile"
      }
    };
  }

  render() {
    const { header } = this.state;
    // const { style } = this.props
    return (
      <StaticScreen
        header={header}
        emptyState={{ purpose: EMPTY_STATES.NO_DATA }}
      />
    );
  }
}

export default testUtil.hookComponent(Community);
