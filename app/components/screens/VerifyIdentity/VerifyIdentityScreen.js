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

@connect(
  state => ({
    user: state.users.user,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class VerifyIdentity extends Component {
  constructor(props) {
    super();

    const {navigation, user, verificationAction, verificationCallback} = props;

    const actionLabel = navigation.getParam("actionLabel");
    const showHelp = navigation.getParam("showHelp");
    const navVerificationAction = navigation.getParam("verificationAction");
    const navVerificationCallback = navigation.getParam("verificationCallback");

    const verificationType = navigation.getParam("verificationType") || this.getUserPrefferredVerificationType(user);

    this.state = {
      inProgress: false,
      value: '',
      pinLength: verificationType === VERIFY_IDENTITY_TYPES.PIN ? 4 : 6,
      actionLabel: actionLabel || 'continue',
      showHelp,
      verificationAction: navVerificationAction || verificationAction,
      verificationCallback: navVerificationCallback || verificationCallback,
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
    const {verificationAction, verificationCallback, value} = this.state;
    const {actions} = this.props;

    this.setState({inProgress: true,});

    try {
      if (verificationCallback) {
        await meService.checkPin({
          pin: value,
        });

        verificationCallback();
      } else {
        await verificationAction(value);
      }
    } catch (error) {
      actions.showMessage('error', error.error);
    }

    this.setState({inProgress: false,});
  };

  render() {
    const {value, pinLength, showHelp, actionLabel, inProgress} = this.state;

    const disabled = !value || value.length !== pinLength || inProgress;

    return (
      <SimpleLayout
        background={STYLES.PRIMARY_BLUE}>
        <View>
          <Text>Please type your code from your authentication application to {actionLabel}</Text>
          <CelInput type="pin"
                    value={value}
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
};

export default VerifyIdentity;
