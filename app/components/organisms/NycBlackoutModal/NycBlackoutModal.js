import React, { Component } from "react";
import { Image, Linking, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import _ from "lodash";

import * as appActions from "../../../redux/actions";
import NycBlackoutModalStyle from "./NycBlackoutModal.styles";
import CelModal from "../../atoms/CelModal/CelModal";
import { MODALS } from "../../../config/constants/common";
import CelButton from "../../atoms/CelButton/CelButton";
import CelInput from "../../atoms/CelInput/CelInput";
import CelSelect from "../../molecules/CelSelect/CelSelect";
import apiUtil from "../../../utils/api-util";
import API from "../../../config/constants/API";

@connect(
  state => ({
    user: state.users.user,
    formData: state.ui.formData,
    openedModal: state.ui.openedModal,
    appSettings: state.users.appSettings,
    formErrors: state.ui.formErrors,
    callsInProgress: state.api.callsInProgress
  }),
  dispatch => ({ dispatch, actions: bindActionCreators(appActions, dispatch) })
)
class NycBlackoutModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
      initial: true,
      address: false,
      taxNo: false,
      finish: false
    };
    // binders
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

    if ((formData.country === "United States" || formData.citizenship === "United States") && !formData.ssn) formErrors.ssn = "ssn is required!";

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

      if (formData.state === "New York") {
        actions.updateUserAppSettings({ declineAccess: true });
      }

      this.setState({
        address: false,
        taxNo: true
      });
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
      if (formData.state === "New York") {
        actions.updateUserAppSettings({ declineAccess: true });
      } else {
        actions.updateUserAppSettings({ declineAccess: false });
      }
      this.setState({
        taxNo: false,
        finish: true
      });
    }
  };

  initForm = () => {
    const { actions, user, formData } = this.props;
    const date = user.date_of_birth ? user.date_of_birth.split("-") : ["", "", ""];

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
    }
  };

  closeForm = () => {
    const { actions, user } = this.props;
    const currentTimestamp = moment.utc(Date.now());
    let NycBlackoutTimestamp;
    let days;
    if (user && user.blocked_at) {
      NycBlackoutTimestamp = moment.utc(new Date(user.blocked_at));
      days = NycBlackoutTimestamp.diff(currentTimestamp, "days") + 1;
    }

    if (user.state === "New York" && days && days < 1) {
      Linking.openURL("mailto:app@celsius.network");
    } else {
      actions.closeModal();
    }
  };

  goToAddressInformationForm = () => {
    const {user, actions} = this.props;
    if (user.state === "New York") {
      actions.closeModal();
    } else {
      this.setState({
        initial: false,
        address: true
      });
    }
  };

  render() {
    const { user, openedModal, formData, formErrors, callsInProgress } = this.props;
    const { initial, address, taxNo, finish } = this.state;
    const isUpdatingAddressInfo = apiUtil.areCallsInProgress([API.UPDATE_USER_ADDRESS_INFO], callsInProgress);
    const isUpdatingTaxpayerInfo = apiUtil.areCallsInProgress([API.UPDATE_USER_TAXPAYER_INFO], callsInProgress);

    const currentTimestamp = moment.utc(Date.now());
    let NycBlackoutTimestamp;
    let days;
    if (user && user.blocked_at) {
      NycBlackoutTimestamp = moment.utc(new Date(user.blocked_at));
      days = NycBlackoutTimestamp.diff(currentTimestamp, "days") + 1;
    }
    let heading;
    let additionalText;

    if (!user) {
      return null;
    }

    if (!openedModal || openedModal !== MODALS.NYC_BLACKOUT) {
      return null;
    }

    if (user.state === "New York" && days && days < 1) {
      heading = "We apologize for any inconvenience, but due to local laws and regulations, we are unable to work with New York state residents at this time.";
      additionalText = "Please contact app@celsius.network.";
    } else if (user.state === "New York") {
      heading = "We apologize for any inconvenience, but due to local laws and regulations, we are unable to work with New York state residents at this time.";
      additionalText = `Please withdraw your funds within ${days} day(s) or contact app@celsius.network for support.`;
    } else {
      heading = "Hey! We're missing some important info from you!";
      additionalText = "Please complete your profile.";
    }


    return (
      <CelModal
        name={MODALS.NYC_BLACKOUT}
        shouldRenderCloseButton={false}
      >
        {initial &&
        <View>
          <View style={NycBlackoutModalStyle.modalWrapper}>
            <Image style={NycBlackoutModalStyle.image}
                   source={require("../../../../assets/images/diane-with-laptop3x.png")}/>
            <Text style={[NycBlackoutModalStyle.heading]}>{heading}</Text>
            <Text style={NycBlackoutModalStyle.explanation}>{additionalText}</Text>
          </View>
          <CelButton
            onPress={() => this.goToAddressInformationForm()}
          >
            Continue
          </CelButton>
        </View>
        }

        {address &&
        <View>
          <Text style={[NycBlackoutModalStyle.heading, { marginBottom: 20 }]}>Residential Address</Text>
          <CelInput editable shadow theme="white" value={formData.street} error={formErrors.street} field="street"
                    labelText="Street" autoCapitalize="sentences"/>
          <CelInput editable shadow theme="white" value={formData.buildingNumber} error={formErrors.building_number}
                    field="buildingNumber" labelText="Building number" autoCapitalize="sentences"/>
          <CelInput editable shadow theme="white" value={formData.flatNumber} error={formErrors.flat_number}
                    field="flatNumber" labelText="Apartment number" autoCapitalize="sentences"/>
          <CelInput editable shadow theme="white" value={formData.city} error={formErrors.city} field="city"
                    labelText="City" autoCapitalize="sentences"/>
          <CelInput editable shadow theme="white" value={formData.zip} error={formErrors.zip} field="zip"
                    labelText="ZIP / Postal Code" autoCapitalize="sentences"/>
          <CelSelect shadow theme="white" error={formErrors.country} field="country" type="country" labelText="Country"
                     value={formData.country}/>
          {formData.country === "United States" ?
            <CelSelect shadow theme="white" error={formErrors.state} field="state" type="state" labelText="State"
                       value={formData.state}/>
            :
            null
          }

          <View style={{ marginTop: 15, marginBottom: 30 }}>
            <CelButton
              onPress={() => this.submitAddressInformationForm()}
              color="blue"
              loading={isUpdatingAddressInfo}
            >Taxpayer ID</CelButton>
          </View>

        </View>
        }

        {taxNo &&
        <View>
          {(formData.country === "United States" || formData.citizenship === "United States") ?
            <View>
              <Text style={[NycBlackoutModalStyle.heading, { marginTop: 20, marginBottom: 20 }]}>Social Security Number</Text>
              <CelInput secureTextEntry editable shadow theme="white" value={formData.ssn} error={formErrors.ssn} field="ssn"
                        labelText="Social Security Number (SSN)" autoCapitalize="sentences" type={"password"}/>
            </View>
            :
            <React.Fragment>
              <Text style={[NycBlackoutModalStyle.heading, { marginBottom: 20 }]}>Taxpayer ID</Text>
              <CelInput secureTextEntry editable shadow theme="white" value={formData.itin} error={formErrors.itin} field="itin"
                        labelText="Taxpayer ID - ITIN (optional)" autoCapitalize="sentences" type={"password"}/>
              <CelInput secureTextEntry editable shadow theme="white" value={formData.national_id} error={formErrors.national_id}
                        field="national_id" labelText="National ID Number" autoCapitalize="sentences" type={"password"}/>
            </React.Fragment>
          }
          <View style={{ marginTop: 15, marginBottom: 30 }}>
            <CelButton
              onPress={() => this.submitTaxpayerForm()}
              color="blue"
              loading={isUpdatingTaxpayerInfo}
            >Finish</CelButton>
          </View>
        </View>
        }

        {finish &&
        <View>
          <View style={NycBlackoutModalStyle.modalWrapper}>
            <Image style={NycBlackoutModalStyle.image}
                   source={require("../../../../assets/images/squirrel-modal3x.png")}/>
            <Text style={[NycBlackoutModalStyle.heading]}>Congrats!</Text>
            <Text style={NycBlackoutModalStyle.explanation}>You have successfully updated your profile</Text>
          </View>
          <CelButton
            onPress={() => this.closeForm()}
          >
            Done
          </CelButton>
        </View>
        }

      </CelModal>
    );
  }
}

export default NycBlackoutModal;
