import React, {Component} from 'react';
import { View, Text, Linking } from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import testUtil from "../../../utils/test-util";

import * as appActions from "../../../redux/actions";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import Loader from "../../atoms/Loader/Loader";
import EarnInterestLayout from "../../layouts/EarnInterestLayout/EarnInterestLayout";
import { MODALS } from "../../../config/constants/common";
import HowToEarnInterestStyle from "./HowToEarnInterest.styles";

@connect(
  state => ({
    formData: state.forms.formData,
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
  openTodayRatesModal = () => {
    const { actions } = this.props;

    actions.openModal(MODALS.TODAY_RATES_MODAL);
  };

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
          <Text style={[HowToEarnInterestStyle.todayRatesText, {marginBottom: 15}]} onPress={this.openTodayRatesModal}>Check out interest rates</Text>
          <Text style={[globalStyles.heading, { textAlign: 'left', marginTop: 15, marginBottom: 16 }]}>
            Earn up to 7% APR* on your deposits.
          </Text>
          <Text style={globalStyles.normalText}>
            All you have to do is deposit your assets and we’ll take care of the rest. Interest is distributed every Monday in the same collateral you deposited. Check out this week’s interest rates.
          </Text>

          <Text style={[globalStyles.heading, { textAlign: 'left', marginTop: 30, marginBottom: 16 }]}>
            How do we calculate the interest you earn?
          </Text>
          <Text style={[globalStyles.normalText, ]}>
            Our interest rates are based on market demand for the specific collateral. We are committed to guaranteeing interest rates at 3%APR or higher. Pretty good, huh?
          </Text>

          <Text style={[globalStyles.heading, { textAlign: 'left', marginTop: 30, marginBottom: 16 }]}>
            Want to know more?
          </Text>

          <Text style={globalStyles.normalText}>
            Check out our <Text onPress={() => Linking.openURL('https://celsius.network/frequently-asked-questions/')} style={{fontFamily: 'agile-bold', textDecorationLine: 'underline'}}>FAQ</Text>
          </Text>

        </View>
      </EarnInterestLayout>
    );
  }
}

export default testUtil.hookComponent(HowToEarnInterest);
