import React, {Component} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { List, Body, ListItem } from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import Loader from "../../atoms/Loader/Loader";
import WalletLayout from "../../layouts/WalletLayout/WalletLayout";
import CoinCard from "../../molecules/CoinCard/CoinCard";
import { mixpanelEvents } from "../../../services/mixpanel";
import Card from "../../atoms/Card/Card";
import WalletBalanceStyle from "./WalletBalance.styles";
import formatter from "../../../utils/formatter";
import { MODALS } from "../../../config/constants/common";

@connect(
  state => ({
    interest: state.wallet.interest,
    walletCurrencies: state.wallet.currencies,
    supportedCurrencies: state.generalData.supportedCurrencies,
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
    actions.getWalletDetails();
  }

  componentWillReceiveProps(nextProps) {
    const { actions, activeScreen } = this.props;
    if (activeScreen !== nextProps.activeScreen && nextProps.activeScreen === 'Home') {
      actions.getWalletDetails();
    }
  }

  openTodayRatesModal = () => {
    const { actions } = this.props;

    actions.openModal(MODALS.TODAY_RATES_MODAL);
  };

  // event hanlders
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
    mixpanelEvents.pressWalletCard(short);
  }
  // rendering methods
  render() {
    const { walletCurrencies, supportedCurrencies, interest } = this.props;

    const estimatedInterestPerCoin = interest.estimate || {};
    const totalInterestPerCoin = interest.total || {};

    const totalInterestEarned = Object.values(totalInterestPerCoin).reduce((current, total) => current + Number(total.amount_usd), 0);

    if (!walletCurrencies) return (
      <WalletLayout>
        <Loader/>
      </WalletLayout>
    );

    return (
      <WalletLayout>
        {(!!totalInterestEarned) && <Card style={{marginTop: 15}}>
          <View style={WalletBalanceStyle.card}>
            <Text style={WalletBalanceStyle.totalInterestLabel}>TOTAL INTEREST EARNED</Text>
            <Text style={WalletBalanceStyle.totalInterestValue}>{ formatter.usd(totalInterestEarned) }</Text>
            <Text style={WalletBalanceStyle.todayRatesText} onPress={this.openTodayRatesModal}>Today's rates</Text>
          </View>
        </Card>}
        { walletCurrencies && (
          <View>
            <List
              dataArray={walletCurrencies}
              scrollable={false}
              renderRow={(item) =>
                <ListItem style={{ marginLeft: 0, marginRight: 0, paddingRight: 0, borderBottomWidth: 0 }}>
                  <Body>
                  <TouchableOpacity onPress={() => this.clickCard(item.currency.short, item.amount) }>
                    <CoinCard type="wallet-card" {...item}
                              supportedCurrencies={supportedCurrencies}
                              lastInterest={estimatedInterestPerCoin[item.currency.short.toUpperCase()]}/>
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

export default WalletBalance;
