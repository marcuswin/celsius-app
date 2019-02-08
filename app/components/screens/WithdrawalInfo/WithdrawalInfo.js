import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Content } from "native-base";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import moment from "moment";
import testUtil from "../../../utils/test-util";

import * as appActions from "../../../redux/actions";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import { MainHeader } from "../../molecules/MainHeader/MainHeader";
import CelHeading from "../../atoms/CelHeading/CelHeading";
import CelButton from "../../atoms/CelButton/CelButton";
import Icon from "../../atoms/Icon/Icon";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import WithdrawalInfoStyle from "./WithdrawalInfo.styles";
import EmptyState from "../../atoms/EmptyState/EmptyState";

@connect(
  state => ({
    formData: state.ui.formData,
    withdrawCompliance: state.users.compliance.withdraw,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WithdrawalInfo extends Component {
  shouldHideBCH = () => {
    const { formData: { currency } } = this.props;

    const currentTimestamp = moment.utc(Date.now());
    const bitcoinCashForkTimestamp = moment.utc('2018-11-15T04:40:00+0000');

    return currency === 'bch' && currentTimestamp.isAfter(bitcoinCashForkTimestamp);
  };

  renderCompliance() {
    const { withdrawCompliance, actions } = this.props
    return (
      <SimpleLayout
        mainHeader={{ backButton: false }}
        animatedHeading={{ text: 'Withdraw funds' }}
      >
        <EmptyState purpose={"Compliance"} text={withdrawCompliance.block_reason} />
        <CelButton
          onPress={() => actions.navigateTo('Home')}
          margin="15 0 0 0"
        >
          Go to Wallet
        </CelButton>
      </SimpleLayout>
    )
  }

  render() {
    const { actions, formData, withdrawCompliance } = this.props;
    const currencyCopy = formData.currency ? formData.currency.toUpperCase() : "coins";

    if (!withdrawCompliance.allowed) return this.renderCompliance()

    return (
      <BasicLayout background="blue">
        <MainHeader
          backButton={false}
          onCancel={() => actions.navigateBack()}
        />

        <View style={WithdrawalInfoStyle.iconWrapper}>
          <Icon name='Withdraw' width='70' height='70' fill='#FFFFFF' style={{ opacity: 0.6 }} />
        </View>

        <CelHeading
          text={"Are You Sure?"}
          textAlign="center"
        />

        <Content style={WithdrawalInfoStyle.content}>
          <Text style={[globalStyles.normalText, WithdrawalInfoStyle.text]}>
            The longer you HODL and the more you HODL, the more interest you'll earn with Celsius.
          </Text>

          <Text style={[globalStyles.normalText, WithdrawalInfoStyle.text]}>
            Withdrawing your funds will reduce the amount of interest you could potentially earn.
          </Text>

          <View style={WithdrawalInfoStyle.suggestionWrapper}>
            <Text style={WithdrawalInfoStyle.suggestion}>For your security, if you would like to withdraw more
            than <Text style={{ fontFamily: "agile-bold" }}>$20,000</Text> worth of {currencyCopy} you will be
            required to contact us at <Text style={{ fontFamily: "agile-bold" }}>app@celsius.network</Text> so that we
            can verify your identity prior to transferring your funds.</Text>
          </View>

          <CelButton
            ref={testUtil.generateTestHook(this, 'WithdrawalInfo.continue')}
            white
            margin="20 30 20 30"
            onPress={() => actions.navigateTo('AmountInput', { purpose: 'withdraw' })}
          >
            Continue
          </CelButton>

        </Content>
      </BasicLayout>
    );
  }
}

export default testUtil.hookComponent(WithdrawalInfo);

