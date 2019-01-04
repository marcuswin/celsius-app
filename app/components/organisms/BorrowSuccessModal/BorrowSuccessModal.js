import React, {Component} from 'react';
import { Text, View, Image } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import { MODALS } from "../../../config/constants/common";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import CelModal from "../../atoms/CelModal/CelModal";
import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BorrowSuccessModal extends Component {
  render() {
    const { actions } = this.props;

    return (
      <CelModal name={MODALS.BORROW_SUCCESS_MODAL}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../../../assets/images/monkey-success3x.png') } style={{ width: 120, height: 120 }} />
        </View>

        <Text style={[globalStyles.largeHeading, { marginTop: 15, marginBottom: 10 }]}>Congrats!</Text>

        <Text style={[globalStyles.normalText, { textAlign: 'center' }]}>
          You have successfully submitted a loan application. A member of our team will contact you within 48 hours.
        </Text>

        <CelButton
          onPress={() => actions.closeModal()}
          margin="30 0 0 0"
        >
          Done
        </CelButton>
      </CelModal>
    );
  }
}

export default BorrowSuccessModal;
