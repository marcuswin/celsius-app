import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import KYCTaxpayerStyle from "./KYCTaxpayer.styles";
import CelText from "../../atoms/CelText/CelText";
import ProgressBar from "../../atoms/ProgressBar/ProgressBar";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import CelInput from "../../atoms/CelInput/CelInput";
import CelButton from "../../atoms/CelButton/CelButton";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

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
    customCenterComponent: <ProgressBar steps={4} currentStep={3}/>
  });

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      updatingTaxInfo: false
    };
  }

  async componentDidMount() {
    const { actions, user } = this.props;
    await actions.getProfileInfo();
    this.setState({ isLoading: false });
    this.initForm(user);
  }

  initForm = (user) => {
    const { actions } = this.props;

    if (user) {
      if (user.country === "United States" || user.citizenship === "United States") {
        actions.initForm({ ssn: user.ssn });
      } else {
        actions.initForm({
          itin: user.itin,
          national_id: user.national_id
        });
      }
    }
  };

  submitTaxpayerInfo = async () => {
    const { actions, formData, user } = this.props;
    let updateTaxInfo;
    if (user.country === "United States" || user.citizenship === "United States") {
      updateTaxInfo = { ssn: formData.ssn };
    } else {
      updateTaxInfo = {
        national_id: formData.national_id,
        itin: formData.itin
      };
    }
    this.setState({ updatingTaxInfo: true });
    const response = await actions.updateProfileInfo(updateTaxInfo);
    if (response.success) {
      actions.navigateTo("KYCVerifyID");
    }
    this.setState({ updatingTaxInfo: false });
  };

  render() {
    const { formData, formErrors, user } = this.props;
    const { updatingTaxInfo, isLoading } = this.state;
    // const style = KYCTaxpayerStyle();

    if (isLoading) return <LoadingScreen/>;

    return (
      <AuthLayout>

        <CelText weight={"700"} type={"H1"}>Taxpayer ID</CelText>

        <CelText align={"center"} margin={"10 0 0 0"} type={"H4"} weight={"300"}>We need this information due to
          anti-money laundering (AML) regulations and background checks.</CelText>

        {(user.country === "United States" || user.citizenship === "United States") ?
          <CelInput margin="20 0 20 0" type="text" field="ssn" placeholder="Social Security Number (optional)"
                    value={formData.ssn} error={formErrors.ssn}/>
          :
          <React.Fragment>
            <CelInput margin="20 0 20 0" type="text" field="itin" placeholder="E-International Tax ID Number (optional)"
                      value={formData.itin} error={formErrors.itin}/>
            <CelInput margin="0 0 30 0" type="text" field="national_id" placeholder="E-National ID Number (optional)"
                      value={formData.national_id} error={formErrors.national_id}/>
          </React.Fragment>
        }

        <CelButton
          onPress={() => this.submitTaxpayerInfo()}
          iconRight={"IconArrowRight"}
          iconRightHeight={"20"}
          iconRightWidth={"20"}
          loading={updatingTaxInfo}
        >
          Verify your ID
        </CelButton>

      </AuthLayout>
    );
  }
}

export default testUtil.hookComponent(KYCTaxpayer);
