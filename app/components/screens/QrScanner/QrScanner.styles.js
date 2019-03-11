// import STYLES from '../../../constants/STYLES';
import { Dimensions } from "react-native";
import { getThemedStyle } from '../../../utils/styles-util';
// import { FONT_SCALE, STYLES } from "../../../config/constants/style";


const { height, width } = Dimensions.get('window');

const base = {
  container: {
    flex: 1
  },
  overlayBackground: {
    position: 'absolute',
    opacity: 0.75,
    width,
    height,
    zIndex: -5,
  },
  overlayContent: {
    width,
    height,
    zIndex: 20,
  },
  scanText: {
    // color: STYLES.WHITE_TEXT_COLOR,
    textAlign: 'center',
  },
  scanTitle: {
    marginTop: 10,
    marginHorizontal: 40,
    fontFamily: 'agile-bold',
    // fontSize: FONT_SCALE * 42,
  },
  scanInstructions: {
    // fontSize: FONT_SCALE * 18,
    paddingHorizontal: 40,
    bottom: 80,
    width,
    position: 'absolute',
  },
}

const themed = {
  light: {
  },

  dark: {
  },

  celsius: {
  }
}

const QrScannerStyle = () => getThemedStyle(base, themed);

export default QrScannerStyle
