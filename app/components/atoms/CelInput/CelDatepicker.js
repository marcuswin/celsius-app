import React, {Component} from 'react';
import { TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-datepicker';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as actions from "../../../redux/actions";

import CelInput from './CelInput';

@connect(
  state => ({
    formData: state.ui.formData,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class CelDatepicker extends Component {
 
  render() {
    return <View>
    <TouchableOpacity onPress={() => this.datePicker.onPressDate()}>
      <CelInput
        labelText={this.props.labelText}
        field={this.props.field}
        onPress={() => this.datePicker.onPressDate()}
        value={this.props.value}
      />
    </TouchableOpacity>
    <DatePicker
      ref={(datePicker) => {
        this.datePicker = datePicker;
      }}
      style={{opacity: 0, height: 0, width: 0, position: 'absolute', top: -111111}}
      customStyles={{alignItems: 'left', borderWidth: 0}}
      date={this.props.formData.dateOfBirth}
      mode="date"
      format="MM/DD/YYYY"
      confirmBtnText="Ok"
      cancelBtnText="Cancel"
      onDateChange={this.props.onDateChange}
    />
  </View>
  }
}

export default CelDatepicker;