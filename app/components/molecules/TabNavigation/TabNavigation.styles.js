import { StyleSheet } from 'react-native';
import { COLORS, FONT_SCALE } from "../../../config/constants/style";

const textStyles = {
  fontFamily: 'agile-light',
  fontSize: FONT_SCALE * 16,
  lineHeight: FONT_SCALE * 23,
  textAlign: 'center',
}
const tabStyles = {
  marginLeft: 12,
  marginRight: 12,
  borderBottomWidth: 4,
  height: FONT_SCALE * 57,
  alignItems: 'center',
  justifyContent: 'center',
}

const TabNavigationStyle = StyleSheet.create({
  activeTab: {
    ...tabStyles,
    borderColor: COLORS.blue,
  },
  inactiveTab: {
    ...tabStyles,
    borderColor: 'transparent',
  },
  activeText: {
    ...textStyles,
    color: COLORS.blue,
  },
  inactiveText: {
    ...textStyles,
    color: COLORS.grey,
  },
  tabs: {
    height: FONT_SCALE * 57,
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TabNavigationStyle;
