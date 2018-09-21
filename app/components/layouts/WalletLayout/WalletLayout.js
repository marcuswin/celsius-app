import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { Content } from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import get from "lodash/get";

import * as appActions from "../../../redux/actions";
// import {STYLES} from "../../config/constants/style";
import WalletLayoutStyle from "./WalletLayout.styles";
import BasicLayout from "../BasicLayout/BasicLayout";
import { MainHeader } from "../../molecules/MainHeader/MainHeader";
import TabNavigation from "../../molecules/TabNavigation/TabNavigation";
import formatter from "../../../utils/formatter";

@connect(
  state => ({
    walletTotal: state.wallet.total,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WalletLayout extends Component {
  // lifecycle methods
  componentDidMount() {
    this.props.actions.displayBottomNavigation(true);
  }

  componentWillReceiveProps(nextProps) {
    const { activeScreen, actions } = this.props;

    if (activeScreen !== nextProps.activeScreen &&
        ['WalletBalance', 'WalletTransactions', 'WalletInterest', 'Home']) {
      actions.getWalletDetails();
    }
  }

  tabs = [
    { label: 'Balance', screen: 'Home' },
    { label: 'Transactions', screen: 'WalletTransactions' },
    { label: 'Interest', screen: 'WalletInterest' },
  ];

  // rendering methods
  render() {
    const { walletTotal } = this.props;
    const total = get(walletTotal, 'quotes.USD.total', 0);

    return (
      <BasicLayout bottomNavigation>
        <MainHeader backButton={false} />
        <View style={WalletLayoutStyle.heading}>
          <Text style={WalletLayoutStyle.amountText}>{ formatter.usd(total) }</Text>
          <Text style={WalletLayoutStyle.subheadingText}>WALLET BALANCE</Text>
        </View>
        <TabNavigation tabs={this.tabs}/>

        <Content style={WalletLayoutStyle.content}>
          { this.props.children }
        </Content>
      </BasicLayout>
    );
  }
}

export default WalletLayout;
