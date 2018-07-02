import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Item, Label } from "native-base";
import PhoneInput from 'react-native-phone-input';
import get from 'lodash/get';
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

  onPressFlag() {
    if (this.props.editable) {
      this.setState({ showCountryModal: true });
    }
  }

  selectCountry(country) {
    const countryAlpha2 = country != null ? country.alpha2.toLowerCase() : 'US';
    this.phone.selectCountry(countryAlpha2);
    this.setState({ alpha2: countryAlpha2, showCountryModal: false });
  }


  render() {
    const { theme, updateFormField, field, value } = this.props;
    const { showCountryModal } = this.state;
    const disabled = this.props.editable === false;

    const labelStyles = {...globalStyles.selectLabelInactive,  position: 'absolute', left: 40, ...globalStyles[`${theme}InputTextColor`]};
    const inputStyles = {...globalStyles.input, ...globalStyles[`${theme}InputTextColor`]}
    const inputPhoneValue = get(this.phone, 'inputPhone.props.value', null);

    const phoneBackground = value ? globalStyles[`${theme}InputWrapperActive`] : globalStyles[`${theme}InputWrapper`];

    return (
      <View style={[globalStyles.inputWrapper, globalStyles[`${theme}InputWrapper`], phoneBackground]}>
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
          <SelectCountryModal
            withPhones
            visible={ showCountryModal }
            onClose={ country => this.selectCountry(country) }
          />
          <View />
        </Item>
      </View>
    );
  }
}

export default CelPhoneInput;
