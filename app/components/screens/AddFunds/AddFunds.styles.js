import { StyleSheet } from 'react-native';
import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const AddFundsStyle = StyleSheet.create({
  textOne: {
    fontWeight: '300',
    fontFamily: 'agile-book',
    fontSize: FONT_SCALE * 18,
    textAlign: 'center',
    color: 'white',
    marginTop: -10,
  },
  textTwo: {
    fontWeight: '300',
    fontFamily: 'agile-light',
    fontSize: FONT_SCALE * 14,
    textAlign: 'center',
    color: 'white',
    marginTop: 20,
  },
  celsiusLogo: {
    height: 63,
    width: 63,
    borderRadius: 63 / 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    height: 167,
    width: 167,
    borderWidth: 8,
    borderRadius: 10,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  wrapperLogo: {
    height: 62,
    width: 62,
    borderWidth: 8,
    borderRadius: 62/2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: STYLES.PRIMARY_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    top: -35,
    left: 130,
  },
  box: {
    width: 200,
    height: 100,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30
  },
  boxButtons: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10
  },
  qrCode: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  buttonsText: {
    fontWeight: '300',
    fontFamily: 'agile-book',
    fontSize: FONT_SCALE * 18,
    textAlign: 'center',
    color: 'white',
    paddingTop: 13,
    paddingLeft: 8,
    marginLeft: 12
  },
  buttons: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 100,
    height: 45,
  },
  address: {
    fontSize: FONT_SCALE * 17,
    color: 'white',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: 'inconsolata-regular'
  },
  qrBackground: {
    width: 141,
    height: 141,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTextWrapper: {
    flexDirection: 'row',
    marginRight: 10,
  }
});

export default AddFundsStyle;
