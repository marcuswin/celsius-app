import React, {Component} from 'react';
import { View, Text } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import testUtil from "../../../utils/test-util";

import * as appActions from "../../../redux/actions";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import Loader from "../../atoms/Loader/Loader";
import EarnInterestLayout from "../../layouts/EarnInterestLayout/EarnInterestLayout";
import InterestExplanation from "../../organisms/InterestExplanation/InterestExplanation";
import Separator from "../../atoms/Separator/Separator";
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
        <View   ref={testUtil.generateTestHook(this, 'HowToEarnInterest.exist')}
                style={{ paddingTop: 30 }}>
          <Text style={[globalStyles.heading, { textAlign: 'left', marginTop: 10, marginBottom: 20 }]}>
            Earn up to 5% interest when you deposit ETH or BTC
          </Text>
          <Text style={globalStyles.normalText}>
            By depositing coins on the Celsius Network, crypto asset holders will be able to earn up to 5% interest for their lent coins.
          </Text>

          <Text style={[globalStyles.heading, { textAlign: 'left', marginTop: 10, marginBottom: 20 }]}>
            How do we calculate the interest you earn?
          </Text>
          <Text style={[globalStyles.normalText, { marginBottom: 15 }]}>
            We want to maximize the return for all HODLers and do what's in the best interest of all of our members.
          </Text>
          <Text style={[globalStyles.normalText, { marginBottom: 15 }]}>
            Our formula for CEL interest will be based on 3 factors which reward HODLing and discourage speculation:
          </Text>

          <Text style={[globalStyles.normalText, { marginBottom: 15 }]}>
            <Text style={globalStyles.boldText}>50%</Text>
            <Text> - the amount of BTC or ETH you've deposited</Text>
          </Text>

          <Text style={[globalStyles.normalText, { marginBottom: 15 }]}>
            <Text style={globalStyles.boldText}>25%</Text>
            <Text> - the amount of time you've been part of the Celsius community vs. others without withdrawing your coins.</Text>
          </Text>

          <Text style={[globalStyles.normalText, { marginBottom: 15 }]}>
            <Text style={globalStyles.boldText}>25%</Text>
            <Text> - the amount of CEL tokens you HODL out of the CEL tokens you earned in interest*.</Text>
          </Text>

          <Separator margin="5 0 25 0"/>

          <Text style={[globalStyles.italicText, {opacity: 0.8, marginBottom: 15}]}>*only earned tokens count. Tokens bought during the ICO or the open market do not count towards this milestone.</Text>

          <InterestExplanation/>
        </View>
      </EarnInterestLayout>
    );
  }
}

export default testUtil.hookComponent(HowToEarnInterest);
