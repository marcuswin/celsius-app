import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import PhoneInput from 'react-native-phone-input';
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

    // inherited from CelInput
    labelText: PropTypes.string.isRequired,
    value: PropTypes.string,
    editable: PropTypes.bool,
    
  }

  static defaultProps = {
    theme: 'blue',
    // inherited from CelInput
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
      const { updateFormField, field } = this.props;
      const disabled = this.props.editable === false;
      return (
        <View style={globalStyles.inputWrapper}>
          <PhoneInput
            ref={(ref) => {
              this.phone = ref;
            }}
            onPressFlag={this.onPressFlag}
            textStyle={globalStyles.selectLabelInactive}
            textProps={{placeholder: this.props.labelText, placeholderTextColor: 'white'}}
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
        </View>
      );
    }
  }


export default CelPhoneInput;
