import React, {Component} from 'react';
import { View, Text, Linking } from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import Loader from "../../atoms/Loader/Loader";
import EarnInterestLayout from "../../layouts/EarnInterestLayout/EarnInterestLayout";
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
            Earn up to 7% APR* on your deposits.
          </Text>
          <Text style={globalStyles.normalText}>
            All you have to do is deposit your assets and we’ll take care of the rest. Interest is distributed every Monday in the same collateral you deposited. Check out this week’s interest rates.
          </Text>

          <Text style={[globalStyles.heading, { textAlign: 'left', marginTop: 10, marginBottom: 20 }]}>
            How do we calculate the interest you earn?
          </Text>
          <Text style={[globalStyles.normalText, { marginBottom: 15 }]}>
            Our interest rates are based on market demand for the specific collateral. We are committed to guaranteeing interest rates at 3%APR or higher. Pretty good, huh?
          </Text>

          <Text style={[globalStyles.heading, { textAlign: 'left', marginTop: 10, marginBottom: 20 }]}>
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

export default HowToEarnInterest;
