import { StyleSheet, Dimensions } from "react-native";
import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const SCREEN_WIDTH = Dimensions.get("window").width;

const TermsOfUseStyle = StyleSheet.create({

  content: {
    backgroundColor: STYLES.PRIMARY_BLUE,
  },
  title: {
    textAlign: 'left',
    fontSize: FONT_SCALE * 26,
    fontFamily: 'agile-bold',
    color: STYLES.WHITE_TEXT_COLOR,
    paddingBottom: 20,
  },
  text: {
    textAlign: 'left',
    fontFamily: 'agile-light',
    fontSize: FONT_SCALE * 16,
    color: STYLES.WHITE_TEXT_COLOR,
    paddingBottom: 30,
  },
  button: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    marginBottom: 20,
    width: SCREEN_WIDTH - 80,
  },
  buttonContainer: {
    backgroundColor: STYLES.PRIMARY_BLUE,

  }
});

export default TermsOfUseStyle;
