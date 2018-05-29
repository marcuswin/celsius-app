import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TouchableOpacity, View, Text } from 'react-native';
import DatePicker from 'react-native-datepicker';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as actions from "../../../redux/actions";
import Icon from "../../atoms/Icon/Icon";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";

@connect(
  state => ({
    formData: state.ui.formData,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class CelDatepicker extends Component {
  static propTypes = {
    labelText: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    onDateChange: PropTypes.func,
    value: PropTypes.instanceOf(Date),
    format: PropTypes.string,
  }

  static defaultProps = {
    format: 'MM/DD/YYYY',
  }

  onDateChange = (date) => {
    const { updateFormField, field } = this.props;
    updateFormField(field, new Date(date));
  }

  render() {
    const { value, labelText, format } = this.props;
    const label = value && labelText ? labelText.toUpperCase() : labelText;

    return (
      <View>
        <TouchableOpacity onPress={() => this.datePicker.onPressDate()} style={globalStyles.inputWrapper}>
          <Text style={ value ? globalStyles.selectLabelActive : globalStyles.selectLabelInactive}>{ label }</Text>
          { value ? <Text style={ globalStyles.input }>{ moment(value).format(format) }</Text> : null }

          <View style={globalStyles.inputIconRight}>
            <Icon name='CalendarIcon' height='29' width='29' viewBox="0 0 32 32" fill={'#fff'} />
          </View>
        </TouchableOpacity>

        <DatePicker
          ref={(datePicker) => {
            this.datePicker = datePicker;
          }}
          style={{opacity: 0, height: 0, width: 0, position: 'absolute', top: -111111}}
          customStyles={{alignItems: 'left', borderWidth: 0}}
          date={value}
          mode="date"
          format="MM/DD/YYYY"
          confirmBtnText="Ok"
          cancelBtnText="Cancel"
          onDateChange={this.onDateChange}
        />
      </View>
    )
  }
}

export default CelDatepicker;
