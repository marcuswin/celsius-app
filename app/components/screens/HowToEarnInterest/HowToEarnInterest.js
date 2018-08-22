import React, {Component} from 'react';
import { View, Text } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import {GLOBAL_STYLE_DEFINITIONS as globalStyles} from "../../../config/constants/style";
import Loader from "../../atoms/Loader/Loader";
import EarnInterestLayout from "../../layouts/EarnInterestLayout/EarnInterestLayout";
import InterestExplanation from "../../organisms/InterestExplanation/InterestExplanation";
// import HowToEarnInterestStyle from "./HowToEarnInterest.styles";

@connect(
  state => ({
    formData: state.ui.formData,
    interestRates: state.interest.rates,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class HowToEarnInterest extends Component {
  // lifecycle methods
  componentDidMount() {
    const { actions, interestRates } = this.props;
    if (!interestRates) actions.getInterestRates();
  }

  // event hanlders
  // rendering methods
  render() {
    const { interestRates } = this.props;

    if (!interestRates) return (
      <EarnInterestLayout>
        <Loader/>
      </EarnInterestLayout>
    )

    return (
      <EarnInterestLayout>
        <View style={{ paddingTop: 30 }}>
          <Text style={[globalStyles.heading, { textAlign: 'left', marginTop: 10, marginBottom: 20 }]}>
            Earn up to 5% interest when you deposit ETH or BTC
          </Text>
          <Text style={globalStyles.normalText}>
            By depositing coins on the Celsius Network, crypto asset holders will be able to earn up to 9% interest for their lent coins.
          </Text>

          <Text style={[globalStyles.heading, { textAlign: 'left', marginTop: 10, marginBottom: 20 }]}>
            How we’ll determine your interest rate in the future
          </Text>
          <Text style={[globalStyles.normalText, { marginBottom: 15 }]}>
            While we're in beta, everyone who deposited before August 20th will be earning
            <Text style={globalStyles.boldText}> { interestRates.ETH * 100 }% interest on ETH </Text>
            and
            <Text style={globalStyles.boldText}> { interestRates.BTC * 100 }% interest on BTC </Text>
            retroactively.
          </Text>
          <Text style={[globalStyles.normalText, { marginBottom: 15 }]}>
            We are also currently paying interest in ETH and BTC. Once version 2.0 of the app is released in September we will start paying interest in CEL and we'll be using the process below using the
            <Text style={globalStyles.boldText}> 50-25-25 model.</Text>
          </Text>

          <InterestExplanation/>
        </View>
      </EarnInterestLayout>
    );
  }
}

export default HowToEarnInterest;
