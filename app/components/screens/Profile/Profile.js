import React, { Component } from "react";
import { Constants } from "expo";
import { TouchableOpacity, Text, Linking, StyleSheet } from "react-native";
import { View } from "native-base";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import _ from "lodash";

import testUtil from "../../../utils/test-util";
import API from "../../../config/constants/API";
import apiUtil from "../../../utils/api-util";
import * as appActions from "../../../redux/actions";
import CelButton from "../../atoms/CelButton/CelButton";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import { MainHeader } from "../../molecules/MainHeader/MainHeader";
import ImageHeading from "../../atoms/ImageHeading/ImageHeading";
import CelInput from "../../atoms/CelInput/CelInput";
import CelPhoneInput from "../../molecules/CelPhoneInput/CelPhoneInput";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles, STYLES, COLORS, FONT_SCALE } from "../../../config/constants/style";
import CelForm from "../../atoms/CelForm/CelForm";
import Icon from "../../atoms/Icon/Icon";
import ReferralModal from "../../organisms/ReferralModal/ReferralModal";
import CelScreenContent from "../../atoms/CelScreenContent/CelScreenContent";
import CelSelect from "../../molecules/CelSelect/CelSelect";
import ProfileStyle from "../Profile/Profile.styles";
import Separator from "../../atoms/Separator/Separator";
import { MODALS } from "../../../config/constants/common";
import { isBlacklistedCountry, isBlacklistedState } from "../../../utils/user-util";
import EnterPromoCodeModal from "../../organisms/EnterPromoCodeModal/EnterPromoCodeModal";
import InfoBubble from "../../atoms/InfoBubble/InfoBubble";



const { revisionId } = Constants.manifest;

// eslint-disable-next-line
const getError = (errors, field, def = null) => {
  return _.get(errors, [field, "msg"], def);
};

