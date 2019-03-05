import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import BorrowConfirmStyle from "./BorrowConfirm.styles";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BorrowConfirm extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: "BorrowConfirm Screen",
        left: "back",
        right: "profile"
      }
    };
  }

  render() {
    const { header } = this.state;
    // const style = BorrowConfirmStyle();
    
    return (
      <RegularLayout header={header}>
        <CelText>Hello BorrowConfirm</CelText>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(BorrowConfirm);
