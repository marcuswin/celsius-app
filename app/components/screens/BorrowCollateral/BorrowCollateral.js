import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import BorrowCollateralStyle from "./BorrowCollateral.styles";
import CelText from '../../atoms/CelText/CelText';
import CelButton from '../../atoms/CelButton/CelButton';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BorrowCollateral extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: "BorrowCollateral Screen",
        left: "back",
        right: "profile"
      }
    };
  }

  render() {
    const { header } = this.state;
    const { actions } = this.props;
    // const style = BorrowCollateralStyle();
    
    return (
      <RegularLayout header={header}>
        <CelText>Hello BorrowCollateral</CelText>

        <CelButton onPress={() => actions.navigateTo('BorrowLoanOption')}>
          Choose loan option
        </CelButton>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(BorrowCollateral);
