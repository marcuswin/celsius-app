import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import RNPickerSelect from 'react-native-picker-select';
import { lookup } from "country-data";

import testUtil from "../../../utils/test-util";
import CelSelectStyle from "./CelSelect.styles";
import * as appActions from "../../../redux/actions";
import { THEMES } from '../../../constants/UI';
import stylesUtil from '../../../utils/styles-util';
import Icon from '../../atoms/Icon/Icon';
import { PERSON_TITLE, GENDER, STATE, DAYS, YEARS, MONTHS } from '../../../config/constants/common';
import CelText from '../../atoms/CelText/CelText';
import STYLES from '../../../constants/STYLES';

@connect(
  state => ({
    lastSavedTheme: state.ui.theme
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelSelect extends Component {

  static propTypes = {
    theme: PropTypes.oneOf(Object.values(THEMES)),
    type: PropTypes.oneOf(['gender', 'title', 'country', 'native', 'state', 'day', 'month', 'year']),
    items: PropTypes.instanceOf(Array),
    value: PropTypes.oneOfType([
      PropTypes.instanceOf(Object),
      PropTypes.string,
    ]),
    field: PropTypes.string,
    labelText: PropTypes.string,
    margin: PropTypes.string,
    flex: PropTypes.number,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
  };
  static defaultProps = {
    type: 'native',
    value: '',
    field: '',
    items: [],
    labelText: '',
    margin: '0 0 15 0',
    disabled: false
  }

  constructor(props) {
    super(props);

    const items = this.getItems(props);
    this.state = {
      visible: false,
      items,
      value: undefined,
    };
  }

  componentDidMount = () => {
    const { value } = this.props;
    this.setValue(value);
  }

  // lifecycle methods
  componentWillReceiveProps(nextProps) {
    const { value } = this.props;

    if (nextProps.value && value !== nextProps.value) {
      this.setValue(nextProps.value);
    }
  }

  setValue = (value) => {
    const { type } = this.props;
    const { items } = this.state;

    if (value) {
      const item = type === 'country' ? lookup.countries({ name: value })[0] : items.filter(i => i.value === value)[0];
      this.setState({ value: item });
    }
  }

  getItems = ({ type, items }) => {
    switch (type) {
      case 'title':
        return PERSON_TITLE;
      case 'gender':
        return GENDER;
      case 'state':
        return STATE;
      case 'day':
        return DAYS;
      case 'year':
        return YEARS;
      case 'month':
        return MONTHS;
      default:
        return items;
    }
  }

  getInputStyle = (theme) => {
    const { disabled, margin } = this.props;

    const cmpStyle = CelSelectStyle(theme);
    const style = [cmpStyle.container, stylesUtil.getMargins(margin)];
    if (disabled) style.push(cmpStyle.disabledInput)
    return style;
  }

  getIconColor = (theme) => {
    switch (theme) {
      case THEMES.LIGHT:
        return STYLES.COLORS.DARK_GRAY_OPACITY
      case THEMES.DARK:
        return STYLES.COLORS.WHITE_OPACITY3
      case THEMES.CELSIUS:
        return STYLES.COLORS.DARK_GRAY_OPACITY
    }
  }

  getTextColor = (theme) => {
    const { value } = this.state;
    if (value) {
      switch (theme) {
        case THEMES.LIGHT:
          return STYLES.COLORS.DARK_GRAY;
        case THEMES.DARK:
          return STYLES.COLORS.WHITE;
        case THEMES.CELSIUS:
          return STYLES.COLORS.DARK_GRAY;
      }
    } else {
      return this.getIconColor(theme);
    }
  }

  handlePickerSelect = (value) => {
    const { actions, field } = this.props;

    if (value) {
      actions.updateFormField(field, value);
    }
  };

  // event hanlders
  selectValue = (item) => {
    const { actions, field, type } = this.props;

    if (item) {
      if (type === 'country') {
        actions.updateFormField(field, item.name);
      } else {
        actions.updateFormField(field, item.value);
      }
    }
    this.setState({ visible: false });
  };

  renderSelect() {
    const { disabled, theme, lastSavedTheme, labelText } = this.props;
    const { visible, value } = this.state;
    const currentTheme = theme || lastSavedTheme;

    const inputStyle = this.getInputStyle(currentTheme);
    const cmpStyle = CelSelectStyle(currentTheme);
    const textColor = this.getTextColor(currentTheme);
    const iconColor = this.getIconColor(currentTheme);

    return (
      <TouchableOpacity
        onPress={() => this.setState({ visible: !visible })}
        style={inputStyle}>
        <CelText type="H4" color={textColor}>{value ? (value.label || value.name) : labelText}</CelText>
        {!disabled &&
          <View style={cmpStyle.iconRight}>
            <Icon name='CaretDown' height='9' width='15' fill={iconColor} />
          </View>
        }
      </TouchableOpacity>
    );
  }

  // rendering methods
  render() {
    const { type, flex, disabled, onChange } = this.props;
    const { items, value } = this.state;
    // const propVisible = (typeof this.props.disabled !== 'undefined' && this.props.disabled) ? false : visible;

    return (
      <View style={flex ? { flex } : {}}>
        {type !== 'country' && type !== 'state' ?
          <RNPickerSelect
            disabled={disabled}
            items={items}
            onValueChange={onChange || this.handlePickerSelect}
            value={value ? value.value : null}
            style={{ height: 23 }}>
            {this.renderSelect()}
          </RNPickerSelect> :
          this.renderSelect()
        }
        {/* {type === 'country' &&
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
        } */}
      </View>
    );
  }
}

export default testUtil.hookComponent(CelSelect);