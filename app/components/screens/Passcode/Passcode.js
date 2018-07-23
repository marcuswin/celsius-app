import React, { Component } from "react";
import { Text, Image } from "react-native";
import { View } from "native-base";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import API from '../../../config/constants/API';
import apiUtil from '../../../utils/api-util';
import CatImage from '../../../../assets/images/avatar-cat-2.png'
import * as appActions from "../../../redux/actions";
import meService from "../../../services/me-service"

import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import PasscodeStyle from "./Passcode.styles";
import { STYLES } from "../../../config/constants/style";

import CelButton from "../../atoms/CelButton/CelButton";
import CelInput from "../../atoms/CelInput/CelInput";
import CelForm from "../../atoms/CelForm/CelForm";

const types = {
    createPasscode: {
      title: `Create a${'\n'} PIN`,
      text: `Please create a 4-digit PIN${'\n'}to make your transactions even${'\n'} more secure.`,
      buttonText: 'Repeat PIN',
      field: 'pin',
    },
    repeatPasscode: {
      title: `Repeat your${'\n'} PIN`,
      text: `Please type your PIN number${'\n'}one more time to confirm`,
      buttonText: 'Confirm',
      field: 'pin_confirm',
    },
    enterPasscode: {
      title: `Enter your${'\n'} PIN`,
      text: `To continue with your withdrawal${'\n'} please enter your 4-digit PIN.`,
      buttonText: 'Confirm',
      field: 'pin',
    },
};

const codeLength = 4;

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    formData: state.ui.formData,
    callsInProgress: state.api.callsInProgress,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Passcode extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['enterPasscode', 'repeatPasscode', 'createPasscode']).isRequired,
  };

  onPressButton = () => {
    const { type, formData, currency, actions } = this.props;
    if (type === 'repeatPasscode') {
      return actions.setPin(formData);
    }
    if (type === 'createPasscode') {
      actions.navigateTo('RepeatPasscode');
    }
    if (type === 'enterPasscode') {
      // TODO(fj): move pin checking to action
      const pin = formData
      const checkPin = meService.checkPin(pin)
      checkPin.then(() => {
        actions.storePin(pin.pin);
        actions.navigateTo('AmountInput', {currency})
      }, (error) => {
        actions.showMessage('error', error.error);
      })
    }
  }

  onChange = (field, text) => {
    const { formData, actions } = this.props;
    if (field === 'pin_confirm' && text.length === codeLength) {
      if (formData.pin !== text) {
        actions.updateFormField('error', true)
        return actions.showMessage('error', 'Pin code should be the same');
      }
    }
    actions.updateFormField('error', false)
    return actions.updateFormField(field, text);
  }

  render() {
    const { activeScreen, type, formData, callsInProgress } = this.props;

    const field = types[type].field;
    const disabled = (formData[field] == null || formData[field].length < codeLength) || formData.error;
    const pinValue = formData[field];
    const isLoading = apiUtil.areCallsInProgress([API.SET_PIN], callsInProgress);
    const mainHeader = { backButton: activeScreen !== 'Home' };

    return <SimpleLayout mainHeader={mainHeader} bottomNavigation={false} background={STYLES.PRIMARY_BLUE}>
      <View style={PasscodeStyle.root}>
        <Text style={PasscodeStyle.title}>{types[type].title}</Text>
        <Image style={PasscodeStyle.image} source={CatImage} />
        <Text style={PasscodeStyle.text}>{types[type].text}</Text>
        <CelForm>
          <CelInput type="pin"
                    value={pinValue}
                    digits={codeLength}
                    onChange={this.onChange}
                    field={types[type].field}/>
        </CelForm>
        <CelButton
          white
          loading={isLoading}
          disabled={disabled || isLoading}
          onPress={() => this.onPressButton()}>
          {types[type].buttonText}
        </CelButton>
      </View>
    </SimpleLayout>
  }
}

export default Passcode;
