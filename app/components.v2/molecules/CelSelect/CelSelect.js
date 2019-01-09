// TODO(fj): move state and coutry to another component or refactor this one

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { bindActionCreators } from "redux";
import { lookup } from "country-data";

import * as appActions from "../../../redux/actions";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import { GENDER, PERSON_TITLE, STATE, YEARS, MONTHS, DAYS } from "../../../config/constants/common";
import Icon from "../../atoms/Icon/Icon";
import SelectCountryModal from "../../organisms/SelectCountryModal/SelectCountryModal";
import InputErrorWrapper from "../../atoms/InputErrorWrapper/InputErrorWrapper";
import testUtil from "../../../utils/test-util";
import SelectStateModal from '../../organisms/SelectStateModal/SelectStateModal';

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelSelect extends Component {
  static propTypes = {
    theme: PropTypes.oneOf(['blue', 'white']),
    type: PropTypes.oneOf(['gender', 'title', 'country', 'native', 'state', 'day', 'month', 'year']),
    // array of { label, value } objects
    items: PropTypes.instanceOf(Array),
    value: PropTypes.oneOfType([
      PropTypes.instanceOf(Object),
      PropTypes.string,
    ]),
    field: PropTypes.string,
    testSelector: PropTypes.string,
    error: PropTypes.string,
    labelText: PropTypes.string,
    margin: PropTypes.string,
    flex: PropTypes.number,
    onlyError: PropTypes.bool,
    disabled: PropTypes.bool,
    shadow: PropTypes.bool,
  }
  static defaultProps = {
    type: 'native',
    value: '',
    field: '',
    items: [],
    labelText: '',
    theme: 'blue',
    margin: '0 0 15 0',
    onlyError: false,
    disabled: false,
    shadow: false
  }

  constructor(props) {
    super(props);

    let items;

    switch (props.type) {
      case 'title':
        items = PERSON_TITLE;
        break;
      case 'gender':
        items = GENDER;
        break;
      case 'state':
        items = STATE;
        break;
      case 'day':
        items = DAYS;
        break;
      case 'year':
        items = YEARS;
        break;
      case 'month':
        items = MONTHS;
        break;
      default:
        items = props.items;
    }

    this.state = {
      visible: false,
      items,
      value: undefined,
    };
  }

  componentDidMount = () => {
    const { value, type } = this.props;
    const { items } = this.state;

    if (value) {
      let item;
      if (type === 'country') {
        item = lookup.countries({ name: value })[0]
      } else {
        item = items.filter(i => i.value === value)[0];
      }

      this.setState({ value: item });
    }
  }

  // lifecycle methods
  componentWillReceiveProps(nextProps) {

    const { value, type } = this.props;
    const { items } = this.state;

    if (nextProps.value && value !== nextProps.value) {
      let item;
      if (type === 'country') {
        item = lookup.countries({ name: nextProps.value })[0]
      } else {
        item = items.filter(i => i.value === nextProps.value)[0];
      }

      this.setState({ value: item });
    }
  }

  // event hanlders
  selectValue = (item) => {
    const { actions, field, type } = this.props;
    if (item) {
      if (type === 'country') {
        actions.updateFormField(field, item.name);
        actions.updateFormField(field, item.name);
      } else {
        actions.updateFormField(field, item.value);
      }
    }
    this.setState({ visible: false });
  };

  handlePickerSelect = (value) => {
    const { actions, field } = this.props;
    if (value) {
      actions.updateFormField(field, value);
    }
  };

  renderSelect() {
    const { theme, labelText, error, margin, onlyError, disabled, field } = this.props;
    const { visible, value } = this.state;

    const label = value && labelText ? labelText.toUpperCase() : labelText;
    const labelStyles = value ? [globalStyles.selectLabelActive] : [globalStyles.selectLabelInactive];
    labelStyles.push(globalStyles[`${theme}InputTextColor`]);

    let inputBackground;
    if (disabled) {
      inputBackground = globalStyles[`${theme}InputWrapperDisabled`];
    } else {
      inputBackground = globalStyles[`${theme}InputWrapperActive`];
    }

    return (
      <InputErrorWrapper
        field={field}
        theme={theme}
        error={error}
        margin={margin}
        onlyError={onlyError}
      >
        <TouchableOpacity
         ref={testUtil.generateTestHook(this, 'CelSelect.fillName')}
          onPress={() => this.setState({ visible: !visible })}
          style={[globalStyles.inputWrapper, globalStyles[`${theme}InputWrapper`], inputBackground]}>
          <Text style={labelStyles}>{label}</Text>
          <Text style={[globalStyles.input, globalStyles.nonPasswordInputStyle, globalStyles[`${theme}InputTextColor`]]}>
            {value && (value.label || value.name)}
          </Text>
          {!disabled &&
            <View style={globalStyles.inputIconRight}>
              <Icon name='CaretDown' height='9' width='15' fill={globalStyles[`${theme}InputTextColor`].color} />
            </View>
          }
        </TouchableOpacity>
      </InputErrorWrapper>
    );
  }

  // rendering methods
  render() {
    const { type, flex, disabled, shadow } = this.props;
    const { visible, items, value } = this.state;
    const propVisible = (typeof this.props.disabled !== 'undefined' && this.props.disabled) ? false : visible;

    const shadowStyle = shadow ? {
      shadowColor: '#000000',
      shadowOpacity: 0.2,
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 2,
      borderColor: Platform.OS === "ios" ? null : "rgba(0,0,0,.2)",
      borderWidth: Platform.OS === "ios" ? null : 1,
    } : null;

    return (
      <View style={[flex ? { flex } : null, shadowStyle ]}>
        {type !== 'country' && type !== 'state' ?
          <RNPickerSelect
            disabled={disabled}
            items={items}
            onValueChange={this.handlePickerSelect}
            value={value ? value.value : null}>
            {this.renderSelect()}
          </RNPickerSelect> :
          this.renderSelect()
        }
        {type === 'country' &&
          <SelectCountryModal
            visible={propVisible}
            onClose={this.selectValue}
          />
        }
       {type === 'state' &&
          <SelectStateModal
            visible={propVisible}
            onClose={this.selectValue}
          />
        }
      </View>
    );
  }
}

export default testUtil.hookComponent(CelSelect);


