import { StyleSheet, Dimensions } from "react-native";
import { FONT_SCALE } from "../../../config/constants/style";

const { width } = Dimensions.get("window");

const TwoFaAuthorizationStyle = StyleSheet.create({
  wrapper: {
    flexDirection: "column"
  },
  heading:  {
    textAlign: "left",
    marginTop: 25
  },
  imageTextWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30
  },
  image: {
    height: width / 3.5,
    width: width / 3.5
  },
  textWrapper: {
    width: 170,
    minHeight: 100,
    padding: 10
  },
  imageText: {
    fontSize: FONT_SCALE * 16,
    textAlign: "left"
  }
});

export default TwoFaAuthorizationStyle;
