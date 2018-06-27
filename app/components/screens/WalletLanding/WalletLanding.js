import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, List, Body, ListItem, Content, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { bindActionCreators } from "redux";
import get from 'lodash/get';

import apiUtil from '../../../utils/api-util';
import formatter from '../../../utils/formatter';
import TotalCoinsHeader from '../../molecules/TotalCoinsHeader/TotalCoinsHeader';
import PricingChangeIndicator from "../../molecules/PricingChangeIndicator/PricingChangeIndicator";
import CoinCard from "../../molecules/CoinCard/CoinCard";
import CelButton from "../../atoms/CelButton/CelButton";
import * as actions from "../../../redux/actions";
import WalletInfoBubble from "../../molecules/WalletInfoBubble/WalletInfoBubble";
import API from "../../../config/constants/API";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import TopPageLoader from "../../atoms/TopPageLoader/TopPageLoader";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import { MainHeader } from "../../molecules/MainHeader/MainHeader";
import CelHeading from "../../atoms/CelHeading/CelHeading";

let shouldRefresh = true;
let refreshTimeout;

@connect(
  state => ({
    wallet: state.wallet,
    walletTotal: state.wallet.total,
    walletCurrencies: state.wallet.currencies,
    supportedCurrencies: state.generalData.supportedCurrencies,
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
    const { getWalletDetails, getSupportedCurrencies } = this.props;
    getSupportedCurrencies();
    getWalletDetails();
  }

  // TODO: move logic to info bubble
  onCloseInfo = () => this.setState({ infoBubble: false })

  clickCard = (short, amount) => {
    const { navigateTo } = this.props
    if (!amount) {
      navigateTo('AddFunds', { currency: short.toLowerCase() });
    } else {
      navigateTo('WalletDetails', { currency: short.toLowerCase() });
    }
  }

  refreshWallet = (e) => {
    const { getWalletDetails, callsInProgress } = this.props;
    if (!apiUtil.areCallsInProgress([API.GET_WALLET_DETAILS], callsInProgress) && e.nativeEvent.contentOffset.y < 0 && shouldRefresh) {
      getWalletDetails();

      shouldRefresh = false;
      refreshTimeout = setTimeout(() => {
        shouldRefresh = true;
        clearTimeout(refreshTimeout);
      }, 10000)
    }
  }

  render() {
    const { navigateTo, walletTotal, walletCurrencies, supportedCurrencies } = this.props;

    const isLoading = apiUtil.areCallsInProgress([API.GET_WALLET_DETAILS], this.props.callsInProgress);
    const totalValue = get(walletTotal, 'quotes.USD.total', 0);
    const percentChange24h = get(walletTotal, 'quotes.USD.percent_change_24h', 0);
    const isPercentChangeNegative = percentChange24h < 0;
    const contentPadding = { paddingLeft: 36, paddingRight: 36 };

    console.log(walletCurrencies)

    return (
      <BasicLayout bottomNavigation>
        <MainHeader backButton={false} />
        <CelHeading text="Wallet" subheading="Your deposited coins" />

        <TopPageLoader isLoading={isLoading} />

        <Content onScroll={this.refreshWallet} style={{ marginBottom: 30 }}>
          <TotalCoinsHeader totalValue={totalValue}>
            {totalValue === 0
              ? <CelButton size="mini" color="green" margin="0 15 0 0" onPress={() => navigateTo('AddFunds')}>
                Add funds
                </CelButton>
              : <PricingChangeIndicator
                isPercentChangeNegative={isPercentChangeNegative}
                percentChange={percentChange24h}
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
                  <Text style={[globalStyles.boldText, { color: 'white' }]}> { formatter.usd(0.049 * totalValue) } </Text>
                  a year if you deposited all of your eligible crypto from your portfolio to your Celsius wallet.
                </Text>
              </WalletInfoBubble>
            </View>
          }

          { walletCurrencies && (
            <View style={contentPadding}>
              <View>
                <List
                  dataArray={walletCurrencies}
                  scrollable={false}
                  renderRow={(item) =>
                      <ListItem style={{ marginLeft: 0, marginRight: 0, paddingRight: 0, borderBottomWidth: 0 }}>
                        <Body>
                        <TouchableOpacity onPress={() => this.clickCard(item.currency.short, item.amount) }>
                            <CoinCard type="wallet-card" {...item} supportedCurrencies={supportedCurrencies} />
                          </TouchableOpacity>
                        </Body>
                      </ListItem>}
                    />
              </View>
            </View>
          )}
        </Content>
      </BasicLayout>
    );
  }
}

export default WalletLanding;
