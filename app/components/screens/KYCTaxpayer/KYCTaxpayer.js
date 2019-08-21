import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
// import { View } from 'react-native';
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import ProgressBar from "../../atoms/ProgressBar/ProgressBar";
import CelButton from "../../atoms/CelButton/CelButton";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import { MODALS } from "../../../constants/UI";
import SsnModal from "../../organisms/SsnModal/SsnModal";
import SocialSecurityNumber from "../../molecules/SocialSecurityNumber/SocialSecurityNumber";

@connect(
  state => ({
    user: state.user.profile,
    formData: state.forms.formData,
    formErrors: state.forms.formErrors
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class KYCTaxpayer extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Taxpayer ID",
    customCenterComponent: <ProgressBar steps={4} currentStep={3} />,
    headerSameColor: true
  });

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      updatingTaxInfo: false
    };
  }

  componentDidMount() {
    const { actions, user } = this.props;
    actions.profileTaxpayerInfo();
    this.setState({ isLoading: false });
    this.initForm(user);
  }

  initForm = (user) => {
    const { actions } = this.props;
    if (user) {
      if (this.isFromUS()) {
        actions.updateFormFields({ ssn: user.ssn });
      } else {
        actions.updateFormFields({
          itin: user.itin,
          national_id: user.national_id
        });
      }
    }
  };

  isFromUS = () => {
    const { formData, user } = this.props;

    let usCitizen = false;
    if (formData.citizenship.name === "United States" || formData.country.name === "United States") usCitizen = true;
    if (user.citizenship === 'United States' || user.country === 'United States') usCitizen = true
    return usCitizen;
  };

  submitTaxpayerInfo = async () => {
    const { actions, formData } = this.props;
    let updateTaxInfo;
    const errors = {};
    if (this.isFromUS()) {
      // TODO(ns): this if statement does nothing and is unnecessary, should be removed
      if ((!formData.ssn1 || formData.ssn1.length < 3) || (!formData.ssn2 || formData.ssn2.length < 2) || (!formData.ssn3 || formData.ssn3.length < 4)) {
        errors.ssn = "Please enter valid SSN."
        actions.setFormErrors(errors);
        return
      }

      updateTaxInfo = {
        ssn: formData.ssn1 + formData.ssn2 + formData.ssn3
      };


    } else {
      updateTaxInfo = {
        national_id: formData.national_id,
        itin: formData.itin
      };
    }
    this.setState({ updatingTaxInfo: true });
    const response = await actions.updateTaxpayerInfo(updateTaxInfo);

    if (response.success) {
      actions.navigateTo("KYCVerifyID");
      actions.showMessage("success", "You have successfully submitted ssn number");
    }
    this.setState({ updatingTaxInfo: false });
  };

  render() {
    const { actions } = this.props;
    const { updatingTaxInfo, isLoading } = this.state;

    if (isLoading) return <LoadingScreen />;
    return (
      <RegularLayout>

        <CelText weight={"700"} type={"H1"} align='center'>{this.isFromUS() ? 'Social Security Number' : 'Taxpayer ID'}</CelText>

        <CelText align={"center"} margin={"10 0 0 0"} type={"H4"} weight={"300"}>{this.isFromUS() ? 'US residents must provide their SSN to earn interest through Celsius. This is an optional step and can be entered later.' : 'You may need to fill your taxpayer ID for tax reporting. You may add it later in your profile.'}</CelText>

        <SocialSecurityNumber
          onPress={this.submitTaxpayerInfo}
          updatingTaxInfo={updatingTaxInfo}
        />

        {this.isFromUS() ? <CelButton
          onPress={() => actions.openModal(MODALS.SSN_MODAL)}
          disabled={updatingTaxInfo}
          basic
          margin="20 0 20 0"
        >
          Skip
        </CelButton>
          :
          <CelButton
            onPress={() => actions.navigateTo('KYCVerifyID')}
            disabled={updatingTaxInfo}
            basic
            margin="20 0 20 0"
          >
            Skip
        </CelButton>
        }
        <SsnModal />
      </RegularLayout>
    );
  }
}

export default KYCTaxpayer
