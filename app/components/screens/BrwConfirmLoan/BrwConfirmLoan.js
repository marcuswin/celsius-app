import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from '../../atoms/CelButton/CelButton';
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
        animatedHeading={{ text: 'Confirm your loan'}}
      >
        <Steps current={5} totalSteps={5} />
        <CelButton
          margin="40 0 0 0"
          color="blue"
          onPress={() => actions.navigateTo('Home', true)}
        >
          Apply for loan
        </CelButton>
      </SimpleLayout>
    );
  }
}

export default BRWTermOfLoan;
