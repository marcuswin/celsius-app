import { StyleSheet } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

const InfoBubbleStyle = StyleSheet.create({
  infoWrapper: {
    borderRadius: 8,
    padding: 15,
    marginTop: 22,
    marginBottom: 25,
  },
  infoText: {
    color: '#FFFFFF',
    fontFamily: 'agile-medium',
    fontSize: FONT_SCALE * 15,
    fontWeight: '300',
    lineHeight: 18,
  },

});

export default InfoBubbleStyle;
