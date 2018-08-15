import { Dimensions, StyleSheet } from "react-native";
import { FONT_SCALE } from "../../../config/constants/style";

const {width} = Dimensions.get('window');

const totalGutterSize = 36 * 2;

const hippoBubbleWidth = width - totalGutterSize;

const HippoBubbleStyle = StyleSheet.create({
  bubbleWrapper: {
    backgroundColor: '#8a9098',
    borderRadius: 15,
    padding: 12,
  },
  bubblePointerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubblePointer: {
    position: 'absolute',
    left: 0.27 * hippoBubbleWidth,
    width: 0.1 * hippoBubbleWidth,
    height: 0.066 * hippoBubbleWidth,
  },
  hippoImageWrapper: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hippoImage: {
    width: hippoBubbleWidth * 0.45,
    height: hippoBubbleWidth * 0.88 * 0.45,
  },
  sideContentWrapper: {
    width: hippoBubbleWidth * 0.55,
    paddingLeft: 12,
  },
  sideContentText: {
    fontSize: FONT_SCALE * 18,
    fontFamily: 'agile-extra-light',
    color: '#3D4853',
  },
  bubbleText: {
    color: 'white',
    fontSize: FONT_SCALE * 18,
    fontFamily: 'agile-extra-light',
  },
});

export default HippoBubbleStyle;
