import React, { Component } from 'react';
// import { View, Text } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import CelPayStyle from "./CelPay.styles";
import StaticScreen from "../StaticScreen/StaticScreen";
import { EMPTY_STATES } from "../../../constants/UI";

@connect(
  state => ({
    style: CelPayStyle(state.ui.theme),
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelPay extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      header: { title: "Choose a friend to CelPay", right: "search" }
    };
  }

  render() {
    const { header } = this.state;
    // const { style } = this.props
    return (
      <StaticScreen
        header={header}
        emptyState={{ purpose: EMPTY_STATES.ERROR }}
      />
    );
  }
}

export default testUtil.hookComponent(CelPay);
