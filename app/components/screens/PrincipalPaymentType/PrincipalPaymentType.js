import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {COIN_CARD_TYPE} from '../../../constants/UI'
import * as appActions from "../../../redux/actions";
import PrincipalPaymentTypeStyle from "./PrincipalPaymentType.styles";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import Icon from '../../atoms/Icon/Icon'
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CollateralCoinCard from "../../molecules/CollateralCoinCard/CollateralCoinCard";

@connect(
  state => ({
    coins: state.compliance.loan.collateral_coins,
    walletCoins: state.wallet.summary.coins,
    formData: state.forms.formData,
    allLoans: state.loans.allLoans,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class PrincipalPaymentType extends Component {
  static navigationOptions = () => ({
    title: "Principal Payment Type",
  });

  handleSelectCoin = (coin) => {
    const { actions } = this.props
    actions.updateFormField('coin',  coin )
    actions.navigateBack()
    this.renderMessage(coin)
  }

  renderMessage = (coin) => {
    const { actions } = this.props
    actions.showMessage("success", `You have successfully set up principal payout in ${coin.toUpperCase()}.`)
  }

  render() {
    const { actions, coins, walletCoins } = this.props;
    const style = PrincipalPaymentTypeStyle();

    const availableCoins = walletCoins
      .filter(coin => coins.includes(coin.short))
      .sort((a,b) => Number(a.amount_usd) < Number(b.amount_usd))

    return (
        <RegularLayout
          fabType='hide'
        >
          <View style={{alignItems: 'center'}}>
            <CelText margin={"0 0 10 0"} weight={"300"} type={'H4'} align={'center'}>
              Choose a coin from your wallet for your loan principal payment
            </CelText>
          </View>

          <View style={style.wrapper}>
            {availableCoins.map(coin => (
              <CollateralCoinCard
                key={coin.short}
                handleSelectCoin={this.handleSelectCoin}
                coin={coin}
                type={COIN_CARD_TYPE.PRINCIPAL_PAYMENT_COIN_CARD}
              />
            ))
            }
          </View>

          <TouchableOpacity
            style={style.addMoreCoinsList}
            onPress={() => actions.navigateTo('Deposit')}
          >
            <Icon fill={'gray'} width='17' height='17' name='CirclePlus' />
            <CelText type='H5' margin={'0 0 0 5'}>
              Deposit coins
            </CelText>
          </TouchableOpacity>

          <Card close>
            <CelText type='H5' weight={"500"} margin={'0 0 10 5'}>
              Make sure you have enough coins
            </CelText>
            <CelText type='H5' margin={'0 0 0 5'}>
              Add more coins to make sure you have enough in your wallet for your monthly interest payment.
            </CelText>
          </Card>
        </RegularLayout>
    );
  }
}

export default PrincipalPaymentType
