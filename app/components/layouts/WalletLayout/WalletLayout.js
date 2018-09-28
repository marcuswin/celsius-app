import React, {Component} from 'react';
import { View, Text } from 'react-native';
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
import CelScreenContent from "../../atoms/CelScreenContent/CelScreenContent";

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
    this.props.actions.getWalletDetails();
  }

  componentWillReceiveProps(nextProps) {
    const { activeScreen, actions } = this.props;

    if (activeScreen !== nextProps.activeScreen &&
        ['WalletBalance', 'WalletTransactions', 'WalletInterest', 'Home'].indexOf(nextProps.activeScreen) !== -1) {
      actions.getWalletDetails();
    }
    if (nextProps.activeScreen === 'Home') this.props.actions.displayBottomNavigation(true);
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

        <CelScreenContent>
          { this.props.children }
        </CelScreenContent>
      </BasicLayout>
    );
  }
}

export default WalletLayout;
