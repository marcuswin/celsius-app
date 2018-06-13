import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, List, Body, ListItem, Content, Text } from 'native-base';
import { bindActionCreators } from "redux";
import get from 'lodash/get';

import TotalCoinsHeader from '../../molecules/TotalCoinsHeader/TotalCoinsHeader';
import PricingChangeIndicator from "../../molecules/PricingChangeIndicator/PricingChangeIndicator";
import CoinCard from "../../molecules/CoinCard/CoinCard";
import CelButton from "../../atoms/CelButton/CelButton";
import * as actions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import WalletInfoBubble from "../../molecules/WalletInfoBubble/WalletInfoBubble";

import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";



@connect(
  state => ({
    portfolio: state.portfolio.portfolio, // wallet 
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class WalletLanding extends Component {

  constructor() {
    super();

    this.state = {
      infoBubble: true,
    }
  }

  onCloseInfo = () => this.setState({infoBubble: false})

  render() {
    const { navigateTo, portfolio } = this.props;

    const animatedHeading = {
      text: 'Wallet',
      subheading: "Your deposited coins",
    };

    const mainHeader = {
      backButton: false,
    };

    const totalValue = get(portfolio, 'meta.quotes.USD.total', 0);
    const percentChange24h = get(portfolio, 'meta.quotes.USD.percent_change_24h', 0);
    const isPercentChangeNegative = percentChange24h < 0;
    const portfolioData = get(portfolio, 'data', []);
    const totalAmount = "$1232"
    const contentPadding = {paddingLeft: 36, paddingRight: 36}

    return (
      <SimpleLayout animatedHeading={animatedHeading} mainHeader={mainHeader} contentSidePadding={0}>
        <Content bounces={false} style={{marginTop: -10, marginBottom: 30}}>
          <TotalCoinsHeader totalValue={totalValue}>
            {totalValue === 0 
              ? <CelButton size="mini" color="green" margin="0 15 0 0" onPress={() => navigateTo('AddFunds')}>
                  Add funds
                </CelButton>
              : <PricingChangeIndicator
                  isPercentChangeNegative={isPercentChangeNegative}
                  percentChange24h={percentChange24h}
                />
            }
          </TotalCoinsHeader>
          {(totalValue !== 0 && this.state.infoBubble) &&
            <View style={[contentPadding, {marginBottom: -15}]}> 
              <WalletInfoBubble
                title="Did you know?"
                onPressClose={this.onCloseInfo}
              >
                <Text style={[globalStyles.normalText, {color: 'white'}]}>
                  You could be earning
                  <Text style={[globalStyles.boldText, {color: 'white'}]}> {totalAmount} </Text>
                  a year if you deposited all of your eligible crypto from your portfolio to your Celsius wallet.
                </Text>
              </WalletInfoBubble>
            </View>
          }
          <View style={contentPadding}>
            <View>
              <List
                dataArray={portfolioData}
                bounces={false}
                renderRow={(item) =>
                  <ListItem style={{marginLeft: 0, marginRight: 0, paddingRight: 0, borderBottomWidth: 0}}>
                    <Body>
                      <CoinCard {...item} />
                    </Body>
                  </ListItem>
                }/>
            </View>
          </View>
        </Content>
      </SimpleLayout>
    );
  }
}

export default WalletLanding;
