import { getThemedStyle, heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";

const cursorRadius = heightPercentageToDP("1.06%");
const width = widthPercentageToDP("100%");

const base = {
  cursor: {
    width: cursorRadius * 2,
    height: cursorRadius * 2,
    borderRadius: cursorRadius,
    borderColor: "#367BE2",
    borderWidth: 1.5,
    backgroundColor: "white",
    // justifyContent: "center",
    // alignItems: "center"
  },
  circle: {
    width: cursorRadius,
    height: cursorRadius,
    borderRadius: cursorRadius / 2,
    backgroundColor: "#367BE2",
    position: "absolute",
    top: "20%",
    left: "20%"
  },
  pointer: {
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    backgroundColor: "rgba(61,72,83,1)",
    borderRadius: 6,
    width: widthPercentageToDP("21.33%"),
    height: heightPercentageToDP("3.1%"),
    justifyContent: "center",
    alignItems: "center"
  },
  labelText: {
    fontFamily: "barlow-regular",
    color: "white"
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: widthPercentageToDP("1.5%"),
    borderRightWidth: widthPercentageToDP("1.5%"),
    borderBottomWidth: widthPercentageToDP("1.5%"),
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "rgba(61,72,83,1)",
    transform: [
      { rotate: "180deg" }
    ]
  },
  xValues : {
    width,
    height: heightPercentageToDP("5%"),
    flexDirection: "row"
  },
  active: {
    width: widthPercentageToDP("3.5%"),
    borderTopColor: "rgba(65,86,166,1)",
    borderTopWidth: 1
  },
  periods: {
    width,
    height: heightPercentageToDP("5%"),
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: widthPercentageToDP("5.33%"),
    paddingRight: widthPercentageToDP("5.33%"),
    marginTop: heightPercentageToDP("2.02%")
  },
  scrollPointer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
}

const themed = {
    light: {
    },

    dark: {
    },

    celsius: {
    }
}

const GraphStyle = () => getThemedStyle(base, themed);

export default GraphStyle
