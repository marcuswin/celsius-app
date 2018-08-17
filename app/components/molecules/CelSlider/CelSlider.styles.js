import { StyleSheet } from 'react-native';
import { COLORS } from "../../../config/constants/style";

const baseCircle = {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: 'blue',
  borderWidth: 4,
  borderColor: 'white',
}

const baseText = {
  fontFamily: 'agile-medium',
  fontSize: 16,
  marginTop: 15,
  textAlign: 'center',
  marginLeft: 5,
  marginRight: 5,
  color: COLORS.gray2,
}

const CelSliderStyle = StyleSheet.create({
  activeCircle: {
    ...baseCircle,
    backgroundColor: COLORS.blue,
  },
  inactiveCircle: {
    ...baseCircle,
    backgroundColor: COLORS.gray2,
  },
  activeText: {
    ...baseText,
  },
  inactiveText: {
    ...baseText,
    opacity: 0.7,
  },
  wrapper: {
    flexDirection: 'row',
    height: 120,
    marginTop: 15,
    marginBottom: 15
  }
});

export default CelSliderStyle;
