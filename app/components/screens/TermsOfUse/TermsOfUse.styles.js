import { StyleSheet } from "react-native";
import {FONT_SCALE, STYLES} from "../../../config/constants/style";

// const SCREEN_WIDTH = Dimensions.get("window").width;

const TermsOfUseStyle = StyleSheet.create({

  content: {
    backgroundColor: STYLES.PRIMARY_BLUE,
  },
  title: {
    textAlign: 'left',
    fontSize: FONT_SCALE * 26,
    fontFamily: 'agile-bold',
    fontWeight: "800",
    color: STYLES.WHITE_TEXT_COLOR,
    paddingBottom: 20,
  },
  text: {
    textAlign: 'left',
    fontFamily: 'agile-light',
    fontWeight: "300",
    fontSize: FONT_SCALE * 16,
    color: STYLES.WHITE_TEXT_COLOR,
    paddingBottom: 30,
  },
  button: {
    // position: 'absolute',
    // width:  SCREEN_WIDTH - 72,
    margin: 30,
  }
});

export default TermsOfUseStyle;
