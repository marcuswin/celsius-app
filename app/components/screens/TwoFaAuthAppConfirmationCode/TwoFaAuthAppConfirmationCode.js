import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { View, Keyboard, TouchableOpacity, Clipboard } from 'react-native'

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import TwoFaAuthAppConfirmationCodeStyle from "./TwoFaAuthAppConfirmationCode.styles";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelInput from '../../atoms/CelInput/CelInput'
import CelButton from '../../atoms/CelButton/CelButton'
import { MODALS } from '../../../constants/UI'
import CelModal from '../../organisms/CelModal/CelModal'
import UI from '../../../constants/STYLES'

@connect(
  state => ({
    formData: state.forms.formData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TwoFaAuthAppConfirmationCode extends Component {

  static navigationOptions = () => ({
    title: "Auth App"
  });

  async componentDidMount() {
    const { actions } = this.props;
    actions.updateFormField('confirmationCode', '');
  }

  verifyAuthCode = async () => {
    const { actions, formData } = this.props;
    const success = await actions.enableTwoFactor(formData.confirmationCode);

    if (success) {
      Keyboard.dismiss()
      actions.openModal(MODALS.VERIFY_AUTHAPP_MODAL);
    }
  };

  done = async () => {
    const { actions} = this.props;

    await actions.closeModal()
    actions.navigateTo('SecuritySettings')
  }

  pasteCodeHelperButton = () => (
    <View style={{paddingLeft: 10, borderLeftColor: UI.COLORS.LIGHT_GRAY, borderLeftWidth: 2 }}>
    <TouchableOpacity onPress={this.paste}>
      <CelText weight='300'>Paste code</CelText>
    </TouchableOpacity>
    </View>
  )

  paste = async () => {
    const { actions } = this.props
    const code = await Clipboard.getString()

    if (code) {
      actions.updateFormField('confirmationCode', code)
    } else {
      actions.showMessage('warning', 'Nothing to paste.')
    }
  }

  render() {
    const { formData } = this.props;
    const style = TwoFaAuthAppConfirmationCodeStyle();

    return (
      <RegularLayout>
        <CelText type='H4' align='center'>Please enter the confirmation code from your authentication app:</CelText>

        <CelInput placeholder='Confirmation code' field={'confirmationCode'} value={formData.confirmationCode} margin={'30 0 0 0'} helperButton={this.pasteCodeHelperButton}/>
        <CelButton onPress={this.verifyAuthCode} margin={'20 0 0 0'} disabled={!formData.confirmationCode} iconRight={"IconArrowRight"}>
          Verify Auth App
        </CelButton>

        <CelModal name={MODALS.VERIFY_AUTHAPP_MODAL} shouldRenderCloseButton={false} picture={require('../../../../assets/images/Onboarding-Welcome3x.png')}>
          <View style={{ alignItems: "center", paddingTop: 40 }}>
            <CelText type='H2' align='center' weight='bold'>You have successfully turned Two-Factor Verification on</CelText>
            <CelText type='H5' align='center' weight='extra-light' margin={'20 0 0 0'}>You will now be asked for a verification code, every time you want to login or make a transaction.</CelText>
          </View>

          <View style={style.buttonBottom}>
            <CelButton onPress={this.done}>
              Done
            </CelButton>
          </View>
        </CelModal>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(TwoFaAuthAppConfirmationCode);
