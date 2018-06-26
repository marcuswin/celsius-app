import React from 'react';
import {Platform} from "react-native";
import CheckBox from 'react-native-checkbox';

const labelStyle = { color: '#ffffff', fontSize: 16, fontFamily: 'agile-light' };
const checkboxStyle = {
  backgroundColor: 'rgba(255,255,255,0.05)',
  resizeMode: 'center',
  height: 36,
  width: 36,
  borderRadius: 5
};

const checkboxStyleActive = {
  backgroundColor: 'rgba(255,255,255,0.35)',
  resizeMode: 'center',
  height: 36,
  width: 36,
  borderRadius: 5
};

const checkedImage = Platform.OS === 'ios' ? require('../../../../assets/images/icons/icon-check.png') : require('../../../../assets/images/icons/icon-check2x.png');

const CelCheckbox = (props) => {

  const boxStyle = props.value ? checkboxStyleActive : checkboxStyle;

  return (
    <CheckBox
      label={props.label}
      checked={props.value}
      labelStyle={labelStyle}
      checkboxStyle={boxStyle}
      checkedImage={checkedImage}
      uncheckedImage={require('../../../../assets/images/icons/transparent.png')}
      onChange={props.onChange}
    />
  )
}

export default CelCheckbox;
