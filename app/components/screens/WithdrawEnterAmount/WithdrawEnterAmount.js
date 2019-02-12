import React, { Component } from 'react';
import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import WithdrawEnterAmountStyle from "./WithdrawEnterAmount.styles";
import CelText from '../../atoms/CelText/CelText';
import CelButton from '../../atoms/CelButton/CelButton';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import Card from "../../atoms/Card/Card";
import formatter from "../../../utils/formatter";
import CelNumpad from "../../molecules/CelNumpad/CelNumpad";
import { KEYPAD_PURPOSES } from "../../../constants/UI";
import CoinSwitch from "../../atoms/CoinSwitch/CoinSwitch";

@connect(
  state => ({
    walletSummary: state.wallet.summary,
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WithdrawEnterAmount extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    const { navigation, walletSummary } = this.props;
    const coin = navigation.getParam('coin')
    const coinData = walletSummary.coins.filter(c => c.short === coin.toUpperCase())[0];

    this.state = {
      header: {
        title: "Withdraw",
        left: "back",
      },
      coin,
      balanceCrypto: coinData.amount,
      balanceUsd: coinData.amount_usd,
    };
  }

  render() {
    const { header, balanceCrypto, balanceUsd, coin } = this.state;
    const { formData, actions } = this.props;
    // const style = WithdrawEnterAmountStyle();
    
    return (
      <RegularLayout header={header}>
        <View style={{ flex: 1, height: '100%' }}>
          <View style={{ paddingHorizontal: 20 }}>
            <Card>
              <CelText align="center">
                Balance: { formatter.crypto(balanceCrypto, coin) } | { formatter.usd(balanceUsd) }
              </CelText>
            </Card>

            <View>
              <CelText align="center" type="H2">{ coin }</CelText>

              <CoinSwitch
                updateFormField={actions.updateFormField}
                amountUsd={formData.amountUsd}
                amountCrypto={formData.amountCrypto}
                isUsd={formData.isUsd}
                coin={coin}
              />
            </View>

            <CelButton
              disabled
              onPress={() => actions.navigateTo('WalletLanding')}
            >
              Enter amount above
            </CelButton>
          </View>

          <CelNumpad
            field={formData.isUsd ? "amountUsd" : "amountCrypto" }
            value={formData.isUsd ? formData.amountUsd : formData.amountCrypto}
            updateFormField={actions.updateFormField}
            purpose={KEYPAD_PURPOSES.WITHDRAW}
          />
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(WithdrawEnterAmount);
