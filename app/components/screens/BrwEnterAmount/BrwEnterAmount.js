import React, {Component} from 'react';
import { Text } from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from '../../atoms/CelButton/CelButton';
import CelInput from "../../atoms/CelInput/CelInput";
import CelForm from "../../atoms/CelForm/CelForm";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";

@connect(
  state => ({
    callsInProgress: state.api.callsInProgress,
    formData: state.ui.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class BRWEnterAmount extends Component {
  render() {
    const { formData, actions } = this.props;
    return (
      <SimpleLayout
        animatedHeading={{ text: 'Enter the amount'}}
      >
        <CelForm margin="20 0 0 0">
          <Text style={globalStyles.normalText}>How much do you want to borrow?</Text>
          <CelInput
            theme="white"
            type="number"
            labelText="$10,000"
            value={formData.amount}
            field="currentPassword"
          />
        </CelForm>

        <CelButton
          margin="40 0 0 0"
          color="blue"
          onPress={() => actions.navigateTo('BRWChooseCollateral')}
        >
          Choose a collateral
        </CelButton>
      </SimpleLayout>
    );
  }
}

export default BRWEnterAmount;
