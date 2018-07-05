import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Item, Label } from "native-base";
import PhoneInput from 'react-native-phone-input';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../../redux/actions";

import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import SelectCountryModal from "../../organisms/SelectCountryModal/SelectCountryModal";


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
      alpha2: 'US',
      showCountryModal: false,
    };
  }

  componentDidMount() {
    this.setState({
      pickerData: this.phone.getPickerData(),
    });
  }

  componentDidUpdate() {
    const { value } = this.props;
    // format '+000 000 000 000 000'
    if (value) {
      let phoneDisplay = [];
      if (value.substring(0,4)) phoneDisplay.push(value.substring(0,4));
      if (value.substring(4,7)) phoneDisplay.push(value.substring(4,7));
      if (value.substring(7,10)) phoneDisplay.push(value.substring(7,10));
      if (value.substring(10,13)) phoneDisplay.push(value.substring(10,13));
      if (value.substring(13,16)) phoneDisplay.push(value.substring(13,16));
      phoneDisplay = phoneDisplay.join(' ');
      this.phone.inputPhone.setNativeProps({ text: phoneDisplay })
    }
  }

  onPressFlag() {
    if (this.props.editable) {
      this.setState({ showCountryModal: true });
    }
  }

  selectCountry(country) {
    const countryAlpha2 = country != null ? country.alpha2.toLowerCase() : 'US';
    this.phone.selectCountry(countryAlpha2);
    this.setState({ alpha2: countryAlpha2, showCountryModal: false });
    this.changePhoneNumber(country.countryCallingCodes[0]);
  }

  changePhoneNumber = (text) => {
    const { updateFormField, field } = this.props;
    updateFormField(field, text.split(' ').join(''));
  }

  saveLayout = () => {
    const { setInputLayout, field } = this.props;
    this.phone.inputPhone.measureInWindow((x, y, width, height) => {
      setInputLayout(field, { x, y, width, height });
    })
  }

  focusPhoneInput = () => {
    this.props.scrollTo({ field: this.props.field });
    return false;
  }

  render() {
    const { theme, value } = this.props;
    const { showCountryModal } = this.state;
    const disabled = this.props.editable === false;

    const labelStyles = [globalStyles.selectLabelActive];
    labelStyles.push(globalStyles[`${theme}InputTextColor`])
    const inputStyles = {...globalStyles.input, ...globalStyles[`${theme}InputTextColor`]}
    const phoneBackground = value ? globalStyles[`${theme}InputWrapperActive`] : globalStyles[`${theme}InputWrapper`];

    const phoneInputProps = {
      maxLength: 16 + 4,
      onFocus: this.focusPhoneInput,
      onLayout: this.saveLayout,
    }

    return (
      <View
        style={[globalStyles.inputWrapper, globalStyles[`${theme}InputWrapper`], phoneBackground]}
      >
        <Label style={labelStyles}>{this.props.labelText.toUpperCase() || 'PHONE'}</Label>
        <Item style={globalStyles.inputItem}>
          <PhoneInput
            ref={(ref) => { this.phone = ref }}
            textStyle={inputStyles}
            textProps={phoneInputProps}
            onPressFlag={this.onPressFlag}
            onChangePhoneNumber={this.changePhoneNumber}
            disabled={disabled}
          />
          <SelectCountryModal
            withPhones
            visible={ showCountryModal }
            onClose={ country => this.selectCountry(country) }
          />
        </Item>
      </View>
    );
  }
}

export default CelPhoneInput;
