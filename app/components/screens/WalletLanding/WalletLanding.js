import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, List, Body, ListItem, Content, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { bindActionCreators } from "redux";
import get from 'lodash/get';

import apiUtil from '../../../utils/api-util';
import TotalCoinsHeader from '../../molecules/TotalCoinsHeader/TotalCoinsHeader';
import PricingChangeIndicator from "../../molecules/PricingChangeIndicator/PricingChangeIndicator";
import CoinCard from "../../molecules/CoinCard/CoinCard";
import CelButton from "../../atoms/CelButton/CelButton";
import * as actions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import WalletInfoBubble from "../../molecules/WalletInfoBubble/WalletInfoBubble";
import API from "../../../config/constants/API";
import Loader from "../../atoms/Loader/Loader";


import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";



@connect(
  state => ({
    wallet: state.wallet,
    callsInProgress: state.api.callsInProgress,
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

  componentDidMount() {
    const { getWalletDetails } = this.props;
    getWalletDetails();
  }

  onCloseInfo = () => this.setState({ infoBubble: false })

  render() {
    const { navigateTo, wallet } = this.props;

    const animatedHeading = {
      text: 'Wallet',
      subheading: "Your deposited coins",
    };

    const mainHeader = {
      backButton: false,
    };


    const isLoading = apiUtil.areCallsInProgress([API.GET_WALLET_DETAILS], this.props.callsInProgress);
    const totalValue = get(wallet, 'meta.quotes.USD.total', 0);
    const percentChange24h = get(wallet, 'meta.quotes.USD.percent_change_24h', 0);
    const isPercentChangeNegative = percentChange24h < 0;
    const walletData = get(wallet, 'data', null)
    const totalAmount = "$1232" // todo
    const contentPadding = { paddingLeft: 36, paddingRight: 36 }


    if (isLoading) {
      return <Loader />
    }


    return (
      <SimpleLayout animatedHeading={animatedHeading} mainHeader={mainHeader} contentSidePadding={0}>
        <Content bounces={false} style={{ marginTop: -10, marginBottom: 30 }}>
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
            <View style={[contentPadding, { marginBottom: -15 }]}>
              <WalletInfoBubble
                title="Did you know?"
                onPressClose={this.onCloseInfo}
              >
                <Text style={[globalStyles.normalText, { color: 'white' }]}>
                  You could be earning
                  <Text style={[globalStyles.boldText, { color: 'white' }]}> {totalAmount} </Text>
                  a year if you deposited all of your eligible crypto from your portfolio to your Celsius wallet.
                </Text>
              </WalletInfoBubble>
            </View>
          }
          <View style={contentPadding}>
            <View>
              <List
                dataArray={walletData}
                bounces={false}
                renderRow={(item) =>
                  <ListItem style={{ marginLeft: 0, marginRight: 0, paddingRight: 0, borderBottomWidth: 0 }}>
                    <Body>
                      <TouchableOpacity onPress={() => this.props.navigateTo('WalletDetails', { currency: item.currency.short })} disabled={item.amount === 0}>
                        <CoinCard type="wallet-card" {...item} />
                      </TouchableOpacity>
                    </Body>
                  </ListItem>
                } />
            </View>
          </View>
        </Content>
      </SimpleLayout>
    );
  }
}

export default WalletLanding;
