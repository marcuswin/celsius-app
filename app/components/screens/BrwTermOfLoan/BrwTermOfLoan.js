import React, {Component} from 'react';
import { Text } from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from '../../atoms/CelButton/CelButton';
import CelForm from "../../atoms/CelForm/CelForm";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import Steps from "../../molecules/Steps/Steps";

@connect(
  state => ({
    callsInProgress: state.api.callsInProgress,
    formData: state.ui.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class BRWTermOfLoan extends Component {
  render() {
    const { actions } = this.props;
    return (
      <SimpleLayout
        animatedHeading={{ text: 'Term of loan'}}
      >
        <Steps current={4} totalSteps={5} />
        <CelForm margin="20 0 0 0">
          <Text style={globalStyles.normalText}>Select for how long the loan will last:</Text>
        </CelForm>

        <CelButton
          margin="40 0 0 0"
          color="blue"
          onPress={() => actions.navigateTo('BRWConfirmLoan')}
        >
          Confirm loan
        </CelButton>
      </SimpleLayout>
    );
  }
}

export default BRWTermOfLoan;
