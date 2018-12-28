import React, {Component} from 'react';
import { Text } from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from '../../atoms/CelButton/CelButton';
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import Card from "../../atoms/Card/Card";

@connect(
  state => ({
    callsInProgress: state.api.callsInProgress,
    formData: state.ui.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class BRWLoanOption extends Component {
  render() {
    const { actions } = this.props;
    return (
      <SimpleLayout
        animatedHeading={{ text: 'Loan option'}}
      >
        <Text style={globalStyles.normalText}>Choose your loan option:</Text>

        <Card>
          <Text style={globalStyles.heading}>5%</Text>
        </Card>
        <Card>
          <Text style={globalStyles.heading}>9%</Text>
        </Card>
        <Card>
          <Text style={globalStyles.heading}>12%</Text>
        </Card>

        <CelButton
          margin="40 0 0 0"
          color="blue"
          onPress={() => actions.navigateTo('BRWTermOfLoan')}
        >
          Term of loan
        </CelButton>
      </SimpleLayout>
    );
  }
}

export default BRWLoanOption;
