import React, {Component} from 'react';
import { View, Text } from 'react-native';
// import {} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import {GLOBAL_STYLE_DEFINITIONS as globalStyles} from "../../../config/constants/style";
// import HowToEarnInterestStyle from "./HowToEarnInterest.styles";
import EarnInterestLayout from "../../layouts/EarnInterestLayout/EarnInterestLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import InterestExplanation from "../../organisms/InterestExplanation/InterestExplanation";

@connect(
  () => ({}),
  dispatch => bindActionCreators(actions, dispatch),
)
class HowToEarnInterest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
    // binders
  }

  // lifecycle methods
  // event hanlders
  // rendering methods
  render() {
    return (
      <EarnInterestLayout>
        <View style={{ paddingTop: 30 }}>
          <Text style={globalStyles.normalText}>
            By depositing coins on the Celsius Network, crypto asset holders will be able to earn up to 9% interest for their lent coins.
          </Text>
          <Text style={[globalStyles.heading, { textAlign: 'left', marginTop: 10, marginBottom: 20 }]}>
            How we determine your interest rate
          </Text>
          <Text style={[globalStyles.normalText, { marginBottom: 15 }]}>
            To get the maximum amount of interest you need to deposit coins with us, be a member of the community for as long as possible and HODL your CEL tokens.
          </Text>
          <Text style={[globalStyles.normalText, { marginBottom: 15 }]}>
            Your current interest rate is based on a 50-25-25 formula, where:
          </Text>

          <InterestExplanation/>

          <Text style={[globalStyles.normalText, { marginBottom: 15 }]}>
            Need more information and want to deep dive into how we calculate and distribute interest? Visit our  website and find out more:
          </Text>

          <CelButton
            inverse
            onPress={console.log}
            margin="20 0 20 0"
          >
            Learn More
          </CelButton>

          <CelButton
            size="small"
            transparent
            margin="0 0 20 0"
            onPress={console.log}
          >
            Read FAQ about interest
          </CelButton>


        </View>
      </EarnInterestLayout>
    );
  }
}

export default HowToEarnInterest;
