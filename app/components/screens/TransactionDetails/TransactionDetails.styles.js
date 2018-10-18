import { Dimensions, StyleSheet } from "react-native";
import {FONT_SCALE} from "../../../config/constants/style";

const { width } = Dimensions.get('window');

const TransactionDetailsStyle = StyleSheet.create({
  inputWrapper: {
    width,
    height: 170,
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.2,
  },
  amount: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 36,
    height: 170,
  },
  amountStatus: {
    flexDirection: 'row',
  },
  fiatAmount: {
    backgroundColor: 'white',
    fontSize: FONT_SCALE * 36,
    fontFamily: 'agile-medium',
    // marginLeft: 36,
    textAlign: 'center',
    marginBottom: 5,
    // marginTop: 50,
    color: '#3D4853'
  },
  hippoInfoWrapper: {
    marginHorizontal: 36,
    marginVertical: 20,
  },
  cryptoAmount: {
    fontFamily: "agile-light",
    margin: "auto",
    color: "rgba(61,72,83,1)",
    fontSize: FONT_SCALE * 14,
    textAlign: "left",
    // marginLeft: 36,
    marginBottom: 17
  },
  infoDetail: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 30,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'space-between'
  },
  text: {
    fontFamily: 'agile-bold',
    fontSize: FONT_SCALE * 18,
    color: "rgba(61,72,83,1)",
  },
  info: {
    fontFamily: 'agile-light',
    fontSize: FONT_SCALE *  18,
    color: "rgba(61,72,83,1)",
  },
  infoWithdrawn: {
    fontFamily: 'agile-bold',
    fontSize: FONT_SCALE * 18,
    color: "rgba(239,70,26,1)",
  },
  infoInProgress: {
    fontFamily: 'agile-bold',
    fontSize: FONT_SCALE * 18,
    color: "rgba(225,159,48,1)",
  },
  infoReceived: {
    fontFamily: 'agile-bold',
    fontSize: FONT_SCALE * 18,
    color: "rgba(79,184,149,1)",
  },
  imageWrapper: {
    position: 'absolute',
    top: 60,
    right: 30,
  },
  coinType: {
    width: 55,
    height: 55,
  },
  iconBackground: {
    width: 32,
    height: 32,
    borderRadius: 32/2,
    backgroundColor: 'white',
    position: 'absolute',
    top: 30,
    left: 26,
    justifyContent: 'center',
    alignItems: 'center'
  },
  linkWrapper: {
    flexDirection: 'row',
  },
  link: {
    fontFamily: 'agile-light',
    fontSize: FONT_SCALE * 14,
    color: "rgba(65,86,166,1)",
  },
  interestValueTextWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TransactionDetailsStyle;
