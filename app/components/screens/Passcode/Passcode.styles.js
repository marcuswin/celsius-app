import { StyleSheet, Dimensions } from 'react-native';
import { FONT_SCALE, STYLES} from "../../../config/constants/style";

const SCREEN_WIDTH = Dimensions.get("window").width;

const imageSize = SCREEN_WIDTH / 2.5;

const PassCodeStyle = StyleSheet.create({
  root: {
    backgroundColor: STYLES.PRIMARY_BLUE,
    paddingBottom: 50,
  },
  text: {
    fontFamily: 'agile-light',
    fontSize: FONT_SCALE * 18,
    marginTop: 20,
    marginBottom: 20,
    color: STYLES.WHITE_TEXT_COLOR,
    textAlign: 'center',
  },
  title: {
    fontFamily: 'agile-extra-bold',
    fontSize: FONT_SCALE * 42,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: imageSize,
    height: imageSize,
    display: 'flex',
    alignSelf: 'center',
  }
});

export default PassCodeStyle;
