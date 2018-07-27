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
import * as appActions from "../../../redux/actions";
import WalletInfoBubble from "../../molecules/WalletInfoBubble/WalletInfoBubble";
import API from "../../../config/constants/API";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import TopPageLoader from "../../atoms/TopPageLoader/TopPageLoader";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import { MainHeader } from "../../molecules/MainHeader/MainHeader";
import CelHeading from "../../atoms/CelHeading/CelHeading";
import { actions as mixpanelActions } from "../../../services/mixpanel";

let shouldRefresh = true;
let refreshTimeout;

@connect(
  state => ({
    wallet: state.wallet,
    walletTotal: state.wallet.total,
    walletCurrencies: state.wallet.currencies,
    appSettings: state.users.appSettings,
    supportedCurrencies: state.generalData.supportedCurrencies,
    callsInProgress: state.api.callsInProgress,
    activeScreen: state.nav.routes[state.nav.index].routeName,
    estimatedInterest: state.portfolio.estimatedInterest,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WalletLanding extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.getSupportedCurrencies();
    actions.getWalletDetails();
    actions.getEstimatedInterest();
  }

  componentWillReceiveProps(nextProps) {
    const { actions, activeScreen } = this.props;
    if (activeScreen !== nextProps.activeScreen && nextProps.activeScreen === 'Home') {
      actions.getWalletDetails();
      actions.getEstimatedInterest()
    }
  }

  onCloseInfo = () => this.props.actions.updateUserAppSettings({ showWalletLandingInfoBox: false });

  clickCard = (short, amount) => {
    const { actions, appSettings } = this.props;
    if (!amount) {
      if (appSettings.showSecureTransactionsScreen) {
        actions.navigateTo('SecureTransactions', { currency: short.toLowerCase() })
      } else {
        actions.navigateTo('AddFunds', { currency: short.toLowerCase() })
      }
    } else {
      actions.navigateTo('WalletDetails', { currency: short.toLowerCase() });
    }
    mixpanelActions.pressWalletCard(short);
  }

  refreshWallet = (e) => {
    const { actions, callsInProgress } = this.props;
    if (!apiUtil.areCallsInProgress([API.GET_WALLET_DETAILS, API.GET_ESTIMATED_LOAN], callsInProgress) && e.nativeEvent.contentOffset.y < 0 && shouldRefresh) {
      actions.getWalletDetails();

      shouldRefresh = false;
      refreshTimeout = setTimeout(() => {
        shouldRefresh = true;
        clearTimeout(refreshTimeout);
      }, 10000)
    }
  }

  goToAddFunds = () => {
    const { appSettings, actions } = this.props;
    if (appSettings.showSecureTransactionsScreen) {
      actions.navigateTo('SecureTransactions')
    } else {
      actions.navigateTo('AddFunds')
    }
  }

  render() {
    const { walletTotal, walletCurrencies, supportedCurrencies, appSettings, estimatedInterest, callsInProgress } = this.props;

    const isLoading = apiUtil.areCallsInProgress([API.GET_WALLET_DETAILS, API.GET_ESTIMATED_LOAN], callsInProgress);
    const totalValue = get(walletTotal, 'quotes.USD.total', 0);
    const percentChange24h = get(walletTotal, 'quotes.USD.percent_change_24h', 0);
    const isPercentChangeNegative = percentChange24h < 0;
    const contentPadding = { paddingLeft: 36, paddingRight: 36 };

    return (
      <BasicLayout bottomNavigation>
        <MainHeader backButton={false} />
        <CelHeading text="Wallet" subheading="Your deposited coins" />

        <TopPageLoader isLoading={isLoading} />

        <Content onScroll={this.refreshWallet}>
          <TotalCoinsHeader totalValue={totalValue}>
            {totalValue === 0
              ? <CelButton size="small" color="green" margin="0 0 0 0" onPress={this.goToAddFunds} >
                Add funds
                </CelButton>
              : <PricingChangeIndicator
                isPercentChangeNegative={isPercentChangeNegative}
                percentChange={percentChange24h}
              />
            }
          </TotalCoinsHeader>
          {(totalValue !== 0 && appSettings.showWalletLandingInfoBox) && !!estimatedInterest && !!estimatedInterest.lending_interest &&
            <View style={[contentPadding, { marginBottom: -15 }]}>
              <WalletInfoBubble
                title="Did you know?"
                onPressClose={this.onCloseInfo}
              >
                <Text style={[globalStyles.normalText, { color: 'white' }]}>
                  You could be earning
                  <Text style={[globalStyles.boldText, { color: 'white' }]}> { formatter.usd(estimatedInterest.lending_interest) } </Text>
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
