import React, { Component } from "react";
import { Text, Image, Linking } from "react-native";
import { View } from "native-base";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import testUtil from "../../../utils/test-util";

import API from '../../../config/constants/API';
import apiUtil from '../../../utils/api-util';
import CatImage from '../../../../assets/images/avatar-cat-2.png'
import * as appActions from "../../../redux/actions";
import meService from "../../../services/me-service"

import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import PasscodeStyle from "./Passcode.styles";
import { STYLES, GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";

import CelButton from "../../atoms/CelButton/CelButton";
import CelInput from "../../atoms/CelInput/CelInput";
import CelForm from "../../atoms/CelForm/CelForm";

const types = {
  createPasscode: {
    title: `Create a${'\n'} PIN`,
    text: `Please create a 4-digit PIN${'\n'}to make your transactions even${'\n'} more secure.`,
    buttonText: 'Repeat PIN',
    field: 'pin',
    testSelector: 'pin',
  },
  repeatPasscode: {
    title: `Repeat your${'\n'} PIN`,
    text: `Please type your PIN number${'\n'}one more time to confirm`,
    buttonText: 'Confirm',
    field: 'pin_confirm',
    testSelector: 'pinRepeat',
  },
  enterPasscode: {
    title: `Enter your${'\n'} PIN`,
    text: `To continue with your withdrawal${'\n'} please enter your 4-digit PIN.`,
    buttonText: 'Confirm',
    field: 'pin',
  },
  loginPasscode: {
    title: 'Welcome to Celsius',
    text: 'Please enter your PIN to start',
    buttonText: 'Enter PIN',
    field: 'pin'
  }
};

const codeLength = 4;

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    withdrawalAddresses: state.wallet.withdrawalAddresses,
    userActions: state.ui.userActions,
    formData: state.forms.formData,
    callsInProgress: state.api.callsInProgress,
    activeScreen: state.nav.routes[state.nav.index].routeName,
    previousScreen: state.nav.routes[state.nav.index - 1] ? state.nav.routes[state.nav.index - 1].routeName : null
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Passcode extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['enterPasscode', 'repeatPasscode', 'createPasscode', 'loginPasscode']).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isPressed: false,
    };
  }

  onPressButton = async (pinRepeat = "") => {
    const { previousScreen, type, formData, currency, amountCrypto, actions, withdrawalAddresses, newWithdrawalAddress, purpose, userActions } = this.props;
    let newFormData;
    if (pinRepeat) {
      newFormData = {
        ...formData,
        pin_confirm: pinRepeat
      }
    } else {
      newFormData = formData;
    }
    if (type === 'repeatPasscode') {
      return actions.setPin(newFormData);
    }
    if (type === 'createPasscode') {
      actions.navigateTo('RepeatPasscode');
    }
    if (type === 'enterPasscode') {
      // TODO(fj): move pin checking to action
      const pin = newFormData;
      const withdrawalAddress = withdrawalAddresses[currency.toLowerCase()];

      try {
        this.setState({ isPressed: true });
        await meService.checkPin(pin);

        actions.storePin(pin.pin);

        if (purpose === 'withdraw') {
          if ((!withdrawalAddress.manually_set || !withdrawalAddress.address) && newWithdrawalAddress) {
            await actions.setCoinWithdrawalAddressAndWithdrawCrypto(currency, newWithdrawalAddress, amountCrypto);
          } else {
            await actions.withdrawCrypto(currency, amountCrypto);
          }
        } else if (purpose === 'send') {
          actions.navigateTo('AmountInput', { purpose: 'confirm-send' });
        } else if (purpose === 'login') {
          actions.navigateTo('WalletBalance');
        }
        this.setState({ isPressed: false });
      } catch (error) {
        actions.showMessage('error', error.error);
        this.setState({ isPressed: false });
      }
    }

    if (type === 'loginPasscode') {
      const pin = newFormData;
      try {
        await meService.checkPin(pin);
        if (previousScreen === null) {
          actions.navigateTo('Home');
        } else {
          actions.navigateTo(previousScreen);
        }
        if (!userActions.enteredInitialPin) {
          actions.fireUserAction('enteredInitialPin');
          actions.openInitialModal();
        }
      } catch (e) {
        actions.showMessage('error', e.error);
      }
    }
  };

  onChange = (field, text) => {
    const { formData, actions, type } = this.props;
    if (field === 'pin_confirm' && text.length === codeLength) {
      if (formData.pin !== text) {
        actions.updateFormField(field, text)
        actions.updateFormField('error', true)
        return actions.showMessage('error', 'Pin code should be the same');
      }
    }
    actions.updateFormField('error', false)
    actions.updateFormField(field, text);

    if (text.length === 4 && type !== 'createPasscode') {
      if (type === "repeatPasscode") {
        this.onPressButton(text);
      } else {
        this.onPressButton();
      }
    }
  }


  render() {
    const { activeScreen, type, formData, callsInProgress, testSelector } = this.props;
    const { isPressed } = this.state;

    const field = types[type].field;
    const disabled = (formData[field] == null || formData[field].length < codeLength) || formData.error;
    const pinValue = formData[field];
    const isLoading = apiUtil.areCallsInProgress([API.SET_PIN], callsInProgress);

    const mainHeader = type === 'loginPasscode' ? { backButton: false } : { backButton: activeScreen !== 'Home' };
    return <SimpleLayout mainHeader={mainHeader} background={STYLES.PRIMARY_BLUE} ref={testUtil.generateTestHook(this, testSelector)}>
      <View style={PasscodeStyle.root}>
        <Text style={PasscodeStyle.title}>{types[type].title}</Text>
        <Image style={PasscodeStyle.image} source={CatImage} />
        <Text style={PasscodeStyle.text}>{types[type].text}</Text>
        <CelForm>
          <CelInput type="pin"
            testSelector={`passcode.${types[type].field}`}
            value={pinValue}
            digits={codeLength}
            onChange={this.onChange}
            field={types[type].field} />
        </CelForm>
        <CelButton
          ref={testUtil.generateTestHook(this, `Passcode.${types[type].buttonText}`)}
          white
          inverse={type !== 'createPasscode'}
          loading={isLoading}
          disabled={disabled || isLoading || isPressed}
          hideBorder={type !== 'createPasscode'}
          onPress={() => this.onPressButton()}>
          {type === 'createPasscode' && types[type].buttonText}
        </CelButton>

        {type === 'enterPasscode' || type === 'loginPasscode' && (
          <View style={{ marginTop: 20 }}>
            <Text style={[globalStyles.normalText, { color: 'white', textAlign: 'center', opacity: 0.8 }]}>Forgot PIN?</Text>
            <Text style={[globalStyles.normalText, { color: 'white', textAlign: 'center' }]}>
              Get in touch with <Text
                style={{ textDecorationLine: 'underline' }}
                onPress={() => Linking.openURL("mailto:app@celsius.network")}>Celsius support</Text>
            </Text>
          </View>
        )}

      </View>
    </SimpleLayout>
  }
}

export default testUtil.hookComponent(Passcode);
