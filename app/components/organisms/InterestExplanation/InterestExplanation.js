import React, {Component} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import {} from 'native-base';

import InterestExplanationStyle from "./InterestExplanation.styles";
import Icon from "../../atoms/Icon/Icon";
import { COLORS, GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";

class InterestExplanation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: undefined,
    };

    // binders
  }

  // lifecycle methods
  // event hanlders
  activateTab = (tab) => {
    const { activeTab } = this.state;

    console.log('activating')

    this.setState({ activeTab: activeTab === tab ? undefined : tab });
  }
  // rendering methods
  render() {
    const { activeTab } = this.state;

    return (
      <View style={{ marginBottom: 15}}>
        <View>
          <View style={[InterestExplanationStyle.pillWrapper, activeTab ? { paddingTop: 5, paddingBottom: 5 } : { paddingTop: 10, paddingBottom: 10 }]}>
            <TouchableOpacity onPress={() => this.activateTab('balances') } style={InterestExplanationStyle.balancesTO}>
              <View style={activeTab === 'balances' ? InterestExplanationStyle.balancesWrapperActive : InterestExplanationStyle.balancesWrapper}>
                <Text style={InterestExplanationStyle.pillText}>50% BALANCES</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.activateTab('time') } style={InterestExplanationStyle.timeTO}>
              <View style={activeTab === 'time' ? InterestExplanationStyle.timeWrapperActive : InterestExplanationStyle.timeWrapper}>
                <Text style={InterestExplanationStyle.pillText}>25% TIME</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.activateTab('hodl') } style={InterestExplanationStyle.hodlTO}>
              <View style={activeTab === 'hodl' ? InterestExplanationStyle.hodlWrapperActive : InterestExplanationStyle.hodlWrapper}>
                <Text style={InterestExplanationStyle.pillText}>25% HODL</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        { activeTab === 'balances' && (
          <View style={InterestExplanationStyle.explanationWrapper}>
            <TouchableOpacity style={InterestExplanationStyle.closeIcon} onPress={() => this.activateTab() }>
              <Icon name='xIcon' height='11' width='11' viewBox="0 0 1000 1000" fill={COLORS.gray}/>
            </TouchableOpacity>
            <Text style={InterestExplanationStyle.explanationHeading}>CEL for Balances</Text>
            <Text style={InterestExplanationStyle.explanationText}>Based on the amount of coins held by the member in the CELsius wallets.</Text>
            <Text style={InterestExplanationStyle.explanationText}>Add more BTC or ETH and earn more interest.</Text>
          </View>
        ) }
        { activeTab === 'time' && (
          <View style={InterestExplanationStyle.explanationWrapper}>
            <TouchableOpacity style={InterestExplanationStyle.closeIcon} onPress={() => this.activateTab() }>
              <Icon name='xIcon' height='11' width='11' viewBox="0 0 1000 1000" fill={COLORS.gray}/>
            </TouchableOpacity>
            <Text style={InterestExplanationStyle.explanationHeading}>CEL for Time</Text>
            <Text style={InterestExplanationStyle.explanationText}>Based on the length of time since you joined Celsius relative to other members.</Text>
            <Text style={InterestExplanationStyle.explanationText}>Be sure to HODL and not withdraw your crypto in order to earn more interest.</Text>
          </View>
        ) }
        { activeTab === 'hodl' && (
          <View style={InterestExplanationStyle.explanationWrapper}>
            <TouchableOpacity style={InterestExplanationStyle.closeIcon} onPress={() => this.activateTab() }>
              <Icon name='xIcon' height='11' width='11' viewBox="0 0 1000 1000" fill={COLORS.gray}/>
            </TouchableOpacity>
            <Text style={InterestExplanationStyle.explanationHeading}>CEL for HODL</Text>
            <Text style={InterestExplanationStyle.explanationText}>Based on the CEL tokens you’ve held vs withdrawn from your Celsius wallet.</Text>
            <Text style={InterestExplanationStyle.explanationText}>Be sure to HODL your CEL in order to earn more interest.</Text>
          </View>
        ) }

        { !activeTab && (
          <Text style={[globalStyles.normalText, InterestExplanationStyle.italicText]}>
            Tap the values from the chart to learn more about how Celsius calculates interest.
          </Text>
        ) }
      </View>
    );
  }
}

export default InterestExplanation;
