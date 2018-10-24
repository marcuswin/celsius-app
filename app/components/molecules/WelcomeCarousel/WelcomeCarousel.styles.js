import { Dimensions, StyleSheet } from "react-native";
import { FONT_SCALE, STYLES } from "../../../config/constants/style";

const SCREEN_WIDTH = Dimensions.get("window").width;

const WelcomeCarouselStyle = StyleSheet.create({

    scrollPage: {
      width: SCREEN_WIDTH - 80,
      alignItems: 'center'
    },
    title: {
      fontFamily: 'agile-extra-bold',
      fontSize: FONT_SCALE * 42,
      color: '#FFFFFF',
      textAlign: 'center',
      lineHeight: 43,
      marginTop: 40
    },
    image: {
      width: 250,
      height: 150,
    },
    smallDescription: {
      fontFamily: 'agile-bold',
      fontSize: FONT_SCALE * 16,
      color: '#88A2C7',
      marginBottom: 19,
      lineHeight: 25,
      textAlign: 'center',
    },
    largeDescription: {
      fontFamily: 'agile-light',
      fontSize: FONT_SCALE * 18,
      color: STYLES.WHITE_TEXT_COLOR,
      textAlign: 'center',
    },
    circle: {
      margin: 12,
      width: 8,
      height: 8,
      borderRadius: 8/2,
      backgroundColor: 'rgba(255,255,255,1)',
    },
    circleWrapper: {
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: "center",
      position: 'absolute',
      left : (SCREEN_WIDTH - 80)/2 - 48,
      top: 160
    },
});

export default WelcomeCarouselStyle;
