import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';

import testUtil from "../../../utils/test-util";
import Card from '../../atoms/Card/Card';
import CelText from '../../atoms/CelText/CelText';
import Separator from '../../atoms/Separator/Separator';
import WalletDetailsCardStyle from "./WalletDetailsCard.styles";
import formatter from '../../../utils/formatter';
import STYLES from '../../../constants/STYLES';
import { MODALS } from "../../../constants/UI";

class WalletDetailsCard extends PureComponent {

  static propTypes = {
    walletSummary: PropTypes.instanceOf(Object).isRequired,
    navigateTo: PropTypes.func.isRequired
  };

  navigateToBalanceHistory = () => this.props.navigateTo('BalanceHistory');
  navigateToDeposit = () => this.props.navigateTo('Deposit', { coin: "CEL" });
  navigateToWalletInterest = () => this.props.navigateTo('WalletInterest');
  openInterestModal = () => this.props.openModal(MODALS.TODAY_INTEREST_RATES_MODAL);

  render() {
    const { walletSummary } = this.props;
    const walletDetailsCardStyle = WalletDetailsCardStyle();

    return (
      <Card padding='12 12 12 12'>
        <View style={walletDetailsCardStyle.container}>
          <View>
            <TouchableOpacity onPress={this.navigateToBalanceHistory}>
              <CelText weight='300' type="H6">Total Wallet balance</CelText>
              <CelText weight='600' type="H3" margin='3 0 3 0'>{formatter.usd(walletSummary.total_amount_usd)}</CelText>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.navigateToDeposit}>
              <CelText color={STYLES.COLORS.CELSIUS_BLUE}>Deposit coins</CelText>
            </TouchableOpacity>
          </View>

          <Separator vertical/>

          <View>
            <TouchableOpacity onPress={this.navigateToWalletInterest}>
              <CelText weight='300' type="H6">Total Interest earned</CelText>
              <CelText weight='600' type="H3" margin='3 0 3 0'>{formatter.usd(walletSummary.total_interest_earned)}</CelText>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.openInterestModal}>
              <CelText color={STYLES.COLORS.CELSIUS_BLUE}>Rates this week</CelText>
            </TouchableOpacity>
          </View>
        </View>


      </Card>
    );
  }
}

export default testUtil.hookComponent(WalletDetailsCard);
