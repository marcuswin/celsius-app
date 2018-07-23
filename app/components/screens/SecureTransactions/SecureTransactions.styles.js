import { StyleSheet } from "react-native";
import { FONT_SCALE } from "../../../config/constants/style";

const SecureTransactionsStyle = StyleSheet.create({
  content: { alignItems: "center" },
  title: {
    fontFamily: "agile-bold",
    fontSize: FONT_SCALE * 42,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30
  },
  explanation: {
    fontFamily: "agile-light",
    fontSize: FONT_SCALE * 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30
  },
  suggestion: {
    fontFamily: "agile-light",
    fontSize: FONT_SCALE * 16,
    color: "#fff",
    textAlign: "center",
  },
  suggestionWrapper: {
    backgroundColor: "rgba(255,255,255,0.1)",
    width: "100%",
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 30
  }

});

export default SecureTransactionsStyle;
