import React from 'react';
import PropTypes from 'prop-types';
import RNPickerSelect from "react-native-picker-select";

import testUtil from "../../../utils/test-util";

import SimpleSelectStyle from "./SimpleSelect.styles";
import Icon from "../../atoms/Icon/Icon";
import STYLES from '../../../constants/STYLES';

const SimpleSelect = (props) => {
  const style = SimpleSelectStyle()
  const { displayValue, items, onChange, updateFormField, field } = props

  return (
    <RNPickerSelect
      onValueChange={(item) => {
        if (item) {
          return onChange ? onChange(field, item) : updateFormField(field, item)
        }
      }}
      style={style}
      useNativeAndroidPickerStyle={false}
      value={displayValue}
      Icon={() => <Icon name="CaretDown" width={8} fill={STYLES.COLORS.DARK_GRAY} />}
      items={items}
    />
  )
}

SimpleSelect.propTypes = {
  displayValue: PropTypes.string,
  // { label, value }
  items: PropTypes.instanceOf(Array).isRequired,
  updateFormField: PropTypes.func,
  onChange: PropTypes.func,
  field: PropTypes.string.isRequired,
}

export default testUtil.hookComponent(SimpleSelect);
