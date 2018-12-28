import React, {Component} from 'react';
import { Text } from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from '../../atoms/CelButton/CelButton';
import CelForm from "../../atoms/CelForm/CelForm";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";

@connect(
  state => ({
    callsInProgress: state.api.callsInProgress,
    formData: state.ui.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class BRWChooseCollateral extends Component {
  render() {
    const { actions } = this.props;
    return (
      <SimpleLayout
        animatedHeading={{ text: 'Choose a collateral'}}
      >
        <CelForm margin="20 0 0 0">
          <Text style={globalStyles.normalText}>Choose a coin to use as collateral</Text>
        </CelForm>

        <CelButton
          margin="40 0 0 0"
          color="blue"
          onPress={() => actions.navigateTo('BRWLoanOption')}
        >
          Deposit more funds
        </CelButton>
      </SimpleLayout>
    );
  }
}

export default BRWChooseCollateral;