const ProfileDetailsStyle = StyleSheet.create({
  appVersionText: {
    textAlign: "center",
    color: COLORS.gray
  }
});

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    error: state.users.error,
    formErrors: state.ui.formErrors,
    callsInProgress: state.api.callsInProgress,
    history: state.api.history,
    lastCompletedCall: state.api.lastCompletedCall,
    formData: state.ui.formData,
    activeScreen: state.nav.routes[state.nav.index].routeName,
    appSettings: state.users.appSettings
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressEditable: false,
      taxpayerEditable: false,
      isBlackout: true,
      validSsn: false,
    };
  }

  componentDidMount = () => {
    this.initForm();
    this.props.actions.getProfileInfo();
  };

  validateAddressInformationForm = () => {
    const { formData, actions } = this.props;
    const formErrors = {};

    if (!formData.street) formErrors.street = "Street is required!";
    if (!formData.city) formErrors.city = "City is required!";
    if (!formData.zip) formErrors.zip = "Zip / Postal code is required!";
    if (!formData.country) formErrors.country = "Country is required!";
    if (formData.country === "United States" && !formData.state) formErrors.state = "State is required!";

    if (!_.isEmpty(formErrors)) {
      actions.setFormErrors(formErrors);
    } else {
      return true;
    }
  };


  validateTaxpayerForm = () => {
    const { formData, actions } = this.props;
    const formErrors = {};

    // if ((formData.country === "United States" || formData.citizenship === "United States" ) && !formData.ssn) formErrors.ssn = 'ssn is required!';

    if ((formData.country === "United States" || formData.citizenship === "United States") && formData.ssn) {
      const regex = /^(?!(000|666|9))\d{3}-(?!00)\d{2}-(?!0000)\d{4}$|^(?!(000|666|9))\d{3}(?!00)\d{2}(?!0000)\d{4}$/;
      if (!regex.exec(formData.ssn)) formErrors.ssn = "ssn is not valid!";
    }

    if (!_.isEmpty(formErrors)) {
      actions.setFormErrors(formErrors);
    } else {
      return true;
    }
  };

  submitAddressInformationForm = () => {
    const { formData, actions } = this.props;
    const isFormValid = this.validateAddressInformationForm();

    let updatedUser;
    if (isFormValid === true) {
      updatedUser = {
        street: formData.street,
        building_number: formData.buildingNumber,
        flat_number: formData.flatNumber,
        city: formData.city,
        zip: formData.zip,
        country: formData.country,
        state: formData.state
      };
      actions.updateProfileAddressInfo(updatedUser);

      if (formData.country !== "United States" && formData.citizenship !== "United States") {
        actions.updateUserAppSettings({ declineAccess: false });
      }

      this.setState({ addressEditable: false });
    }
  };

  submitTaxpayerForm = () => {
    const { formData, actions } = this.props;
    const isFormValid = this.validateTaxpayerForm();

    if (isFormValid === true) {
      const updatedUser = {
        ssn: formData.ssn,
        itin: formData.itin,
        national_id: formData.national_id
      };
      actions.updateProfileTaxpayerInfo(updatedUser);

      if (!!isBlacklistedState(formData.state) || !!isBlacklistedCountry(formData.country)) {
        actions.navigateTo("Home");
      } else {
        actions.updateUserAppSettings({ declineAccess: false });
      }
      this.setState({
        taxpayerEditable: false,
        validSsn: true
      });
    }
  };

  initForm = () => {
    const { actions, user, formData } = this.props;
    const date = user && user.date_of_birth ? user.date_of_birth.split("-") : ["", "", ""];

    // TODO(ns): uncomment when Blackout is activated

    // const currentTimestamp = moment.utc(Date.now());
    // let NycBlackoutTimestamp;
    // let days;
    // if (user && user.blocked_at) {
    //   NycBlackoutTimestamp = moment.utc(new Date(user.blocked_at));
    //   days = NycBlackoutTimestamp.diff(currentTimestamp, "days") + 1;
    // }



    if (user) {
      const data = {
        ...formData,
        title: user.title,
        firstName: user.first_name,
        middleName: user.middle_name,
        lastName: user.last_name,
        dateOfBirth: user.date_of_birth,
        citizenship: user.citizenship,
        gender: user.gender,
        companyName: user.company_name,
        month: date[1],
        day: date[2],
        year: date[0],
        email: user.email,
        cellphone: user.cellphone,
        street: user.street,
        buildingNumber: user.building_number,
        flatNumber: user.flat_number,
        city: user.city,
        state: user.state,
        zip: user.zip,
        country: user.country ? user.country : user.citizenship,
        ssn: user.ssn,
        itin: user.itin,
        national_id: user.national_id
      };
      actions.initForm(data);

      if (user.ssn) {
        this.setState({
          validSsn: true
        })
      }
      // TODO(ns): uncomment when Blackout is activated, check if code below needed

      if ((data.country === "United States" || data.citizenship === "United States") && !data.ssn) {
        this.setState({ taxpayerEditable: true });
      }

      // if (!data.street && !data.city && !data.zip && user.kyc.status === "passed") {
      //   this.setState({ addressEditable: true });
      // if( days && days < 1) {
      //   this.setState({ isBlackout: false });
      // }
      // }
    }
  };

  render() {
    const { user, formData, actions, callsInProgress, error, formErrors, appSettings } = this.props;
    const { addressEditable, taxpayerEditable, isBlackout, validSsn } = this.state;
    const isLoadingProfileInfo = apiUtil.areCallsInProgress([API.GET_USER_PERSONAL_INFO], callsInProgress);
    const isUpdatingAddressInfo = apiUtil.areCallsInProgress([API.UPDATE_USER_ADDRESS_INFO], callsInProgress);
    const isUpdatingTaxpayerInfo = apiUtil.areCallsInProgress([API.UPDATE_USER_TAXPAYER_INFO], callsInProgress);


    return (
      <BasicLayout bottomNavigation>
        <MainHeader
          right={(
            <TouchableOpacity
              ref={testUtil.generateTestHook(this, "ProfileScreen.LogOut")}
              onPress={actions.logoutUser}>
              <Text
                style={[{
                  color: "white",
                  paddingLeft: 5,
                  textAlign: "right",
                  opacity: 0.8,
                  marginTop: 2,
                  fontSize: FONT_SCALE * 18,
                  fontFamily: "agile-medium"
                }]}>Log out</Text>
            </TouchableOpacity>
          )}
        />
        <ImageHeading image={user.profile_picture}/>

        <CelScreenContent>
          <CelButton
            ref={testUtil.generateTestHook(this, `ProfileScreen.changeAvatar`)}
            onPress={() => actions.navigateTo("ProfileImage")}
            transparent
            color="blue"
            size="small"
            margin="0 0 10 0"
            inverse
            disabled={appSettings.declineAccess}
          >
            Change avatar
          </CelButton>

          <View style={{ marginBottom: 30 }}>
            <CelButton
              onPress={() => actions.navigateTo("ProfileSettings")}
              color="blue"
              disabled={appSettings.declineAccess}
            >
              Settings
            </CelButton>
            <CelButton
              onPress={() => actions.openModal(MODALS.REFERRAL_MODAL)}
              color="blue"
              margin="10 0 10 0"
              inverse
              disabled={appSettings.declineAccess}
            >
              Refer your friends
            </CelButton>
            <CelButton
              onPress={() => actions.openModal(MODALS.ENTER_PROMO_CODE)}
              transparent
              color="blue"
              size="small"
              margin="10 0 10 0"
              inverse
            >
              Enter promo code
            </CelButton>
          </View>

          <Separator separatorSize={1.2} margin='5 0 20 0' separatorColor={STYLES.GRAY_2} color={STYLES.GRAY_2}>PROFILE
            DETAILS</Separator>

          <CelForm disabled={isLoadingProfileInfo}>
            <CelSelect disabled theme="white" error={formErrors.title} field="title" type="title" labelText="Title"
                       value={formData.title}/>
            <CelInput editable={false} theme="white" value={formData.firstName} error={formErrors.first_name}
                      field="firstName" labelText="First Name" autoCapitalize="sentences"/>
            <CelInput editable={false} theme="white" value={formData.middleName} error={formErrors.middle_name}
                      field="middleName" labelText="Middle Name (optional)" autoCapitalize="sentences"/>
            <CelInput editable={false} theme="white" value={formData.lastName} error={formErrors.last_name}
                      field="lastName" labelText="Last Name" autoCapitalize="sentences"/>
            <CelInput editable={false} theme="white" labelText="E-mail" value={formData.email}
                      keyboardType='email-address' field="email"/>
            <CelPhoneInput editable={false} theme="white" labelText={getError(error, "cellphone", "Phone number")}
                           field="cellphone" value={formData.cellphone}/>

            <Text style={[globalStyles.normalText, ProfileStyle.dateOfBirthText]}>
              Date of birth
            </Text>

            <View style={ProfileStyle.dateOfBirthContainer}>
              <View style={ProfileStyle.dateOfBirthInnerContainer}>
                <CelSelect disabled theme="white" onlyError error={formErrors.month} field="month" type="month"
                           labelText="Month" value={formData.month} flex={1.4} margin={"0 15 2 0"}/>
                <CelSelect disabled theme="white" onlyError error={formErrors.day} field="day" type="day"
                           labelText="Day" value={formData.day} flex={1.1} margin={"0 15 2 0"}/>
                <CelSelect disabled theme="white" onlyError error={formErrors.year} field="year" type="year"
                           labelText="Year" value={formData.year} flex={1} margin={"0 0 2 0"}/>
              </View>
              {formErrors.dateOfBirth ? <Text style={globalStyles.errorText}>* {formErrors.dateOfBirth}</Text> : null}
            </View>

            <CelSelect disabled theme="white" error={formErrors.citizenship} field="citizenship" type="country"
                       labelText="Citizenship" value={formData.citizenship}/>
            <CelSelect disabled theme="white" error={formErrors.gender} field="gender" type="gender" labelText="Gender"
                       value={formData.gender}/>
            <CelInput editable={false} theme="white" value={formData.companyName} error={formErrors.company_name}
                      field="companyName" labelText="Company Name (optional)" autoCapitalize="sentences"/>

            <Separator separatorSize={0.6} margin='5 0 15 0' separatorColor={STYLES.GRAY_2}
                       color={STYLES.GRAY_2}>ADDRESS</Separator>

            {addressEditable &&
            <Text style={[globalStyles.normalText, ProfileStyle.dateOfBirthText, { marginBottom: 20 }]}>
              Due to Anti-Money Laundering laws and regulations, we must collect the information below.
            </Text>
            }

            <CelSelect disabled={!addressEditable || !isBlackout} theme="white" error={formErrors.country}
                       field="country" type="country" labelText="Country" value={formData.country}/>
            {formData.country === "United States" ?
              <CelSelect disabled={!addressEditable} theme="white" error={formErrors.state} field="state" type="state"
                         labelText="State" value={formData.state}/>
              :
              null
            }
            <CelInput editable={addressEditable && isBlackout} theme="white" value={formData.city}
                      error={formErrors.city} field="city" labelText="City" autoCapitalize="sentences"/>
            <CelInput editable={addressEditable && isBlackout} theme="white" value={formData.zip} error={formErrors.zip}
                      field="zip" labelText="ZIP / Postal Code" autoCapitalize="sentences"/>
            <CelInput editable={addressEditable && isBlackout} theme="white" value={formData.street}
                      error={formErrors.street} field="street" labelText="Street" autoCapitalize="sentences"/>
            <CelInput editable={addressEditable && isBlackout} theme="white" value={formData.buildingNumber}
                      error={formErrors.building_number} field="buildingNumber" labelText="Building number"
                      autoCapitalize="sentences"/>
            <CelInput editable={addressEditable && isBlackout} theme="white" value={formData.flatNumber}
                      error={formErrors.flat_number} field="flatNumber" labelText="Apartment number"
                      autoCapitalize="sentences"/>

            {addressEditable &&
            <View style={{ marginTop: 15, marginBottom: 30 }}>
              <CelButton
                onPress={this.submitAddressInformationForm}
                color="blue"
                loading={isUpdatingAddressInfo}
                disabled={isUpdatingAddressInfo || !isBlackout}
              >Submit address</CelButton>
            </View>
            }

            {!!validSsn &&
              <React.Fragment>
                <Separator margin='5 0 20 0' separatorSize={0.9} separatorColor={STYLES.GRAY_2} color={STYLES.GRAY_2}>TAXPAYER ID</Separator>
                <CelInput editable={false} theme="white" value={user.ssn} field="ssn" labelText="SSN (optional)" autoCapitalize="sentences"/>
              </React.Fragment>
            }

            {(!((formData.country === "United States" || formData.citizenship === "United States") && !taxpayerEditable) && !addressEditable) &&

            // ToDo(ns): remove country and citizenship and probably addressEditable

            <React.Fragment>
              <Separator margin='5 0 20 0' separatorSize={0.9} separatorColor={STYLES.GRAY_2} color={STYLES.GRAY_2}>TAXPAYER
                ID</Separator>
              {(formData.country === "United States" || formData.citizenship === "United States") ?
                <React.Fragment>
                  <Text style={[globalStyles.normalText, { color: "black", textAlign: "auto",  fontSize: FONT_SCALE * 20, marginBottom: 20 }]}>Federal anti-money laundering (AML) regulations require us to collect this information.</Text>
                  <CelInput editable={taxpayerEditable} theme="white" value={formData.ssn} error={formErrors.ssn}
                            field="ssn" labelText="SSN (optional)" autoCapitalize="sentences"/>
                  <InfoBubble
                    color='#3D4853'
                    renderContent={() => (
                      <View>
                        <Text style={[globalStyles.normalText, { color: "white" }]}>
                          SSN and residency are needed to issue 1099 for the interest paid. Private information is
                          encrypted
                          and highly secured.
                        </Text>
                      </View>
                    )}
                  />
                </React.Fragment>
                :
                <React.Fragment>
                  <CelInput editable={taxpayerEditable} theme="white" value={formData.itin} error={formErrors.itin}
                            field="itin" labelText="Taxpayer ID - ITIN (optional)" autoCapitalize="sentences"/>
                  <CelInput editable={taxpayerEditable} theme="white" value={formData.national_id}
                            error={formErrors.national_id} field="national_id" labelText="National ID Number"
                            autoCapitalize="sentences"/>
                </React.Fragment>
              }
              {taxpayerEditable &&
              <View style={{ marginTop: 15, marginBottom: 30 }}>
                <CelButton
                  onPress={this.submitTaxpayerForm}
                  color="blue"
                  loading={isUpdatingTaxpayerInfo}
                  disabled={isUpdatingTaxpayerInfo || !isBlackout}
                >Submit Taxpayer id</CelButton>
              </View>
              }
            </React.Fragment>
            }
          </CelForm>

          <View style={{ marginBottom: 10, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
            <Icon name='TelegramIcon' height='25' width='25' viewBox="0 -4 32 32" fill={"rgba(65, 86, 166, 0.6)"}/>
            <CelButton
              onPress={() => Linking.openURL("https://t.me/CelsiusNetwork")}
              transparent
              color="blue"
              size="medium"
              inverse
            >
              Join our Telegram
            </CelButton>
          </View>

          <View>
            <CelButton
              onPress={() => actions.navigateTo("TermsOfUse")}
              transparent
              color="blue"
              size="small"
              margin="0 0 0 0"
              inverse
            >
              See Terms of Use
            </CelButton>
          </View>
          {!!revisionId && <View style={{ marginTop: 10 }}>
            <Text style={ProfileDetailsStyle.appVersionText}>App Version - {revisionId}</Text>
          </View>}
        </CelScreenContent>
        <ReferralModal/>
        <EnterPromoCodeModal/>
      </BasicLayout>
    );
  }
}

export default testUtil.hookComponent(ProfileScreen);
