import { StyleSheet } from 'react-native';
import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const HeaderStyle = StyleSheet.create({
  header: {
    backgroundColor: STYLES.PRIMARY_BLUE,
    paddingRight: 30,
    paddingLeft: 20,
    borderBottomColor: 'transparent',
    elevation: 0,
    height: 70,
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
    paddingLeft: 10,
    opacity: 0.8,
    marginTop: 3
  },
  logo: {
    width: 35,
    height: 35,
    opacity: 0.6,
  },
});

export default HeaderStyle;
