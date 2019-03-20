import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { View } from 'react-native'

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import KYCAddressInfoStyle from "./KYCAddressInfo.styles";
import ProgressBar from '../../atoms/ProgressBar/ProgressBar'
import AuthLayout from '../../layouts/AuthLayout/AuthLayout'
import CelText from '../../atoms/CelText/CelText'
import CelInput from '../../atoms/CelInput/CelInput'
import CelSelect from '../../molecules/CelSelect/CelSelect'
import CelButton from '../../atoms/CelButton/CelButton'

@connect(
  state => ({
    formData: state.forms.formData,
    formErrors: state.forms.formErrors,
    user: state.user.profile
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class KYCAddressInfo extends Component {
  static propTypes = {};
  static defaultProps = {}

  static navigationOptions = () => ({
    customCenterComponent: <ProgressBar steps={4} currentStep={2}/>
  });

  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      updatingAddressInfoInProgress: false,
    }
  }

  async componentDidMount() {
    const { actions } = this.props

    await actions.getProfileInfo()
    this.setState({isLoading: false})

    this.initForm(this.props.user)
  }

  initForm = (user) => {
    const { actions } = this.props

    if (user) {
      actions.updateFormFields({
        street: user.street,
        flatNumber: user.flat_number,
        city: user.city,
        zip: user.zip,
        country: {name: user.country},
        state: user.state
      })
    }
  }

  submitAddressInfo = async () => {
    const { formData, actions } = this.props

    const updatedAddressInfo = {
      street: formData.street,
      flat_number: formData.flatNumber,
      city: formData.city,
      zip: formData.zip,
      country: formData.country.name,
      state: formData.state,
    }

    this.setState({updatingAddressInfoInProgress: true})
    const response = await actions.updateProfileAddressInfo(updatedAddressInfo)

    if (response.success) {
      actions.navigateTo('KYCTaxpayer')
    }

    this.setState({updatingAddressInfoInProgress: false})
  }

  render() {
    const { formData, formErrors } = this.props
    const { updatingAddressInfoInProgress } = this.state

    return (
      <AuthLayout>
        <CelText type='H1' weight='bold' margin={'0 0 30 0'}>Address info</CelText>

        <CelInput type="text" field="street" placeholder='Address' value={formData.street} error={formErrors.street} />
        <CelInput type="text" field="flatNumber" placeholder='Apartment number (optional)' value={formData.flatNumber} />
        <CelInput type="text" field="city" placeholder='City' value={formData.city} error={formErrors.city}/>
        <CelInput type="text" field="zip" placeholder='ZIP/Postal Code' value={formData.zip} error={formErrors.zip}/>
        <CelSelect type='country' field='country' labelText='Country' showCountryFlag value={formData.country} error={formErrors.country} margin='0 0 0 0'/>

        {formData.country && formData.country.name === 'United States' &&
          <CelSelect type='state' field='state' labelText='State' value={formData.state} error={formErrors.state} margin='20 0 0 0'/>
        }

        <View style={{flex: 1, justifyContent: 'flex-end', marginTop: 30}}>
          <CelButton onPress={this.submitAddressInfo} iconRight='IconArrowRight' loading={updatingAddressInfoInProgress}>
            Your Taxpayer ID
          </CelButton>
        </View>
      </AuthLayout>
    );
  }
}

export default testUtil.hookComponent(KYCAddressInfo);
