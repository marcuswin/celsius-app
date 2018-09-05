import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../../redux/actions";
import CurrencyInterestRateInfo from "../../molecules/CurrencyInterestRateInfo/CurrencyInterestRateInfo";
import CurrencyInterestRateInfoTableStyle from "./CurrencyInterestRateInfoTable.styles";

@connect(
  state => ({
    interestRates: state.interest.rates
  }),
  dispatch => bindActionCreators(actions, dispatch)
)
class CurrencyInterestRateInfoTable extends Component {

  componentDidMount() {
    actions.getInterestRates();
  }

  renderInterestTable() {
    const { interestRates } = this.props;
    const interestArray = [];

    Object.keys(interestRates).forEach((currency) => {
      const obj = {};
      obj.currency = currency;
      obj.rate = interestRates[currency];

      interestArray.push(obj);
    });

    return (
      interestArray.map(interest =>
        <CurrencyInterestRateInfo
          key={interest.currency}
          currency={interest.currency}
          rate={`${interest.rate * 100}%`}
        />
      )
    );
  }

  render() {
    return (
      <View style={CurrencyInterestRateInfoTableStyle.wrapper}>
        {this.props.interestRates ? this.renderInterestTable() : null}
      </View>
    );
  }
}

export default CurrencyInterestRateInfoTable;
