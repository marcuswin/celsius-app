import { StyleSheet } from 'react-native';
import {FONT_SCALE, STYLES} from "../../../../config/constants/style";

const PrimaryButtonStyle = StyleSheet.create({
  button: {
    height: 60,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 60,
    alignItems: 'center',
    flexDirection:'row'
  },
  title: {
    fontSize: FONT_SCALE * 20,
    textAlign: 'center',
    fontFamily: 'agile-medium',
    color: 'rgba(65,86,166,1)'
  },
  loader: {
    width: 30,
    height: 30
  },
  btnContent: {
    flexDirection: 'row',
    opacity: 1
  },
  disabledStyles: {
    backgroundColor: STYLES.PRIMARY_BLUE,
    borderColor: 'rgba(255,255,255,0.3)',
    borderWidth: 2
  },
  disabledTextStyles: {
    color: 'rgba(255,255,255,0.3)'
  },
});

export default PrimaryButtonStyle;
