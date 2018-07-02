import { StyleSheet } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

const HeaderStyle = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    paddingRight: 20,
    paddingLeft: 20,
    borderBottomColor: 'transparent',
    elevation: 0,
    paddingTop: 30
  },
  headerTitle: {
    color: 'white',
    fontSize: FONT_SCALE * 20,
  },
  backArrow: {
    color: 'white',
    opacity: 0.8
  },
  backButtonText: {
    color: 'white',
    paddingLeft: 5,
    opacity: 0.8,
    marginTop: 3,
    fontSize: FONT_SCALE * 24,
    fontFamily: 'agile-medium',
  },
  logo: {
    width: 30,
    height: 30,
    opacity: 0.6,
  },
});

export default HeaderStyle;
