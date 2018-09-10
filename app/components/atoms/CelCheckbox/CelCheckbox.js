import React from 'react';
import {Platform} from "react-native";
import CheckBox from 'react-native-checkbox';
import { STYLES } from "../../../config/constants/style";

const whiteLabelStyle = { color: '#ffffff', fontSize: 16, fontFamily: 'agile-light' };
const blueLabelStyle = { color: STYLES.GRAY_2, fontSize: 14, fontFamily: 'agile-light' };
const whiteCheckboxStyle = {
  backgroundColor: 'rgba(255,255,255,0.05)',
  resizeMode: 'center',
  height: 36,
  width: 36,
  borderRadius: 5
};

const whiteCheckboxStyleActive = {
  backgroundColor: 'rgba(255,255,255,0.35)',
  resizeMode: 'center',
  height: 36,
  width: 36,
  borderRadius: 5
};

const blueCheckboxStyle = {
  borderColor: 'rgba(65,86,166,1)',
  borderWidth: 2,
  resizeMode: 'center',
  height: 36,
  width: 36,
  borderRadius: 5
};

const blueCheckboxStyleActive = {
  borderColor: 'rgba(65,86,166,1)',
  backgroundColor: 'rgba(65,86,166,1)',
  resizeMode: 'center',
  height: 36,
  width: 36,
  borderRadius: 5
};

const checkedImage = Platform.OS === 'ios' ? require('../../../../assets/images/icons/icon-check.png') : require('../../../../assets/images/icons/icon-check2x.png');

const CelCheckbox = (props) => {

  let boxStyle = props.value ? whiteCheckboxStyleActive : whiteCheckboxStyle;
  let labelStyle = whiteLabelStyle;

  if (props.theme === 'blue') {
    boxStyle = props.value ? blueCheckboxStyleActive : blueCheckboxStyle;
    labelStyle = blueLabelStyle;
  }

  if (props.size === 'small') {
    boxStyle.width = 20;
    boxStyle.height = 20;
    boxStyle.borderWidth = 2;
    boxStyle.resizeMode = 'contain';
  }

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
