import React, {Component} from 'react';
import { Linking, Text, View } from "react-native";
import {Content} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import TransactionConfirmationStyle from "./TransactionConfirmation.styles";
import AmountInputStyle from "../AmountInput/AmountInput.styles";
import CelButton from "../../../components/atoms/CelButton/CelButton";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import {MainHeader} from "../../molecules/MainHeader/MainHeader";
import CelHeading from "../../atoms/CelHeading/CelHeading";
import formatter from "../../../utils/formatter";
import apiUtil from "../../../utils/api-util";
import API from "../../../config/constants/API";

@connect(
  state => ({
    formData: state.ui.formData,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class TransactionConfirmation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
    // binders
  }

  // lifecycle methods
  // event hanlders
  confirmWithdrawal = () => {
    const { formData, withdrawCrypto } = this.props;
    withdrawCrypto(formData.currency, formData.amountCrypto);
  }
  // rendering methods
  render() {
    const { formData, callsInProgress } = this.props;

    const mainAmountText = formData.inUsd ? formatter.usd(formData.amountUsd) : formatter.crypto(formData.amountCrypto, formData.currency.toUpperCase(), { precision: 5 });
    const secondaryAmountText = !formData.inUsd ? formatter.usd(formData.amountUsd) : formatter.crypto(formData.amountCrypto, formData.currency.toUpperCase(), { precision: 5 });

    const balanceCrypto = formData.balance - formData.amountCrypto;
    const balanceUsd = balanceCrypto * formData.rateUsd;

    const isLoading = apiUtil.areCallsInProgress([API.WITHDRAW_CRYPTO], callsInProgress);

    return (
      <BasicLayout
        bottomNavigation={false}
      >
        <MainHeader backButton/>
        <CelHeading text="Withdraw ETH" />
        <Content>
          <View style={AmountInputStyle.inputWrapper}>
            <Text
              style={AmountInputStyle.fiatAmount}
            >
              { mainAmountText }
            </Text>
            <Text style={AmountInputStyle.cryptoAmount}>{ secondaryAmountText }</Text>
            <View style={AmountInputStyle.separator}/>
            <View style={AmountInputStyle.newBalance}>
              <Text style={AmountInputStyle.newBalanceText}> New balance:</Text>
              <Text style={AmountInputStyle.newBalanceText}>{ formatter.crypto(balanceCrypto, formData.currency.toUpperCase(), { precision: 5 }) } = </Text>
              <Text style={AmountInputStyle.newBalanceText}>{ formatter.usd(balanceUsd) }</Text>
            </View>
          </View>

          <Text style={TransactionConfirmationStyle.explanationText}>
            This is the only address you can make withdrawals to. If you want to change the address, please <Text onPress={()=> Linking.openURL('mailto:hello@celsius.network')} style={TransactionConfirmationStyle.contactText}>contact Celsius support.</Text>
          </Text>

          <View style={TransactionConfirmationStyle.addresViewWrapper}>
            <Text style={TransactionConfirmationStyle.toAddress}>TO ADDRESS</Text>
            <Text style={TransactionConfirmationStyle.address}>0xbb9bc244d798123fde783fcc1c72d3bb8c189413</Text>
          </View>

          <CelButton
            onPress={this.confirmWithdrawal}
            margin='50 36 50 36'
            loading={isLoading}
            disabled={isLoading}
          >
            Confirm withdrawal
          </CelButton>
        </Content>
      </BasicLayout>
    );
  }
}

export default TransactionConfirmation;
