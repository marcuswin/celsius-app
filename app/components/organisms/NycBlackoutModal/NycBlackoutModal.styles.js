import { StyleSheet } from "react-native";
import { STYLES } from "../../../config/constants/style";
import { normalize } from "../../../utils/styles-util";
import { heightPercentageToDP, widthPercentageToDP } from "../../../utils/scale";

const NycBlackoutModalStyle = StyleSheet.create({
  modalWrapper : {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  explanation: {
    color: STYLES.GRAY_2,
    fontSize: normalize(18),
    fontFamily: "agile-extra-light",
    textAlign: 'center',
  },
  image: {
    width: widthPercentageToDP("33%"),
    height: widthPercentageToDP("33%"),
    resizeMode: "contain",
    marginTop: heightPercentageToDP("1.27%")
  },
  heading: {
    color: STYLES.GRAY_2,
    fontFamily: 'agile-bold',
    fontSize: normalize(20),
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  }
});

export default NycBlackoutModalStyle;
