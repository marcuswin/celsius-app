import { StyleSheet } from "react-native";
import { FONT_SCALE, GLOBAL_STYLE_DEFINITIONS as globalStyles, STYLES } from "../../../config/constants/style";

const CelApiDropdownStyle = StyleSheet.create({
  normalButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 4,
    height: 48,
    paddingTop: 12,
    paddingLeft: 12
  },
  buttonName: {
    color: STYLES.GRAY_2,
    fontSize: FONT_SCALE * 20,
    fontFamily: "agile-book"
  },
  valueIcon: {
    flexDirection: "row"
  },
  valueIconRight: {
    marginTop: 6,
    marginRight: 6
  },
  largeButton: {
    flexDirection: "row",
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 10,
    width: "100%"
  },
  iconLeft: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    marginLeft: 10
  },
  buttonTextWrapper: {
    flexDirection: "column",
    width: "70%",
    justifyContent: "center"
  },
  activeWrapper: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  activated: {
    fontSize: FONT_SCALE * 16,
    fontFamily: "agile-extra-light",
    color: "rgba(79,184,149,1)"
  },
  titleIcon: {
    flexDirection: "row",
    alignItems: "center"
  },
  largeButtonRightIcon: {
    marginTop: 5
  },
  title: {
    ...globalStyles.heading
  },
  explanation: {
    ...globalStyles.normalText
  },
  value: {
    color: "#899099",
    fontSize: FONT_SCALE * 20,
    marginRight: 5
  },
  expand: {
    backgroundColor: '#fff',
    marginRight: 14,
    marginLeft: 14,
    padding: 14,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8
  }
});

export default CelApiDropdownStyle;
