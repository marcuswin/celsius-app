import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import * as appActions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from '../../atoms/CelButton/CelButton';
import Steps from "../../molecules/Steps/Steps";
import Card from "../../atoms/Card/Card";
import Separator from "../../atoms/Separator/Separator";
import formatter from '../../../utils/formatter';
import testUtil from "../../../utils/test-util";
import InfoBubble from '../../atoms/InfoBubble/InfoBubble';

@connect(
  state => ({
    formData: state.ui.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class BRWTermOfLoan extends Component {
  render() {
    const { actions, formData } = this.props;

    const monthlyPayment = formData.amount * formData.ltv.interest / 12;
    return (
      <SimpleLayout
        animatedHeading={{ text: 'Confirm your loan' }}
      >
        <Steps current={5} totalSteps={5} />

        <InfoBubble
          color={"gray"}
          margin={"22 0 0 0"}
          renderContent={() => (
            <View>
              <Text style={[globalStyles.normalText, { color: 'white' }]}>
                Your collateral will be locked and not earning interest until the loan is entirely paid out.
                </Text>
            </View>
          )}
        />

        <Card style={{ padding: 20, marginTop: 20 }}>
          <Text style={globalStyles.normalText}>You are borrowing:</Text>
          <Text style={[globalStyles.heading, { textAlign: 'left' }]}>{formatter.usd(formData.amount)} USD</Text>
          <Separator margin="10 0 10 0" />

          <Text style={globalStyles.normalText}>Collateral:</Text>
          <Text style={[globalStyles.heading, { textAlign: 'left' }]}>{formatter.usd(formData.collateralAmountUSD)} USD</Text>
          <Text style={globalStyles.normalText}>{formatter.crypto(formData.collateralAmountCrypto, formData.coin, { precision: 5 })}</Text>
          <Separator margin="10 0 10 0" />

          <Text style={globalStyles.normalText}>Term of loan:</Text>
          <Text style={[globalStyles.heading, { textAlign: 'left' }]}>{formData.termOfLoan} months</Text>
          <Separator margin="10 0 10 0" />

          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '50%', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={[globalStyles.heading, { textAlign: 'center' }]}>{Math.round(formData.ltv.interest * 10000) / 100 }%</Text>
              <Text style={[globalStyles.normalText, { textAlign: 'center' }]}>Annual interest rate</Text>
            </View>
            <View style={{ width: '50%', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={[globalStyles.heading, { textAlign: 'center' }]}>{formatter.usd(monthlyPayment)}</Text>
              <Text style={[globalStyles.normalText, { textAlign: 'center' }]}>Monthly interest payment</Text>
            </View>
          </View>
        </Card>

        <CelButton
          margin="40 0 0 0"
          color="blue"
          onPress={() => actions.applyForALoan()}
        >
          Apply for loan
        </CelButton>
      </SimpleLayout>
    );
  }
}

export default testUtil.hookComponent(BRWTermOfLoan);
