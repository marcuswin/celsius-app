import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Item, Label } from "native-base";
import PhoneInput from "react-native-phone-input";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";

import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import SelectCountryModal from "../../organisms/SelectCountryModal/SelectCountryModal";
import InputErrorWrapper from "../../atoms/InputErrorWrapper/InputErrorWrapper";


@connect(
  state => ({
    formData: state.ui.formData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class CelPhoneInput extends Component {
  static propTypes = {
    theme: PropTypes.oneOf(["blue", "white"]),
    field: PropTypes.string.isRequired,
    labelText: PropTypes.string,
    error: PropTypes.string,
    value: PropTypes.string,
    editable: PropTypes.bool
  };

  static defaultProps = {
    theme: "blue",
    editable: true
  };

  constructor(props) {
    super(props);

    this.state = {
      alpha2: "US",
      showCountryModal: false
    };
  }

  componentDidMount() {
    this.setState({
      pickerData: this.phone.getPickerData()
    });
  }

  onPressFlag = () => {
    if (this.props.editable) {
      this.setState({ showCountryModal: true });
    }
  }

  selectCountry = (country) => {
    if (country) {
      const countryAlpha2 = country != null ? country.alpha2.toLowerCase() : "US";
      this.phone.selectCountry(countryAlpha2);
      this.setState({ alpha2: countryAlpha2, showCountryModal: false });
      this.changePhoneNumber(country.countryCallingCodes[0]);
    } else {
      this.setState({ showCountryModal: false });
    }
  }

  changePhoneNumber = (text) => {
    const { field, actions } = this.props;
    actions.updateFormField(field, text.split(" ").join(""));
  };

  saveLayout = () => {
    const { field, actions } = this.props;
    this.phone.inputPhone.measureInWindow((x, y, width, height) => {
      actions.setInputLayout(field, { x, y, width, height });
    });
  };

  focusPhoneInput = () => {
    const { actions, field } = this.props;
    actions.scrollTo({ field });
    return false;
  };

  render() {
    const { theme, value, editable, labelText, error } = this.props;
    const { showCountryModal } = this.state;
    const disabled = editable === false;

    const labelStyles = [globalStyles.selectLabelActive];
    labelStyles.push(globalStyles[`${theme}InputTextColor`]);
    const inputStyles = { ...globalStyles.input, ...globalStyles.nonPasswordInputStyle, ...globalStyles[`${theme}InputTextColor`] };
    const phoneBackground = value ? globalStyles[`${theme}InputWrapperActive`] : globalStyles[`${theme}InputWrapper`];

    const phoneInputProps = {
      maxLength: 16 + 4,
      onFocus: this.focusPhoneInput,
      onLayout: this.saveLayout
    };

    const flagStyles = {
      backgroundColor: 'rgba(255,255,255,0.3)',
      borderWidth: 0,
      borderRadius: 4,
    };

    const disabledStyles = !editable ? globalStyles[`${theme}InputWrapperDisabled`] : {};

    return (
      <InputErrorWrapper
        theme={theme}
        error={error}
      >
        <View
          style={[globalStyles.inputWrapper, globalStyles[`${theme}InputWrapper`], phoneBackground, disabledStyles]}
        >
          <Label style={labelStyles}>{labelText.toUpperCase() || "PHONE"}</Label>
          <Item style={globalStyles.inputItem}>
            <PhoneInput
              ref={(ref) => {
                this.phone = ref;
              }}
              textStyle={inputStyles}
              textProps={phoneInputProps}
              onPressFlag={this.onPressFlag}
              onChangePhoneNumber={this.changePhoneNumber}
              disabled={disabled}
              flagStyle={flagStyles}
              value={value}
            />
            <SelectCountryModal
              withPhones
              visible={showCountryModal}
              onClose={country => this.selectCountry(country)}
            />
          </Item>
        </View>
      </InputErrorWrapper>
    );
  }
}

export default CelPhoneInput;
