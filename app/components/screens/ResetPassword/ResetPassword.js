import React, {Component} from 'react';
// import {} from 'react-native';
import {View} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import _ from "lodash";
import * as actions from "../../../redux/actions";
// import {STYLES} from "../../../config/constants/style";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import PrimaryInput from "../../atoms/Inputs/PrimaryInput";
import CelButton from '../../atoms/CelButton/CelButton';


// eslint-disable-next-line
const getError = (errors, field, def = null) => {
  return _.get(errors, [field, 'msg'], def)
}


@connect(
  () => ({
  // map state to props
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animatedHeading: {
        text: 'Reset Password'
      },
      formData: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }
    };
    // binders
    this.onChangeField = this.onChangeField.bind(this);
  }

  onChangeField = (fieldName, text) => {
    this.setState({ formData: { ...this.state.formData, [fieldName]: text }});
  }


  // lifecycle methods
  // event handlers
  // rendering methods
  render() {
    const {animatedHeading, formData} = this.state;

    return (
      <SimpleLayout
        animatedHeading={animatedHeading}
      >

        <PrimaryInput
          type="secondary"
          labelText={"Current password"}
          value={formData.currentPassword}
          secureTextEntry
          onChange={text => this.onChangeField('currentPassword', text)}
        />

        <PrimaryInput
          type="secondary"
          labelText={"New password"}
          value={formData.newPassword}
          secureTextEntry
          onChange={text => this.onChangeField('newPassword', text)}
        />

        <PrimaryInput
          type="secondary"
          labelText={"Confirm password"}
          value={formData.confirmPassword}
          secureTextEntry
          onChange={text => this.onChangeField('confirmPassword', text)}
        />

        <View style={{marginTop: 40, marginBottom: 30}}>
          <CelButton
            color="blue"
          >Change password</CelButton>
        </View>

      </SimpleLayout>
    );
  }
}

export default ResetPassword;
