import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import CheckBox from "react-native-check-box";

import CelText from "../CelText/CelText";
import STYLES from '../../../constants/STYLES';

const CelCheckbox = (props) => {
  const onPress = props.onChange || props.updateFormField
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', marginBottom: 20 }}
      onPress={() => onPress(props.field, !props.value)}
    >
      <CheckBox
        checkBoxColor={STYLES.COLORS.MEDIUM_GRAY}
        checkedCheckBoxColor={STYLES.COLORS.GREEN}
        style={{ paddingRight: 10, borderColor: 'red' }}
        onClick={() => { }}
        isChecked={props.value}
      />
      <CelText color={STYLES.COLORS.MEDIUM_GRAY}>{props.rightText}</CelText>
    </TouchableOpacity>

  )
}

CelCheckbox.propTypes = {
  field: PropTypes.string.isRequired,
  updateFormField: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.bool,
  rightText: PropTypes.string,
  textColor: PropTypes.string,
}

export default CelCheckbox
