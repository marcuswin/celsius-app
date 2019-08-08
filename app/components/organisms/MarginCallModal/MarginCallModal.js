import React, { Component } from 'react';
import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { MODALS } from '../../../constants/UI'
import * as appActions from "../../../redux/actions";
// import MarginCallModalStyle from "./MarginCallModal.styles";
import CelText from '../../atoms/CelText/CelText';
import CelModal from '../CelModal/CelModal';
import CelButton from '../../atoms/CelButton/CelButton';

@connect(
  state => ({
    walletCurrencies: state.currencies.rates,
    walletSummary: state.wallet.summary,
    marginCalls: state.loans.marginCalls
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class MarginCallModal extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  // marginCalls.allCoins[walletSummary]

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderLockOriginateCoin = () => {
    const { marginCalls, actions } = this.props

    return (
      < View >
        <View>
          <CelText align='center' weight='300' type='H4' margin='0 0 24 0'>
            The value of your collateral has dropped significantly. To match the value with the current
            market prices, we will need to lock an additional
            <CelText align='center' weight='600' type='H4'> {marginCalls[0].margin_call_amount} {marginCalls[0].collateral_coin} </CelText>
            <CelText align='center' weight='300' type='H4' margin='0 0 25 0' > from your wallet balance. You can also deposit more funds or choose other coins from your wallet.
            </CelText>
          </CelText>
        </View>
        <CelButton type='H4' weight='500' onPress={() => actions.lockMarginCollateral(marginCalls[0].id, { coin: marginCalls[0].collateral_coin, amount_collateral_crypto: marginCalls[0].margin_call_amount, amount_collateral_usd: marginCalls[0].margin_call_usd_amount }) && actions.closeModal()}> Lock {marginCalls[0].margin_call_amount} {marginCalls[0].collateral_coin} </CelButton>
        <CelButton basic margin='10 0 0 0' onPress={() => actions.closeModal() && actions.navigateTo('ChooseMarginCollateralCoin', { marginCall: marginCalls[0] })}>Use other coins</CelButton>
      </View >
    )
  }

  renderLockOtherCoins = () => {
    const { marginCalls, actions } = this.props
    return (
      <View>
        <CelText type='H4' weight='300' align='center' margin='0 0 20 0'>The value of your collateral droped significantly. To match the value with the market prices please choose a coin from your wallet with enough balance, or deposit more coins.</CelText>
        <CelButton type='H6' weight='500' onPress={() => actions.closeModal() && actions.navigateTo('ChooseMarginCollateralCoin', { marginCall: marginCalls[0] })}>Choose a coin from wallet</CelButton>
      </View>
    )
  }

  renderLockNoCoins = () => {
    const { actions, marginCalls } = this.props
    return (
      <View>
        <CelText type='H4' weight='300' align='center' margin='0 0 20 0'>The value of your collateral dropped significantly. To match the value with the market prices please deposit enough coins to use as collateral.</CelText>
        <CelButton type='H4' weight='500' onPress={() => { 
          actions.closeModal(); actions.navigateTo('Deposit', { coin: marginCalls[0].collateral_coin, isMarginWarning: true })}}>Deposit coins</CelButton>
      </View>
    )
  }

  render() {
    const { marginCalls, walletSummary } = this.props

    const hasEnoughOriginateCoin = !!walletSummary.coins.find(coin => coin.short === marginCalls[0].collateral_coin && coin.amount >= marginCalls[0].margin_call_amount)
    const hasEnoughOtherCoins = !!walletSummary.coins.find(coin => marginCalls[0].allCoins[coin.short] <= coin.amount)

    return (
      <CelModal name={MODALS.MARGIN_CALL_MODAL}
                picture={require('../../../../assets/images/alert.png')}
      >
        <View>
          <CelText align='center' type='H2' margin='30 0 30 0' weight='bold'>
            Margin Call Warning!
          </CelText>
          {hasEnoughOriginateCoin && this.renderLockOriginateCoin()}
          {!hasEnoughOriginateCoin && hasEnoughOtherCoins && this.renderLockOtherCoins()}
          {!hasEnoughOriginateCoin && !hasEnoughOtherCoins && this.renderLockNoCoins()}
        </View>
      </CelModal>
    )
  }
}

export default MarginCallModal
