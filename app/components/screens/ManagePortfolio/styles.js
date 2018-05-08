import { Dimensions, StyleSheet } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

const { height } = Dimensions.get('window');

const HomeStyle = StyleSheet.create({
  content: {
    height: height - 220,
    paddingLeft: 40,
    paddingRight: 40,
  },
  subHeading: {
    color: 'rgba(61,72,83,1)',
    fontFamily: 'agile-medium',
    fontSize: FONT_SCALE * 21
  },
  description: {
    marginTop: 10,
    color: '#3D4853',
    fontSize: FONT_SCALE * 18,
    fontFamily: 'agile-extra-light',
  },
  buttonWrapper: {
    marginTop: 70,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    height: 280,
  },
  linkButtonText: {
    color: 'rgba(136,162,199,1)',
    fontSize: FONT_SCALE * 16,
    fontFamily: 'agile-medium'
  },
  linkButton: {
    marginTop: 20
  },
});

export default HomeStyle;