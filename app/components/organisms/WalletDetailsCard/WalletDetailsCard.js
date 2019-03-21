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
import Icon from '../../atoms/Icon/Icon'

class WalletDetailsCard extends PureComponent {

  static propTypes = {
    walletSummary: PropTypes.instanceOf(Object).isRequired,
    navigateTo: PropTypes.func.isRequired
  };

  navigateToBalanceHistory = () => this.props.navigateTo('BalanceHistory');

  navigateToWalletInterest = () => this.props.navigateTo('WalletInterest')

  render() {
    const { walletSummary } = this.props;
    const walletDetailsCardStyle = WalletDetailsCardStyle();
    const dailyDiff = walletSummary.daily_diff
    const textColor = dailyDiff < 0 ? STYLES.COLORS.RED : STYLES.COLORS.GREEN
    const arrowType = dailyDiff < 0 ? "DownArrow" : "UpArrow"

    return (
      <Card padding='12 12 12 12'>
        <View style={walletDetailsCardStyle.container}>
          <TouchableOpacity onPress={this.navigateToBalanceHistory}>
            <CelText weight='300' type="H6">Total Wallet balance</CelText>
            <CelText weight='600' type="H3" margin='3 0 3 0'>{formatter.usd(walletSummary.total_amount_usd)}</CelText>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Icon name={arrowType} fill={textColor} height={6} width={6}/>
              <CelText weight='500' color={textColor} margin='0 0 0 3'>{dailyDiff ? Math.abs(dailyDiff).toFixed(2) : 0} %</CelText>
            </View>
          </TouchableOpacity>

          <Separator vertical/>

          <TouchableOpacity onPress={this.navigateToWalletInterest}>
            <CelText weight='300' type="H6">Total Interest earned</CelText>
            <CelText weight='600' type="H3" margin='3 0 3 0'>{formatter.usd(walletSummary.total_interest_earned)}</CelText>
            <CelText color={STYLES.COLORS.CELSIUS_BLUE}>Todays rates</CelText>
          </TouchableOpacity>
        </View>
      </Card>
    );
  }
}

export default testUtil.hookComponent(WalletDetailsCard);
