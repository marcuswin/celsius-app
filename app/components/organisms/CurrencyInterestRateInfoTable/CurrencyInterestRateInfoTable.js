import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CurrencyInterestRateInfo from "../../molecules/CurrencyInterestRateInfo/CurrencyInterestRateInfo";
import CurrencyInterestRateInfoTableStyle from "./CurrencyInterestRateInfoTable.styles";

@connect(
  state => ({
    interestRates: state.interest.rates,
    interestRatesDisplay: state.interest.ratesDisplay,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CurrencyInterestRateInfoTable extends Component {

  componentDidMount() {
    const { actions } = this.props;

    actions.getInterestRates();
  }

  renderInterestTable() {
    const { interestRates, interestRatesDisplay } = this.props;
    const interestArray = [];

    Object.keys(interestRates).forEach((currency) => {
      const obj = {};
      obj.currency = currency;
      obj.rate = interestRatesDisplay[currency];

      interestArray.push(obj);
    });

    return (
      interestArray.map(interest =>
        <CurrencyInterestRateInfo
          key={interest.currency}
          compact
          currency={interest.currency}
          rate={`${interest.rate}%`}
        />
      )
    );
  }

  render() {
    const {style} = this.props;

    const additionalStyle = style || {};

    return (
      <View style={[CurrencyInterestRateInfoTableStyle.wrapper, additionalStyle]}>
        {this.props.interestRates ? this.renderInterestTable() : null}
      </View>
    );
  }
}

export default CurrencyInterestRateInfoTable;
