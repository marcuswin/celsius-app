import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import Icon from "../../atoms/Icon/Icon";
import CelButton from "../../atoms/CelButton/CelButton";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import { STYLES } from "../../../config/constants/style";
import SecureTransactionsStyle from "./SecureTransactions.styles";

@connect(
  state => ({
    // map state to props
    nav: state.nav
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class SecureTransactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
  }

  // lifecycle methods
  componentDidMount() {
    const { actions } = this.props;
    actions.updateUserAppSettings({ showSecureTransactionsScreen: false });
  }

  // event hanlders
  // rendering methods
  render() {
    const { actions, navigation } = this.props;
    const currency = navigation.getParam("currency");

    const currencyCopy = currency ? currency.toUpperCase() : "coins";
    return (

      <SimpleLayout
        background={STYLES.PRIMARY_BLUE}
        bottomNavigation={false}
      >
        <View style={SecureTransactionsStyle.content}>

          <Icon name={"BitGo"}
                width='199'
                height='50'
                fill={"white"}
                stroke={"white"}
                style={{
                  marginBottom: 15
                }}
          />
        </View>
        <Text style={SecureTransactionsStyle.title}>ALL TRANSACTIONS ARE SAFELY SECURED AND DEPOSITED WITH
          BITGO</Text>
        <Text style={SecureTransactionsStyle.explanation}>BitGo is a leading custodial service powering exchanges like
          Kraken and UPbit. Coins will also be moved from time to time to exchanges or to Hedge funds borrowing coins
          in order to short the market, in this case, coins are converted to fiat and secured in an FDIC-insured
          bank account.</Text>

        <CelButton
          onPress={() => actions.navigateTo("AddFunds", { currency })}
          white
        >
          Add Funds
        </CelButton>

        <View style={SecureTransactionsStyle.suggestionWrapper}>
          <Text style={SecureTransactionsStyle.suggestion}>For your security, if you would like to withdraw more
            than <Text style={{ fontFamily: "agile-bold" }}>$20.000</Text> worth of {currencyCopy} you will be
            required to contact us at <Text style={{ fontFamily: "agile-bold" }}>app@celsius.network</Text> so that we
            can verify your identity prior to transferring your funds.</Text>
        </View>

      </SimpleLayout>

    );
  }
}

export default SecureTransactions;
