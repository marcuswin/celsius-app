import React, { Component } from 'react';
// import { View, Text } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import BorrowStyle from "./Borrow.styles";
import StaticScreen from "../StaticScreen/StaticScreen";

@connect(
  state => ({
    style: BorrowStyle(state.ui.theme),
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Borrow extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      header: { title: "Enter the amount", right: "info" },
    };
  }

  render() {
    const { header } = this.state
    // const { style } = this.props
    return (
      <StaticScreen
        header={header}
        emptyState={{
          heading:"Under Construction",
          paragraphs: ['Borrow Flow is still under construction!', 'Everybody is working really hard.'],
          support: true,
        }}
      />
    );
  }
}

export default testUtil.hookComponent(Borrow);
