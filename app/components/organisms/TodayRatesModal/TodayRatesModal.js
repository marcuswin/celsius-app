import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Text } from "react-native";

import * as appActions from "../../../redux/actions";
import CelModal from "../../atoms/CelModal/CelModal";
import { MODALS } from "../../../config/constants/common";

// import TodayRatesModalStyle from "./TodayRatesModal.styles";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TodayRatesModal extends Component {
  render() {
    return (
      <CelModal name={MODALS.TODAY_RATES_MODAL}>
        <Text>Today is a good day</Text>
      </CelModal>
    )
  }
}

export default TodayRatesModal;
