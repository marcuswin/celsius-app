import { StyleSheet ,Dimensions} from "react-native";
import { widthPercentageToDP } from "../../../utils/scale";

const { width, height } = Dimensions.get('window');

const AmountInputStyle = StyleSheet.create({
  inputWrapper: {
    width,
    height: 0.2 * height,
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.2,
    alignItems: 'center'
  },
  primaryAmount: {
    backgroundColor: 'white',
    fontSize: 0.05 * height,
    fontFamily: 'agile-book',
    margin: "auto",
    textAlign: 'center',
    marginBottom: 0.015 * height,
    marginTop: 0.015 * height,
    color: '#3D4853'
  },
  secondaryAmount: {
    fontFamily: "agile-light",
    margin: "auto",
    color: "rgba(61,72,83,1)",
    fontSize: 0.02 * height,
    textAlign: "center",
    marginBottom: 0.015 * height,
  },
  separator: {
    marginLeft: 0.25 * width,
    marginRight: 0.25 * width,
    width: 0.5 * width,
    height: 2,
    backgroundColor: 'rgba(200,200,200,0.3)',
    marginBottom: 0.01 * height,
  },
  newBalance: {
    flexDirection: 'row',
  },
  newBalanceText: {
    fontFamily: "agile-light",
    margin: "auto",
    color: "rgba(61,72,83,1)",
    fontSize: 0.02 * height,
    textAlign: "center",
  },
  switchIcon: {
    position: 'absolute',
    right: 35,
    top: 0.1 * height - 18,
  },
  button: {
    width: height * 0.09,
    height: height * 0.09,
    borderRadius: height * 0.09 / 2,
    backgroundColor: "white",
    marginLeft: 17,
    marginRight: 17,
    marginTop: height * 0.01,
    marginBottom: height * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberContent: {
    marginRight: widthPercentageToDP("5.2%"),
    marginLeft: widthPercentageToDP("5.2%"),
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: "agile-light",
    margin: "auto",
    color: "rgba(61,72,83,1)",
    fontSize: height * 0.06,
    textAlign: "center"
  }
});

export default AmountInputStyle;
