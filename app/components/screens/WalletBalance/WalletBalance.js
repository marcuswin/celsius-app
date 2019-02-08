import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { List, Body, ListItem } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import testUtil from "../../../utils/test-util";

import * as appActions from "../../../redux/actions";
import WalletLayout from "../../layouts/WalletLayout/WalletLayout";
import CoinCard from "../../molecules/CoinCard/CoinCard";
import Card from "../../atoms/Card/Card";
import WalletBalanceStyle from "./WalletBalance.styles";
import formatter from "../../../utils/formatter";
import { MODALS } from "../../../config/constants/common";
import { analyticsEvents } from "../../../utils/analytics-util";
import { LoadingSection } from '../../organisms/LoadingSection/LoadingSection';
import InfoBubble from "../../atoms/InfoBubble/InfoBubble";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";


@connect(
  state => ({
    interest: state.wallet.interest,
    collateral: state.wallet.collateral,
    walletCurrencies: state.wallet.currencies,
    supportedCurrencies: state.generalData.supportedCurrencies,
    withdrawCompliance: state.users.compliance.withdraw,
    activeScreen: state.nav.routes[state.nav.index].routeName,
    appSettings: state.users.appSettings,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WalletBalance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
    // binders
  }

  // lifecycle methods
  componentDidMount() {
    const { actions } = this.props;
    actions.getSupportedCurrencies();
  }

  // event hanlders
  // rendering methods
  getWithdrawalInfoCard() {
    const { withdrawCompliance } = this.props;

    if (withdrawCompliance && withdrawCompliance.allowed && withdrawCompliance.block_reason) {
      return (
        <InfoBubble
          title="Warning!"
          color="red"
          margin="15 0 10 0"
          renderContent={() => (
            <View>
              <Text style={[globalStyles.normalText, { color: 'white' }]}>
                {withdrawCompliance.block_reason}
              </Text>
            </View>
          )}
        />
      )
    }

    return null;
  }

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
    analyticsEvents.pressWalletCard(short);
  }

  openTodayRatesModal = () => {
    const { actions } = this.props;

    actions.openModal(MODALS.TODAY_RATES_MODAL);
  };

  render() {
    const { walletCurrencies, supportedCurrencies, interest, collateral } = this.props;

    const estimatedInterestPerCoin = interest.estimate || {};
    const totalInterestPerCoin = interest.total || {};

    const totalInterestEarned = Object.values(totalInterestPerCoin).reduce((current, total) => current + Number(total.amount_usd), 0);

    const withdrawalInfoCard = this.getWithdrawalInfoCard();
    if (!walletCurrencies || !supportedCurrencies)
      return (
        <WalletLayout>

          <View>
            <LoadingSection height={150} />
            <LoadingSection height={100} />
            <LoadingSection height={100} />
            <LoadingSection height={100} />
          </View>
        </WalletLayout>
      );

    return (
      <WalletLayout ref={testUtil.generateTestHook(this, 'WalletBalance.screen')}>
        { withdrawalInfoCard }
        {(!!totalInterestEarned) && <Card style={{ marginTop: 15 }}>
          <View style={WalletBalanceStyle.card}>
            <Text style={WalletBalanceStyle.totalInterestLabel}>TOTAL INTEREST EARNED</Text>
            <Text style={WalletBalanceStyle.totalInterestValue}>{formatter.usd(totalInterestEarned)}</Text>
            <Text style={WalletBalanceStyle.todayRatesText} onPress={this.openTodayRatesModal}>Today's rates</Text>
          </View>
        </Card>}
        {walletCurrencies && (
          <View>
            <List
              dataArray={walletCurrencies}
              scrollable={false}
              renderRow={(item) =>
                <ListItem style={{ marginLeft: 0, marginRight: 0, paddingRight: 0, borderBottomWidth: 0 }}>
                  <Body>
                    <TouchableOpacity ref={testUtil.generateTestHook(this, `WalletBalance.${item.currency.short}`)} onPress={() => this.clickCard(item.currency.short, item.amount)}>
                      <CoinCard type="wallet-card" {...item}
                        supportedCurrencies={supportedCurrencies}
                        lastInterest={estimatedInterestPerCoin[item.currency.short.toUpperCase()]}
                        lockedCollateral={collateral && collateral[item.currency.short.toUpperCase()] ? collateral[item.currency.short.toUpperCase()] : {}}
                      />
                    </TouchableOpacity>
                  </Body>
                </ListItem>}
            />
          </View>
        )}
      </WalletLayout>
    );
  }
}

export default testUtil.hookComponent(WalletBalance);
