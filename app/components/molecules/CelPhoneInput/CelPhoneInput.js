import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Item, Label } from "native-base";
import PhoneInput from 'react-native-phone-input';
import get from 'lodash/get';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import CountryPicker from 'react-native-country-picker-modal';
import * as actions from "../../../redux/actions";

import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";


@connect(
  state => ({
    formData: state.ui.formData,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class CelPhoneInput extends Component {
  static propTypes = {
    theme: PropTypes.oneOf(['blue', 'white']),
    field: PropTypes.string.isRequired,
    labelText: PropTypes.string,
    value: PropTypes.string,
    editable: PropTypes.bool,
  }

  static defaultProps = {
    theme: 'blue',
    editable: true,
  }

  constructor(props) {
    super(props);

    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.state = {
      cca2: 'US',
    };
  }

  componentDidMount() {
    this.setState({
      pickerData: this.phone.getPickerData(),
    });
  }

  onPressFlag() {
    if (this.props.editable) {
      this.countryPicker.openModal();
    }
  }

  selectCountry(country) {
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({ cca2: country.cca2 });
  }

  render() {
    const { theme, updateFormField, field } = this.props;
    const disabled = this.props.editable === false;

    const labelStyles = {...globalStyles.selectLabelInactive,  position: 'absolute', left: 40, ...globalStyles[`${theme}InputTextColor`]};
    const inputStyles = {...globalStyles.input, ...globalStyles[`${theme}InputTextColor`]}
    const inputPhoneValue = get(this.phone, 'inputPhone.props.value', null);

    return (
      <View style={[globalStyles.inputWrapper, globalStyles[`${theme}InputWrapper`]]}>
        <Item style={globalStyles.inputItem}>
          {!inputPhoneValue ? <Label style={labelStyles}>{this.props.labelText || ''}</Label> : null}
          <PhoneInput
            ref={(ref) => {
              this.phone = ref;
            }}
            textStyle={inputStyles}
            onPressFlag={this.onPressFlag}
            onChangePhoneNumber={(text) => updateFormField(field, text)}
            value={this.props.value}
            disabled={disabled}
          />
          <CountryPicker
            ref={(ref) => {
              this.countryPicker = ref;
            }}
            onChange={value => this.selectCountry(value)}
            translation="eng"
            cca2={this.state.cca2}
            disabled={disabled}
          >
            <View />
          </CountryPicker>
        </Item>
      </View>
    );
  }
}


export default CelPhoneInput;
