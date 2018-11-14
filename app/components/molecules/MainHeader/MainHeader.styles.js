import { StyleSheet, Platform } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";
import { heightPercentageToDP } from "../../../utils/scale";

const HeaderStyle = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    paddingRight: 20,
    paddingLeft: 20,
    borderBottomColor: 'transparent',
    elevation: 0,
    // height: Platform.OS === "ios" ? 0 : heightPercentageToDP("10%"),
    paddingTop: Platform.OS === "ios" ? 0 : heightPercentageToDP("4.8%")
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
    opacity: 0.8,
    fontSize: FONT_SCALE * 20,
    fontFamily: 'agile-medium',
  },
  logo: {
    width: 30,
    height: 30,
    opacity: 0.6,
  },
});

export default HeaderStyle;
