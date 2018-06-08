import { StyleSheet ,Dimensions} from "react-native";
import { FONT_SCALE } from "../../../config/constants/style";

const { width } = Dimensions.get('window');

const AmountInputStyle = StyleSheet.create({
  inputWrapper: {
    width,
    height: 170,
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.2,
    alignItems: 'center'
  },
  fiatAmount: {
    backgroundColor: 'white',
    fontSize: FONT_SCALE * 36,
    fontFamily: 'agile-book',
    margin: "auto",
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 35,
    color: '#3D4853'
  },
  cryptoAmount: {
    fontWeight: "300",
    fontFamily: "agile-light",
    margin: "auto",
    color: "rgba(61,72,83,1)",
    fontSize: FONT_SCALE * 14,
    textAlign: "center",
    marginBottom: 17
  },
  separator: {
    // marginLeft: 36,
    // marginRight: 36,
    width: 300,
    height: 2,
    backgroundColor: 'rgba(200,200,200,0.3)',
    marginBottom: 15
  },
  newBalance: {
    flexDirection: 'row',
  },
  newBalanceText: {
    fontWeight: "300",
    fontFamily: "agile-light",
    margin: "auto",
    color: "rgba(61,72,83,1)",
    fontSize: FONT_SCALE * 14,
    textAlign: "center",
  },
  switchIcon: {
    position: 'absolute',
    right: 35,
    top: 50
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: "white",
    marginLeft: 17,
    marginRight: 17,
    marginTop: 17,
    marginBottom: 17,
  },
  numberContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: "300",
    fontFamily: "agile-light",
    margin: "auto",
    color: "rgba(61,72,83,1)",
    fontSize: 44,
    textAlign: "center"
  }
});

export default AmountInputStyle;
