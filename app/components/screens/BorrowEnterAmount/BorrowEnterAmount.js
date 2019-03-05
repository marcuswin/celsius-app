import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import BorrowEnterAmountStyle from "./BorrowEnterAmount.styles";
import CelText from '../../atoms/CelText/CelText';
import CelButton from '../../atoms/CelButton/CelButton';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BorrowEnterAmount extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: "BorrowEnterAmount Screen",
        left: "back",
        right: "profile"
      }
    };
  }

  render() {
    const { header } = this.state;
    const { actions } = this.props;
    // const style = BorrowEnterAmountStyle();
    
    return (
      <RegularLayout header={header}>
        <CelText>Hello BorrowEnterAmount</CelText>

        <CelButton onPress={() => actions.navigateTo('BorrowCollateral')}>
          Choose a collateral
        </CelButton>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(BorrowEnterAmount);
