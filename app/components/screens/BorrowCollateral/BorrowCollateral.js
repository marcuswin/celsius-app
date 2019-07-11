import React, { Component } from "react";
import { View } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
import BorrowCollateralStyle from "./BorrowCollateral.styles";
import CelText from "../../atoms/CelText/CelText";
import CelButton from "../../atoms/CelButton/CelButton";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import ProgressBar from "../../atoms/ProgressBar/ProgressBar";

import CollateralCoinCard from "../../molecules/CollateralCoinCard/CollateralCoinCard";

@connect(
  state => ({
    coins: state.compliance.loan.collateral_coins,
    walletCoins: state.wallet.summary.coins,
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BorrowCollateral extends Component {
  static navigationOptions = () => ({
    title: "Collateral",
    right: "profile"
  });

  handleSelectCoin = (coin) => {
    const { actions } = this.props

    actions.updateFormField('coin', coin)
    actions.navigateTo('BorrowLoanOption')
  }

  render() {
    const { actions, coins, walletCoins } = this.props;
    const style = BorrowCollateralStyle();

    const availableCoins = walletCoins.filter(coin => coins.includes(coin.short));
    return (
      <RegularLayout>
        <View style={{alignItems: 'center'}}>
          <ProgressBar steps={6} currentStep={2}/>
          <CelText margin={"30 0 30 0"} weight={"300"}>Choose a coin to use as a collateral:</CelText>
        </View>

        <View style={style.wrapper}>
          {availableCoins.map(coin => (
            <CollateralCoinCard 
              key={coin.short}
              handleSelectCoin={this.handleSelectCoin}
              coin={coin}/>
          ))
          }
        </View>

        <CelButton margin="50 0 30 0" onPress={() => actions.navigateTo("Deposit")}>
          Deposit more funds
        </CelButton>

      </RegularLayout>
    );
  }
}

export default BorrowCollateral
