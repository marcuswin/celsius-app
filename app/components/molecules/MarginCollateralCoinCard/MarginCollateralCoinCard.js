import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getTheme } from "../../../utils/styles-util";
import * as appActions from "../../../redux/actions";
import MarginCollateralCoinCardStyle from "./MarginCollateralCoinCard.styles";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import CoinIcon from "../../atoms/CoinIcon/CoinIcon";
import Separator from "../../atoms/Separator/Separator";
import Icon from "../../atoms/Icon/Icon";
import STYLES from "../../../constants/STYLES";
import formatter from "../../../utils/formatter";

@connect(
  state => ({
    coins: state.compliance.loan.coins,
    currencies: state.currencies.rates,
    formData: state.forms.formData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class MarginCollateralCoinCard extends Component {
  static propTypes = {
    coin: PropTypes.instanceOf(Object).isRequired,
    marginCall: PropTypes.instanceOf(Object).isRequired,
    isMarginCall: PropTypes.bool
  };
  static defaultProps = {
    isMarginCall: false
  };

  constructor(props) {
    super(props);
    this.state = {
      currency: null
    };
    const { coin, marginCall } = this.props;
    this.name = formatter.capitalize(coin.name);
    this.crypto = formatter.crypto(coin.amount, coin.short, { precision: 2 });
    this.fiat = formatter.usd(coin.amount_usd);

    this.color =
      coin.amount < marginCall.allCoins[coin.short]
        ? STYLES.COLORS.RED
        : STYLES.COLORS.MEDIUM_GRAY;
    this.enoughMarginCoin = coin.amount >= marginCall.allCoins[coin.short];
  }

  componentDidMount() {
    const { currencies, coin } = this.props;
    const currency = currencies.filter(
      c => c.short === coin.short.toUpperCase()
    )[0];
    this.setState({ currency });
  }

  handleDepositCalculation = () => {
    const { coin, isMarginCall, marginCall } = this.props;
    // let value
    if (isMarginCall && marginCall.allCoins[coin.short] > coin.amount) {
      return formatter.crypto(marginCall.allCoins[coin.short] - coin.amount);
    }
    return marginCall.allCoins[coin.short];
  };

  render = () => {
    const { actions, coin, handleSelectCoin, marginCall } = this.props;
    const style = MarginCollateralCoinCardStyle();
    const theme = getTheme();
    const { currency } = this.state;

    // Add flow to next screen
    return (
      <Card
        onPress={
          this.enoughMarginCoin
            ? () =>
                handleSelectCoin(coin.short, marginCall.allCoins[coin.short])
            : null
        }
        color={this.enoughMarginCoin ? null : style.cardStyle.color}
      >
        <View key={coin.name} style={style.mainContainer}>
          <View style={style.iconContainer}>
            {currency && currency.image_url ? (
              <CoinIcon
                customStyles={[
                  style.coinImage,
                  { opacity: this.enoughMarginCoin ? 1 : 0.4 }
                ]}
                theme={theme}
                url={currency.image_url}
                coinShort={currency.short}
              />
            ) : null}
          </View>
          <View style={style.textContainer}>
            <View style={{ opacity: this.enoughMarginCoin ? 1 : 0.4 }}>
              <CelText weight={"600"} align="left" type="H3">
                {this.name}
              </CelText>
              <CelText
                weight={"300"}
                align="left"
                type="H6"
                style={{ color: this.color, marginTop: 5, marginBottom: 2 }}
              >
                {this.crypto}
                <CelText weight={"300"} type="H6" align="left">
                  {" | "}
                  <CelText
                    weight={"300"}
                    type="H6"
                    align="left"
                    style={{ color: this.color }}
                  >
                    {this.fiat} USD
                  </CelText>
                </CelText>
              </CelText>
              {marginCall &&
                this.enoughMarginCoin && (
                  <View style={style.marginRequired}>
                    <CelText align="left" weight="300" type="H6">
                      <CelText align="left" weight="600" type="H6">
                        {formatter.crypto(marginCall.allCoins[coin.short])}
                        {coin.short}{" "}
                      </CelText>required to cover margin call
                    </CelText>
                  </View>
                )}
            </View>
            {!this.enoughMarginCoin ? (
              <View>
                <Separator size={2} margin={"10 0 5 0"} />
                <View>
                  <CelText weight={"300"} align="left" type="H6">
                    Additional
                    <CelText weight={"500"} align="left" type="H6">
                      {` ${this.handleDepositCalculation()} `}
                      <CelText weight={"300"} align="left" type="H6">
                        required
                      </CelText>
                    </CelText>
                  </CelText>
                  <TouchableOpacity
                    onPress={() =>
                      actions.navigateTo("Deposit", { coin: coin.short })
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 5
                      }}
                    >
                      <Icon
                        fill={STYLES.COLORS.CELSIUS_BLUE}
                        width="13"
                        height="13"
                        name="CirclePlus"
                      />
                      <CelText
                        margin={"0 0 0 5"}
                        color={STYLES.COLORS.CELSIUS_BLUE}
                        type="H5"
                      >
                        Deposit more
                      </CelText>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </Card>
    );
  };
}

export default MarginCollateralCoinCard;
