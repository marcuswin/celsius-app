import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Text, View } from "react-native";
import testUtil from "../../../utils/test-util";

import * as appActions from "../../../redux/actions";
import CelModal from "../../atoms/CelModal/CelModal";
import { MODALS } from "../../../config/constants/common";
import CurrencyInterestRateInfoTable from "../CurrencyInterestRateInfoTable/CurrencyInterestRateInfoTable";
import CelButton from "../../atoms/CelButton/CelButton";
import CelCheckbox from "../../atoms/CelCheckbox/CelCheckbox";

import TodayRatesModalStyle from "./TodayRatesModal.styles";

@connect(
  state => ({
    appSettings: state.users.appSettings,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TodayRatesModal extends Component {

  toggleRatesModal = () => {
    const { actions, appSettings: { showTodayRatesModal } } = this.props;

    actions.updateUserAppSettings({
      showTodayRatesModal: !showTodayRatesModal,
    })
  };

  render() {
    const { actions, appSettings: { showTodayRatesModal } } = this.props;
    return (
      <CelModal name={MODALS.TODAY_RATES_MODAL} modalStyle={{paddingTop:0,paddingBottom: 20,}} contentStyle={{paddingLeft: 0, paddingRight: 0,}}>
        <View style={TodayRatesModalStyle.modalHeadingWrapper}>
          <Text style={TodayRatesModalStyle.mainHeadingText}>HODL</Text>
          <Text style={TodayRatesModalStyle.secondaryHeadingText}>with Celsius</Text>
        </View>
        <View style={{paddingLeft: 30, paddingRight: 30,}}>
          <View style={TodayRatesModalStyle.descriptionWrapper}>
            <Text style={TodayRatesModalStyle.descriptionTitleText}>Today's interest rates</Text>
            <Text style={TodayRatesModalStyle.descriptionText}>Deposit coins to your wallet now to start earning at these rates: </Text>
          </View>
          <CurrencyInterestRateInfoTable style={{marginVertical: 20,}}/>
          <CelButton ref={testUtil.generateTestHook(this, 'TodayRatesModal.popUP')} onPress={() => actions.closeModal()} size="small">
            Go to wallet
          </CelButton>
          <View style={TodayRatesModalStyle.checkboxWrapper}>
            <CelCheckbox
              theme='blue'
              size="small"
              label="Don't show this on open"
              value={!showTodayRatesModal}
              onChange={this.toggleRatesModal}
            />
          </View>
        </View>
      </CelModal>
    )
  }
}

export default testUtil.hookComponent(TodayRatesModal);
