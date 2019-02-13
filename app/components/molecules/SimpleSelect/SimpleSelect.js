import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import RNPickerSelect from "react-native-picker-select";

import testUtil from "../../../utils/test-util";

import SimpleSelectStyle from "./SimpleSelect.styles";
import CelText from "../../atoms/CelText/CelText";
import Icon from "../../atoms/Icon/Icon";

const SimpleSelect = (props) => {
  const style = SimpleSelectStyle()
  const { displayValue, items, updateFormField, field } = props

  return (
    <RNPickerSelect
      onValueChange={(item) => updateFormField(field, item)}
      items={items}
    >
      <View style={style.container}>
        <CelText align="center" type="H2" margin="0 10 0 0">{ displayValue }</CelText>
        <Icon name="CaretDown" width={15} height={15} />
      </View>
    </RNPickerSelect>
  )
}

SimpleSelect.propTypes = {
  displayValue: PropTypes.string,
  // { label, value }
  items: PropTypes.instanceOf(Array).isRequired,
  updateFormField: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired,
}

export default testUtil.hookComponent(SimpleSelect);
