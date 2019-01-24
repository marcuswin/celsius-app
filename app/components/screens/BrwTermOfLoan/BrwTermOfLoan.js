import React, {Component} from 'react';
import { Text } from "react-native";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from '../../atoms/CelButton/CelButton';
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import Steps from "../../molecules/Steps/Steps";
import CelSlider from "../../molecules/CelSlider/CelSlider";
import testUtil from "../../../utils/test-util";

@connect(
  state => ({
    callsInProgress: state.api.callsInProgress,
    formData: state.ui.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class BRWTermOfLoan extends Component {
  render() {
    const { actions, formData } = this.props;
    const items = [
      { label: '6 M' },
      { label: '12 M' },
      { label: '18 M' },
      { label: '24 M' },
      { label: '30 M' },
      { label: '36 M' },
    ]
    return (
      <SimpleLayout
        animatedHeading={{ text: 'Term of loan'}}
      >
        <Steps current={4} totalSteps={5} />

        <Text style={[globalStyles.normalText, { marginVertical: 15 }]}>Select for how long the loan will last:</Text>

        <CelSlider
          field="termOfLoan"
          minimumValue={6}
          maximumValue={36}
          step={6}
          value={formData.termOfLoan}
          items={items}
        />

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

export default testUtil.hookComponent(BRWTermOfLoan);
