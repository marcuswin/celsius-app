import React, { Component } from "react";
import { Linking, Text, View } from "react-native";
import { capitalize } from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles, STYLES } from "../../../config/constants/style";
import CelInput from "../../atoms/CelInput/CelInput";
import CelButton from "../../atoms/CelButton/CelButton";
import meService from "../../../services/me-service";
import * as appActions from "../../../redux/actions";
import { VERIFY_IDENTITY_TYPES } from "../../../config/constants/common";
import VerifyIdentityScreenStyle from "./VerifyIdentityScreen.styles";

@connect(
  state => ({
    user: state.users.user,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class VerifyIdentity extends Component {
  constructor() {
    super();

    this.state = {
      inProgress: false,
      value: '',
    };
  }

  /**
   * @param {Object} user
   * @return {string}
   */
  getUserPrefferredVerificationType = (user) => {
    if (!user.two_factor_enabled) {
      return VERIFY_IDENTITY_TYPES.PIN;
    }

    return VERIFY_IDENTITY_TYPES.TWO_FACTOR;
  };

  /**
   * @param {string} field
   * @param {string} value
   */
  handleInputChange = (field, value) => {
    this.setState({
      value,
    })
  };

  handleConfirmButton = async () => {
    const {verificationAction, verificationCallback, navigation} = this.props;
    const {value} = this.state;

    const onVerificationAction = navigation && navigation && navigation.getParam("verificationAction") || verificationAction;
    const onVerificationCallback = navigation && navigation.getParam("verificationCallback") || verificationCallback;

    const {actions, user} = this.props;

    this.setState({inProgress: true,});

    try {
      if (onVerificationCallback) {
        if (user.two_factor_enabled) {
          await meService.checkTwoFactor(value);
        } else {
          await meService.checkPin({
            pin: value,
          });
        }

        this.setState({inProgress: false,});
        onVerificationCallback(value);
      } else {
        const stay = await onVerificationAction(value);

        if (stay) {
          this.setState({inProgress: false,});
        }
      }
    } catch (error) {
      this.setState({inProgress: false,});
      console.log(error);
      actions.showMessage('error', error.msg);
    }
  };

  render() {
    const {navigation, user, type, help, label, title, backButton} = this.props;
    const {value, inProgress} = this.state;

    const verificationType = navigation && navigation.getParam("verificationType") || type || this.getUserPrefferredVerificationType(user);
    const pinLength = verificationType === VERIFY_IDENTITY_TYPES.PIN ? 4 : 6;

    const disabled = !value || value.length !== pinLength || inProgress;

    const actionLabel = navigation && navigation.getParam("actionLabel") || label;
    const screenTitle = navigation && navigation.getParam("screenTitle") || title;
    const showHelp = navigation && navigation.getParam("showHelp") || help;

    return (
      <SimpleLayout
        mainHeader={{
          backButton,
        }}
        background={STYLES.PRIMARY_BLUE}>
        <View>
          <Text style={VerifyIdentityScreenStyle.title}>{screenTitle}</Text>
          {verificationType === VERIFY_IDENTITY_TYPES.PIN && <Text style={VerifyIdentityScreenStyle.description}>
            Please enter your PIN to {actionLabel}
          </Text>}
          {verificationType === VERIFY_IDENTITY_TYPES.TWO_FACTOR && <Text style={VerifyIdentityScreenStyle.description}>
            Please type your code from your authentication application to {actionLabel}
          </Text>}
          <CelInput type="pin"
                    value={value}
                    showDigits={verificationType === VERIFY_IDENTITY_TYPES.TWO_FACTOR}
                    digits={pinLength}
                    onChange={this.handleInputChange}
                    field="verifyIdentityValue"/>
          <CelButton white
                     disabled={disabled}
                     onPress={this.handleConfirmButton}>
            {capitalize(actionLabel)}
          </CelButton>
          {showHelp && <View style={{ marginTop: 20 }}>
            <Text style={[globalStyles.normalText, { color : 'white', textAlign: 'center', opacity: 0.8 }]}>Forgot PIN?</Text>
            <Text style={[globalStyles.normalText, { color : 'white', textAlign: 'center' }]}>
              Please <Text
              style={{ textDecorationLine: 'underline' }}
              onPress={() => Linking.openURL("mailto:app@celsius.network")}>contact Celsius support</Text>
            </Text>
          </View>}
        </View>
      </SimpleLayout>
    )
  }
}

VerifyIdentity.defaultProps = {
  verificationAction: async () => null,
  backButton: true,
  label: 'continue',
  title: 'Verification Required',
};

export default VerifyIdentity;
