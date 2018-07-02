import React, { Component } from "react";
import { Text, Image, Dimensions } from "react-native";
import { View } from "native-base";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import API from '../../../config/constants/API';
import apiUtil from '../../../utils/api-util';
import CatImage from '../../../../assets/images/avatar-cat-2.png'
import * as actions from "../../../redux/actions";
import PinInput from '../../atoms/PinInput/PinInput';
import meService from "../../../services/me-service"

import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import PasscodeStyle from "./Passcode.styles";
import { STYLES } from "../../../config/constants/style";

import CelButton from "../../atoms/CelButton/CelButton";


const types = {
    createPasscode: {
      title: `Create a${'\n'} PIN`,
      text: `Please create a 4-digit PIN${'\n'}to make your transactions even${'\n'} more secure.`,
      buttonText: 'Repeat PIN',
      field: 'pin',
    },
    repeatPasscode: {
      title: `Repeat your${'\n'} PIN`,
      text: `Please create a 4-digit PIN${'\n'} to make your transactions even more secure.`,
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
  dispatch => bindActionCreators(actions, dispatch),
)

class Passcode extends Component {

  static propTypes = {
    type: PropTypes.oneOf(['enterPasscode', 'repeatPasscode', 'createPasscode']).isRequired,
  };

  onPressButton = () => {
    if (this.props.type === 'repeatPasscode') {
      return this.props.setPin(this.props.formData);
    }
    if (this.props.type === 'createPasscode') {
      this.props.navigateTo('RepeatPasscode');
    }
    if (this.props.type === 'enterPasscode') {
      const pin = this.props.formData
      const checkPin = meService.checkPin(pin)
      checkPin.then(() => {
        this.props.storePin(pin.pin);
        this.props.navigateTo('AmountInput', {currency: this.props.currency})
      }, (error) => {
        this.props.showMessage('error', error.error);
      })
    }
  }

  onChange = (field, text) => {
    if (field === 'repeatPasscode' && text.length === codeLength) {
      if (this.props.formData.pin !== text) {
        this.props.updateFormField('error', true)
        return this.props.showMessage('error', 'Pin code should be the same');
      }
    }
    this.props.updateFormField('error', false)
    return this.props.updateFormField(types[this.props.type].field, text);
  }

  render() {
    const field = types[this.props.type].field;
    const disabled = (this.props.formData[field] == null || this.props.formData[field].length < codeLength) || this.props.formData.error;
    const isLoading = apiUtil.areCallsInProgress([API.SET_PIN], this.props.callsInProgress);
    const pinSize = 60;
    const pinSpacing = Math.min((Dimensions.get('window').width - 4*pinSize - 72) / 3, 19);
    const backButton = this.props.type !== 'createPasscode' || this.props.activeScreen === 'Home';

    return <SimpleLayout mainHeader={{ backButton }} bottomNavigation={false} background={STYLES.PRIMARY_BLUE}>
      <View style={PasscodeStyle.root}>
        <Text style={PasscodeStyle.title}>{types[this.props.type].title}</Text>
        <Image style={PasscodeStyle.image} source={CatImage} />
        <Text style={PasscodeStyle.text}>{types[this.props.type].text}</Text>
        <PinInput
          ref={ref => {
            this.pinInput = ref;
          }}
          codeLength={codeLength}
          space={pinSpacing}
          size={pinSize}
          inputPosition='center'
          cellBorderWidth={0}
          codeInputStyle={{fontSize: 45, fontFamily: 'agile-medium', borderRadius: 10, backgroundColor: '#5C6FB1'}}
          containerStyle={{marginBottom: 30}}
          onChangeCode={(code) => this.onChange(this.props.type, code)}
        />
        <CelButton
          white
          loading={isLoading}
          disabled={disabled || isLoading}
          onPress={() => this.onPressButton()}>
          {types[this.props.type].buttonText}
        </CelButton>
      </View>
    </SimpleLayout>
  }
}

export default Passcode;
