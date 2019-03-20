import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { View } from 'react-native'

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import KYCProfileDetailsStyle from "./KYCProfileDetails.styles";
import ProgressBar from '../../atoms/ProgressBar/ProgressBar'
import CelText from '../../atoms/CelText/CelText'
import CelInput from '../../atoms/CelInput/CelInput'
import CelSelect from '../../molecules/CelSelect/CelSelect'
import CelButton from '../../atoms/CelButton/CelButton'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import AuthLayout from '../../layouts/AuthLayout/AuthLayout'

@connect(
  state => ({
    formData: state.forms.formData,
    formErrors: state.forms.formErrors,
    user: state.user.profile
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class KYCProfileDetails extends Component {

  static navigationOptions = () => ({
    title: "Profile Details",
    customCenterComponent: <ProgressBar steps={4} currentStep={1}/>

  });

  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      updatingProfileInProgress: false,
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
      let date;
      if (user.date_of_birth) {
        date = user.date_of_birth.split('-');
      } else {
        date = ['', '', ''];
      }

      actions.initForm({
        firstName: user.first_name,
        middleName: user.middle_name,
        lastName: user.last_name,
        citizenship: {name: user.citizenship},
        gender: user.gender ? user.gender.toLowerCase() : '',
        month: date[1],
        day: date[2],
        year: date[0],
      })
    }
  }

  submitProfileDetails = async () => {
    const { formData, actions } = this.props
    const updatedUser = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      middle_name: formData.middleName,
      date_of_birth: `${formData.month}/${formData.day}/${formData.year}`,
      gender: formData.gender,
      citizenship: formData.citizenship.name,
    }

    this.setState({updatingProfileInProgress: true})
    const response = await actions.updateProfileInfo(updatedUser)

    if (response.success) {
      actions.navigateTo('KYCAddressInfo')
    }

    this.setState({updatingProfileInProgress: false})
  }

  render() {
    const { formData, formErrors } = this.props
    const { isLoading, updatingProfileInProgress } = this.state
    // const style = KYCProfileDetailsStyle();
    if (isLoading) return <LoadingScreen />

    return (
      <AuthLayout>
        <CelText type='H1' weight='bold' margin={'0 0 30 0'}>Profile details</CelText>

        <CelInput type="text" field="firstName" placeholder='First name' value={formData.firstName} error={formErrors.first_name} />
        <CelInput type="text" field="middleName" placeholder='Middle name (optional)' value={formData.middleName} />
        <CelInput type="text" field="lastName" placeholder='Last name' value={formData.lastName} error={formErrors.last_name}/>

        <CelText type='H4' style={{alignSelf: 'flex-start', marginBottom: 10}}>Date of birth</CelText>
        <View style={{ flexDirection: 'row' }}>
          <CelSelect field='month' flex={1.4} type='month' labelText='Month' value={formData.month} margin="0 16 0 0" />
          <CelSelect field='day' flex={1.1} type='day' labelText='Day' value={formData.day} margin="0 16 0 0" />
          <CelSelect field='year' flex={1} type='year' labelText='Year' value={formData.year} margin='0 0 0 0'/>
        </View>
        {formErrors.date_of_birth &&
          <View style={{alignSelf: 'flex-start'}}>
            <CelText margin="5 0 0 0" color="red" style={{height: 20}}>{formErrors.date_of_birth}</CelText>
          </View>
        }

        <CelSelect type='gender' field='gender' labelText='Gender' value={formData.gender} error={formErrors.gender} margin='15 0 15 0'/>
        <CelSelect type='country' field='citizenship' labelText='Citizenship' value={formData.citizenship} error={formErrors.citizenship} margin='0 0 0 0'/>

        <View style={{flex: 1, justifyContent: 'flex-end', marginTop: 30}}>
          <CelButton onPress={this.submitProfileDetails} iconRight='IconArrowRight' loading={updatingProfileInProgress}>
            Your residential address
          </CelButton>
        </View>
      </AuthLayout>
    );
  }
}

export default testUtil.hookComponent(KYCProfileDetails);
