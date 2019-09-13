import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
import LoanPaymentCoinStyle from "./LoanPaymentCoin.styles";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import Icon from "../../atoms/Icon/Icon";
import Card from "../../atoms/Card/Card";
import {COIN_CARD_TYPE} from "../../../constants/UI";
import CollateralCoinCard from "../../molecules/CollateralCoinCard/CollateralCoinCard";

@connect(
  state => ({
    currenciesRates: state.currencies.rates,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class LoanPaymentCoin extends Component {
  static propTypes = {};
  static defaultProps = {}

  static navigationOptions = () => ({
    title: "Pay with Crypto",
    right: "profile"
  });

  handleSelectCoin = async (coinShort) => {
    const { actions, loanCollateral, coinAmount, navigation} = this.props;
    const reason = navigation.getParam("reason");
    const id = navigation.getParam("id");

    // loanCollateral and coinAmount from backend to Redux

    const loanAmount = loanCollateral < coinAmount; // TODO - check this props
    if (!loanAmount) {
      if (reason) {
        await actions.updateLoanSettings(id, {interest_payment_asset: coinShort})
        actions.showMessage("success", "You have successfully changed interest payment method")

        return actions.navigateTo("LoanSettings")
      }
      actions.navigateTo("LoanPrepaymentPeriod", { coin: coinShort, id })
    }
    return
  }

  render() {
    const { currenciesRates, actions } = this.props;
    const style = LoanPaymentCoinStyle();

    return (
      <RegularLayout>
        <CelText margin={"0 0 10 0"} align={"center"} weight={"300"}>Choose a coin from your wallet to complete your loan interest payment</CelText>
        { currenciesRates.map(coin => (
          <CollateralCoinCard
            key={coin.short}
            handleSelectCoin={this.handleSelectCoin}
            coin={coin}
            type={COIN_CARD_TYPE.LOAN_PAYMENT_COIN_CARD}
          />
          ))}

        <TouchableOpacity
          style={style.addMoreCoinsList}
          onPress={() => actions.navigateTo('Deposit')}
        >
          <Icon fill={'gray'} width='17' height='17' name='CirclePlus' />
          <CelText type='H5' margin={"0 0 0 5"}>
            Deposit coins
          </CelText>
        </TouchableOpacity>

        <Card close>
          <CelText weight={"500"} type={"H5"}>Make sure you have enough coins</CelText>
          <CelText margin={"10 0 5 0"} weight={"300"} type={"H5"}>Add more coins to make sure you have enough in your wallet for your monthly interest payment.</CelText>
        </Card>
      </RegularLayout>
    );
  }
}

export default LoanPaymentCoin
