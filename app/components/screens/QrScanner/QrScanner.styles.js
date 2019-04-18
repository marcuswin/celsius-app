import { Dimensions } from "react-native";
import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

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
    color: STYLES.COLORS.WHITE,
    textAlign: 'center',
  },
  scanTitle: {
    marginTop: 10,
    marginHorizontal: 40,
  },
  scanInstructions: {
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
