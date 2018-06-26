import { StyleSheet } from 'react-native';
import {FONT_SCALE, STYLES, COLORS} from "../../../config/constants/style";

const CelButtonStyle = StyleSheet.create({
  baseButton: {
    // width: '100%',
    justifyContent: 'center',
    borderRadius: 60,
    borderWidth: 2,
    alignItems: 'center',
    flexDirection:'row',
    opacity: 1,
  },
  baseTitle: {
    textAlign: 'center',
    color: 'white'
  },

  blueButton: {
    backgroundColor: COLORS.blue,
    borderColor: COLORS.blue,
  },
  greenButton: {
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
  },
  pinkButton: {
    backgroundColor: COLORS.pink,
    borderColor: COLORS.pink,
  },

  whiteButton: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  whiteBtnTitle: { color: 'transparent' },

  miniButton: { borderRadius: 20, height: 40, paddingLeft: 10, paddingRight: 10, },
  miniBtnTitle: { fontSize: FONT_SCALE * 16, fontFamily: 'agile-medium', },
  smallButton: { borderRadius: 25, height: 50 },
  smallBtnTitle: { fontSize: FONT_SCALE * 16, fontFamily: 'agile-light', },
  mediumButton: { borderRadius: 30, height: 60 },
  mediumBtnTitle: { fontSize: FONT_SCALE * 20, marginLeft: 10, fontFamily: 'agile-medium', },

  inverseButton: {
    backgroundColor: 'transparent',
  },

  transparentButton: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  transparentBtnTitle: {
    color: 'white',
    opacity: 0.7,
  },

  disabledButton: {
    opacity: 0.5,
    backgroundColor: 'transparent',
  },

  loader: {
    width: 30,
    height: 30
  },

  // TODO(fj) remove when All Buttons are refactored
  button: {
    height: 60,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 30,
    alignItems: 'center',
    flexDirection:'row'
  },
  title: {
    fontSize: FONT_SCALE * 20,
    textAlign: 'center',
    fontFamily: 'agile-medium',
    color: 'rgba(65,86,166,1)'
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

export default CelButtonStyle;
