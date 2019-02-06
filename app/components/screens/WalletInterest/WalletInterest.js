import React, { Component } from 'react';
import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import formatter from "../../../utils/formatter";
import * as appActions from "../../../redux/actions";
import WalletInterestStyle from "./WalletInterest.styles";
import CelText from '../../atoms/CelText/CelText';
import Card from "../../atoms/Card/Card";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import STYLES from "../../../constants/STYLES";

@connect(
  state => ({
    style: WalletInterestStyle(state.ui.theme),
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WalletInterest extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: "Interest earned",
        left: "back",
        right: "profile"
      }
    };
  }

  render() {
    const { header } = this.state
    // const { style } = this.props

    return (
      <RegularLayout header={header} >
        <View>
          <Card>
            <CelText>Total interest earned</CelText>
            <CelText bold>{formatter.usd(12313.14)}</CelText>
            <CelText color={STYLES.COLORS.CELSIUS_BLUE}> Todays rates </CelText>
          </Card>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(WalletInterest);
