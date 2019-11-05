import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View } from "react-native";

import * as appActions from "../../../redux/actions";
// import RegisterStyle from "./Register.styles";
import CelText from "../../atoms/CelText/CelText";
import CelInput from "../../atoms/CelInput/CelInput";
import CelButton from "../../atoms/CelButton/CelButton";
import ProgressBar from "../../atoms/ProgressBar/ProgressBar";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import SocialLogin from "../../organisms/SocialLogin/SocialLogin";
import Separator from "../../atoms/Separator/Separator";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import STYLES from "../../../constants/STYLES";
import { KEYBOARD_TYPE, MODALS } from "../../../constants/UI";
import RegisterPromoCodeModal from "../../organisms/RegisterPromoCodeModal/RegisterPromoCodeModal";
import Icon from "../../atoms/Icon/Icon";
import Card from "../../atoms/Card/Card";
import RegisterInitialStyle from "./RegisterInitial.styles";

@connect(
  state => ({
    formData: state.forms.formData,
    formErrors: state.forms.formErrors,
    callsInProgress: state.api.callsInProgress,
    promoCode: state.branch.registeredLink,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class RegisterInitial extends Component {
  static navigationOptions = () => ({
    right: "login",
    customCenterComponent: <ProgressBar steps={3} currentStep={1} />,
  });

  constructor() {
    super();

    this.state = {
      isExpanded: false,
    };
  }

  componentDidMount() {
    const { promoCode } = this.props;

    if (promoCode) {
      this.setState({ isExpanded: true });
    }
  }

  isFormValid = () => {
    const { actions, formData } = this.props;

    const errors = {};
    const isUsingSocial =
      formData.googleId || formData.facebookId || formData.twitterId;
    let errorFocus = false;

    if (!formData.firstName) {
      errors.firstName = "First name is required!";
      if (!errorFocus) this.firstNameInput.focus();
      errorFocus = true;
    }
    if (!formData.lastName) {
      errors.lastName = "Last name is required!";
      if (!errorFocus) this.last.focus();
      errorFocus = true;
    }
    if (!formData.email) {
      errors.email = "Email is required!";
      if (!errorFocus) this.email.focus();
      errorFocus = true;
    }
    if (!isUsingSocial && !formData.password) {
      errors.password = "Password is required!";
      if (!errorFocus) this.pass.focus();
      errorFocus = true;
    }

    if (Object.keys(errors).length) {
      actions.setFormErrors(errors);
      return false;
    }

    return true;
  };

  submitForm = () => {
    const { actions } = this.props;
    const isFormValid = this.isFormValid();

    if (isFormValid) {
      actions.createAccount();
    }
  };

  renderPromoCodeBody = () => {
    const { promoCode, actions } = this.props;
    const style = RegisterInitialStyle();

    if (promoCode) {
      return (
        <View style={style.referralBody}>
          <View style={style.indentation} />
          <View style={style.referralCopy}>
            <CelText type={"H5"} weight={"500"} color={STYLES.COLORS.WHITE}>
              In order to receive your referral reward, you must:
            </CelText>
            <CelText
              margin={"10 0 0 0"}
              type={"H6"}
              weight={"300"}
              color={STYLES.COLORS.WHITE}
            >
              1. Complete KYC (Identity Verification)
            </CelText>
            <CelText
              margin={"10 0 0 0"}
              type={"H6"}
              weight={"300"}
              color={STYLES.COLORS.WHITE}
            >
              2. Receive confirmation of account verification
            </CelText>
            <CelText
              margin={"10 0 0 0"}
              type={"H6"}
              weight={"300"}
              color={STYLES.COLORS.WHITE}
            >
              3. Deposit $200 or more worth of coins to your Celsius wallet
            </CelText>
          </View>
        </View>
      );
    }
    return (
      <View style={style.referralBody}>
        <View style={style.indentation} />
        <View style={style.referralCopy}>
          <CelText
            margin={"10 0 0 0"}
            type={"H6"}
            weight={"300"}
            color={STYLES.COLORS.WHITE}
          >
            Enter your referral code then follow the steps below to receive your
            reward.
          </CelText>
          <CelText
            margin={"10 0 0 0"}
            type={"H6"}
            weight={"400"}
            color={STYLES.COLORS.WHITE}
          >
            NOTE: You will NOT be able to enter a referral code after account
            verification.
          </CelText>
          <CelText
            margin={"10 0 0 0"}
            type={"H6"}
            weight={"300"}
            color={STYLES.COLORS.WHITE}
          >
            1. Complete KYC (Identity Verification)
          </CelText>
          <CelText
            margin={"10 0 0 0"}
            type={"H6"}
            weight={"300"}
            color={STYLES.COLORS.WHITE}
          >
            2. Receive confirmation of account verification
          </CelText>
          <CelText
            margin={"10 0 0 0"}
            type={"H6"}
            weight={"300"}
            color={STYLES.COLORS.WHITE}
          >
            3. Deposit $200 or more worth of coins to your Celsius wallet
          </CelText>
          <View style={{ alignItems: "flex-start" }}>
            <CelButton
              onPress={() =>
                actions.openModal(MODALS.REGISTER_PROMO_CODE_MODAL)
              }
              color={"white"}
              textColor={STYLES.COLORS.CELSIUS_BLUE}
              size={"small"}
              margin={"20 0 15 0"}
              style={{ justifyContent: "flex-start" }}
            >
              Enter Referral Code
            </CelButton>
          </View>
        </View>
      </View>
    );
  };

  renderReferralCard = () => {
    const { promoCode } = this.props;
    const { isExpanded } = this.state;
    const style = RegisterInitialStyle();
    return (
      <Card
        color={promoCode ? STYLES.COLORS.GREEN : STYLES.COLORS.CELSIUS_BLUE}
        onPress={() => {
          this.setState({ isExpanded: !isExpanded });
        }}
      >
        <View style={style.referralHeading}>
          <View style={style.iconWrapper}>
            <View style={style.iconStyle}>
              <Icon
                name={promoCode ? "Checked" : "Present"}
                width="20"
                height="20"
                fill={
                  promoCode ? STYLES.COLORS.GREEN : STYLES.COLORS.CELSIUS_BLUE
                }
              />
            </View>
          </View>
          <View style={style.titleWrapper}>
            <CelText
              type={"H5"}
              weight={"500"}
              color={STYLES.COLORS.WHITE}
              style={{ marginTop: 10 }}
            >
              {promoCode ? "Referral Code Activated" : "Have a referral code?"}
            </CelText>
            {!promoCode && (
              <View style={style.caretStyle}>
                <Icon
                  name={isExpanded ? "UpArrow" : "DownArrow"}
                  width="15"
                  height="15"
                  fill={STYLES.COLORS.WHITE}
                />
              </View>
            )}
          </View>
        </View>
        {isExpanded && <View>{this.renderPromoCodeBody()}</View>}
      </Card>
    );
  };

  render() {
    const { formData, actions, callsInProgress, formErrors } = this.props;

    const isUsingSocial =
      formData.googleId || formData.facebookId || formData.twitterId;

    const registerLoading = apiUtil.areCallsInProgress(
      [
        API.REGISTER_USER,
        API.REGISTER_USER_FACEBOOK,
        API.REGISTER_USER_GOOGLE,
        API.REGISTER_USER_TWITTER,
        API.SOCIAL_REGISTER,
      ],
      callsInProgress
    );

    // TODO(ns): check ref if !isUsingSocial for pass input

    return (
      <AuthLayout>
        <CelText margin="0 0 30 0" align="center" type="H1">
          Join Celsius
        </CelText>
        <SocialLogin type="register" actions={actions} />

        <Separator allCaps text="Create your account" margin="20 0 20 0" />

        <CelInput
          disabled={registerLoading}
          autoCapitalize="words"
          type="text"
          field="firstName"
          value={formData.firstName}
          error={formErrors.firstName}
          placeholder="First name"
          returnKeyType={"next"}
          blurOnSubmiting={false}
          onSubmitEditing={() => {
            this.last.focus();
          }}
          refs={input => {
            this.firstNameInput = input;
          }}
        />
        <CelInput
          disabled={registerLoading}
          autoCapitalize="words"
          type="text"
          field="lastName"
          value={formData.lastName}
          error={formErrors.lastName}
          placeholder="Last name"
          returnKeyType={"next"}
          blurOnSubmiting={false}
          onSubmitEditing={() => {
            this.email.focus();
          }}
          refs={input => {
            this.last = input;
          }}
        />

        <CelInput
          disabled={!!isUsingSocial || registerLoading}
          type="text"
          value={formData.email}
          error={formErrors.email}
          field="email"
          placeholder="E-mail"
          keyboardType={KEYBOARD_TYPE.EMAIL}
          returnKeyType={!isUsingSocial ? "next" : "done"}
          blurOnSubmiting={false}
          onSubmitEditing={() => {
            if (!isUsingSocial) this.pass.focus();
          }}
          refs={input => {
            this.email = input;
          }}
        />

        {!isUsingSocial && (
          <CelInput
            disabled={registerLoading}
            type="password"
            field="password"
            placeholder="Password"
            value={formData.password}
            error={formErrors.password}
            refs={input => {
              this.pass = input;
            }}
          />
        )}

        {this.renderReferralCard()}

        <CelButton
          margin="10 0 10 0"
          onPress={this.submitForm}
          iconRight="IconArrowRight"
          loading={registerLoading}
        >
          Create account
        </CelButton>

        <View>
          <CelText
            color="rgba(61,72,83,0.5)"
            type="H4"
            margin="30 20 0 20"
            align="center"
          >
            By creating an account you agree to our
            <CelText
              type="H4"
              color={STYLES.COLORS.CELSIUS_BLUE}
              onPress={() => actions.navigateTo("TermsOfUse")}
            >
              {" "}
              Terms of Use
            </CelText>
          </CelText>
        </View>

        <RegisterPromoCodeModal type={"register"} />
      </AuthLayout>
    );
  }
}

export default RegisterInitial;
