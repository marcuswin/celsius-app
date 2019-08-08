import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import ChooseMarginCollateralCoinStyle from "./ChooseMarginCollateralCoin.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import HeadingProgressBar from "../../atoms/HeadingProgressBar/HeadingProgressBar";
import MarginCollateralCoinCard from "../../molecules/MarginCollateralCoinCard/MarginCollateralCoinCard";
import Icon from "../../atoms/Icon/Icon";

@connect(
  state => ({
    coins: state.compliance.loan.collateral_coins,
    walletCoins: state.wallet.summary.coins,
    formData: state.forms.formData,
    marginCalls: state.loans.marginCalls
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ChooseMarginCollateralCoin extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Choose Collateral",
    right: "profile"
  });

  handleSelectCoin = (coin, amount) => {
    const { actions, navigation } = this.props;
    const marginCall = navigation.getParam("marginCall");
    actions.lockMarginCollateral(marginCall.id, {
      coin,
      amount_collateral_crypto: amount,
      amount_collateral_usd: marginCall.margin_call_usd_amount
    });
    actions.navigateTo("BorrowLanding");
  };

  render() {
    const { actions, coins, walletCoins, marginCalls } = this.props;
    const style = ChooseMarginCollateralCoinStyle();

    const availableCoins = walletCoins
      .filter(coin => coins.includes(coin.short))
      .sort((a, b) => Number(a.amount_usd) < Number(b.amount_usd));

    return (
      <View style={{ flex: 1 }}>
        <HeadingProgressBar steps={6} currentStep={2} />
        <RegularLayout fabType="hide">
          <View style={{ alignItems: "center" }}>
            <CelText
              margin={"0 0 10 0"}
              weight={"300"}
              type={"H4"}
              align={"center"}
            >
              Choose a coin to use as a collateral to cover margin call prices:
            </CelText>
          </View>

          <View style={style.wrapper}>
            {availableCoins.map(coin => (
              <MarginCollateralCoinCard
                key={coin.short}
                handleSelectCoin={this.handleSelectCoin}
                coin={coin}
                isMarginCall
                marginCall={marginCalls[0]}
              />
            ))}
          </View>
          <TouchableOpacity
            style={style.addMoreCoinsList}
            onPress={() => actions.navigateTo("Deposit")}
          >
            <Icon fill={"gray"} width="17" height="17" name="CirclePlus" />
            <CelText type="H5" margin={"0 0 0 5"}>
              Deposit coins
            </CelText>
          </TouchableOpacity>
        </RegularLayout>
      </View>
    );
  }
}

export default ChooseMarginCollateralCoin;
