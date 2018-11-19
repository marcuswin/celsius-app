import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { Content } from "native-base";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import moment from "moment";

import * as appActions from "../../../redux/actions";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import { MainHeader } from "../../molecules/MainHeader/MainHeader";
import CelHeading from "../../atoms/CelHeading/CelHeading";
import CelButton from "../../atoms/CelButton/CelButton";
import Icon from "../../atoms/Icon/Icon";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import WithdrawalInfoStyle from "./WithdrawalInfo.styles";
import BitcoinCashForkInfo from "../../organisms/BitcoinCashForkInfo/BitcoinCashForkInfo";

@connect(
  state => ({
    formData: state.ui.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WithdrawalInfo extends Component {
  shouldHideBCH = () => {
    const { formData: {currency} } = this.props;

    const currentTimestamp = moment.utc(Date.now());
    const bitcoinCashForkTimestamp = moment.utc('2018-11-15T04:40:00+0000');

    return currency === 'bch' && currentTimestamp.isAfter(bitcoinCashForkTimestamp);
  };

  render() {
    const { actions } = this.props;
    return (
      <BasicLayout background="blue">
        <MainHeader
          backButton={false}
          onCancel={() => actions.navigateBack()}
        />

        <View style={WithdrawalInfoStyle.iconWrapper}>
          <Icon name='Withdraw' width='70' height='70' fill='#FFFFFF' style={{ opacity: 0.6 }}/>
        </View>

        <CelHeading
          text={this.shouldHideBCH() ? 'Withdraw Funds' : "Are You Sure?"}
          textAlign="center"
        />

        <Content style={WithdrawalInfoStyle.content}>
          {!this.shouldHideBCH() && <Text style={[globalStyles.normalText, WithdrawalInfoStyle.text]}>
            The longer you HODL and the more you HODL, the more interest you'll earn with Celsius.
          </Text>}

          {!this.shouldHideBCH() && <Text style={[globalStyles.normalText, WithdrawalInfoStyle.text]}>
            Withdrawing your funds will reduce the amount of interest you could potentially earn.
          </Text>}

          {this.shouldHideBCH() && <BitcoinCashForkInfo/>}

          {!this.shouldHideBCH() && <CelButton
            white
            margin="20 30 20 30"
            onPress={() => actions.navigateTo('AmountInput', {purpose: 'withdraw'})}
          >
            Continue
          </CelButton>}
          {this.shouldHideBCH() && <CelButton
            white
            margin="20 30 20 30"
            onPress={() => actions.navigateBack()}
          >
            I Understand
          </CelButton>}
        </Content>
      </BasicLayout>
    );
  }
}

export default WithdrawalInfo;
