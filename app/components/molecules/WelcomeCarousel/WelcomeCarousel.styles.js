import { Dimensions, StyleSheet } from "react-native";
import { FONT_SCALE, STYLES } from "../../../config/constants/style";

const SCREEN_WIDTH = Dimensions.get("window").width;
// const SCREEN_HEIGHT = Dimensions.get("window").height;

const WelcomeCarouselStyle = StyleSheet.create({

    scrollPage: {
      width: SCREEN_WIDTH - 80,
      // height: SCREEN_HEIGHT -
    },
    screen: {
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontFamily: 'agile-bold',
      fontWeight: "800",
      fontSize: FONT_SCALE * 42,
      color: '#FFFFFF',
      textAlign: 'center',
      lineHeight: 40,
    },
    title2: {
      fontFamily: 'agile-bold',
      fontWeight: "800",
      fontSize: FONT_SCALE * 42,
      color: STYLES.WHITE_TEXT_COLOR,
      textAlign: 'center',
      lineHeight: 40,
      paddingBottom: 10,
    },
    image: {
      width: 250,
      height: 150,
    },
    smallDescription: {
      fontFamily: 'agile-bold',
      fontWeight: "500",
      fontSize: FONT_SCALE * 16,
      color: '#88A2C7',
      paddingBottom: 19,
      lineHeight: 25,
    },
    largeDescription: {
      fontFamily: 'agile-light',
      fontWeight: "300",
      fontSize: FONT_SCALE * 18,
      color: STYLES.WHITE_TEXT_COLOR,
      textAlign: 'center',
    },
    circle: {
      // position: 'absolute',
      // left: (SCREEN_WIDTH - 80)/2,
      margin: 12,
      width: 8,
      height: 8,
      borderRadius: 8/2,
      backgroundColor: 'rgba(255,255,255,0.2)',
    },
    circleActive: {
      margin: 12,
      width: 8,
      height: 8,
      borderRadius: 8/2,
      backgroundColor: 'rgba(255,255,255,0.6)',
    },
    circleWraper: {
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 10,
    },
    circleHighlight: {
      width: 8,
      height: 8,
      borderRadius: 8/2,
      backgroundColor: '#FFFFFF',
    },
});

export default WelcomeCarouselStyle;
