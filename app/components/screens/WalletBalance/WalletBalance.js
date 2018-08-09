import React, {Component} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { List, Body, ListItem } from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import WalletLayout from "../../layouts/WalletLayout/WalletLayout";
import CoinCard from "../../molecules/CoinCard/CoinCard";
import { actions as mixpanelActions } from "../../../services/mixpanel";
import Card from "../../atoms/Card/Card";
import WalletBalanceStyle from "./WalletBalance.styles";

@connect(
  state => ({
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
    mixpanelActions.pressWalletCard(short);
  }
  // rendering methods
  render() {
    const { walletCurrencies, supportedCurrencies } = this.props;
    return (
      <WalletLayout>
        <Card>
          <View style={WalletBalanceStyle.card}>
            <Text style={WalletBalanceStyle.totalInterestLabel}>TOTAL INTEREST EARNED</Text>
            <Text style={WalletBalanceStyle.totalInterestValue}>120.00 CEL</Text>
          </View>
        </Card>
        { walletCurrencies && (
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
        )}
      </WalletLayout>
    );
  }
}

export default WalletBalance;
