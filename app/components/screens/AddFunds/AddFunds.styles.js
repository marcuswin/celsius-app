import { StyleSheet } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

const AddFundsStyle = StyleSheet.create({
  textOne: {
    fontFamily: 'agile-book',
    fontSize: FONT_SCALE * 18,
    textAlign: 'center',
    color: 'white',
  },
  radioWrapper: {
    marginTop: 25,
    marginBottom: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textTwo: {
    fontFamily: 'agile-light',
    fontSize: FONT_SCALE * 14,
    textAlign: 'center',
    color: 'white',
    // marginTop: 20,
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
  qrCode: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  qrBackground: {
    width: 141,
    height: 141,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    width: 200,
    height: 95,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  addressWrapper: {
    width: 200,
    height: 47,
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  address: {
    fontSize: FONT_SCALE * 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'inconsolata-regular',
    paddingTop: 5,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 5
  },
  buttons: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 100,
    height: 47
  },
  boxButtonsWrapper: {
    // flex: 1,
    flexDirection: 'row',
    width: 200,
    height: 47,
  },
  buttonTextWrapper: {
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
  },
  buttonsText: {
    fontFamily: 'agile-book',
    fontSize: FONT_SCALE * 16,
    textAlign: 'center',
    color: 'white',
    paddingTop: 13,
    paddingLeft: 8,
    marginLeft: 5
  },
  secureTransactionsBtn: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    marginBottom: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  alternateAddressWrapper: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.12)',
    borderRadius: 10,
    marginTop: 30,
    marginVertical: 10,
  },
  alternateAddressText: {
    fontFamily: 'agile-light',
    fontSize: FONT_SCALE * 16,
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
});

export default AddFundsStyle;
