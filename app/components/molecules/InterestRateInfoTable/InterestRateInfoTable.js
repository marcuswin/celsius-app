import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import testUtil from "../../../utils/test-util";

import * as appActions from "../../../redux/actions";
// import InterestRateInfoTableStyle from "./InterestRateInfoTable.styles";
import InterestRateInfo from "../../atoms/InterestRateInfo/InterestRateInfo";

@connect(
  state => ({
    interestRates: state.interest.rates,
    interestRatesDisplay: state.interest.ratesDisplay
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class InterestRateInfoTable extends Component {

  componentDidMount() {
    const { actions } = this.props;

    actions.getInterestRates();
  }

  renderInterestTable() {
    const { interestRates, interestRatesDisplay, pressed } = this.props;
    const interestArray = [];
    const ratesPriority = ["ETH", "BTC", "USD"];


    Object.keys(interestRates).forEach((currency) => {
      const obj = {};
      obj.currency = currency;
      obj.rate = interestRatesDisplay[currency];

      interestArray.push(obj);
    });

    const sortedRates = interestArray.sort((a, b) => {
      if (ratesPriority.indexOf(a.currency) > ratesPriority.indexOf(b.currency)) {
        return -1;
      }

      if (ratesPriority.indexOf(a.currency) < ratesPriority.indexOf(b.currency)) {
        return 1;
      }

      return 0;
    });

    if (pressed) {
      return sortedRates.map(interest => {
        const border = interest === sortedRates[0] ? null : { borderTopWidth: 2, borderColor: "rgba(200,200,200,0.3)" };
        return (
          <View key={interest.currency} style={border}>
            <InterestRateInfo
              compact
              currency={interest.currency}
              rate={`${interest.rate}%`}
            />
          </View>
        );
      }
      )
    }

    return sortedRates.map(interest => {
        const border = interest === sortedRates[0] ? null : { borderTopWidth: 2, borderColor: "rgba(200,200,200,0.3)" };
        return (
          <View key={interest.currency} style={border}>
            <InterestRateInfo
              compact
              currency={interest.currency}
              rate={`${interest.rate}%`}
            />
          </View>
        );
      }
    ).slice(0,5);
  }

  render() {
    const { style, interestRates } = this.props;
    const additionalStyle = style || {};

    // const styles = InterestRateInfoTableStyle();

    return (
      <View style={[[additionalStyle]]}>
        {interestRates ? this.renderInterestTable() : null}
      </View>
    );
  }
}

export default testUtil.hookComponent(InterestRateInfoTable);


