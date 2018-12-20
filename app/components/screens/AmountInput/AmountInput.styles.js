import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP } from "../../../utils/scale";

const { width, height } = Dimensions.get('window');

const AmountInputStyle = StyleSheet.create({
  inputWrapper: {
    width,
    height: 0.19 * height,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 2 },
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
  primaryAmountAsterix: {
    fontSize: 0.03 * height,
    opacity: 0.4,
    marginTop: 0.023 * height
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
    width: width * 0.8,
    height: 2,
    backgroundColor: 'rgba(200,200,200,0.3)',
    marginBottom: 0.01 * height,
    alignSelf: 'center'
  },
  newBalance: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 0.01 * height
  },
  newBalanceText: {
    fontFamily: "agile-light",
    margin: "auto",
    color: "rgba(61,72,83,1)",
    fontSize: 0.02 * height,
    textAlign: "center"
  },
  switchIcon: {
    position: 'absolute',
    right: 35,
    top: 0.06 * height - 18
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
    justifyContent: 'center'
  },
  numberContent: {
    marginRight: widthPercentageToDP("5.2%"),
    marginLeft: widthPercentageToDP("5.2%"),
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: "agile-light",
    margin: "auto",
    color: "rgba(61,72,83,1)",
    fontSize: height * 0.06,
    textAlign: "center"
  },
  periodButton: {
    // backgroundColor: '#D8DADD',
    borderRadius: 17,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 7.5,
    paddingBottom: 7.5,
    marginLeft: 5,
    marginRight: 5,
    borderColor: '#899099',
    borderWidth: 1
  },
  periodButtonDisabled: {
    borderRadius: 17,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 7.5,
    paddingBottom: 7.5,
    marginLeft: 5,
    marginRight: 5,
    borderColor: '#899099',
    borderWidth: 1,
    opacity: 0.25
  },
  buttonsWrapper: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  periodButtonText: {
    color: '#899099',
    fontFamily: 'agile-book'
  }
});

export default AmountInputStyle;
