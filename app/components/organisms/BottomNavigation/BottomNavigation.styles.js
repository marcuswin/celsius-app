import { StyleSheet, Dimensions } from 'react-native';

import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const { width } = Dimensions.get('window');

const baseItem = {
  justifyContent: 'center',
  alignItems: 'center',
  width: 0.20 * width,
};

const baseText = {
  fontFamily: 'agile-medium',
  fontSize: FONT_SCALE * 14,
  letterSpacing: 0.17,
  lineHeight: 17,
  textAlign: 'center',
};

const baseCelsius = {
  width: 50,
  height: 50,
  borderColor: 'white',
  borderWidth: 4,
  borderRadius: 25,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: -15,
  marginBottom: 5,
};

const BottomNavigationStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    width,
    backgroundColor: 'rgba(255,255,255,0.82)',

    flexDirection: 'row',

    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemActive: {
    ...baseItem,
    borderTopWidth: 5,
    borderTopColor: STYLES.PRIMARY_BLUE,
    paddingTop: 10,
  },
  itemInactive: {
    ...baseItem,
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconInactive: {
    opacity: 0.5,
  },
  iconActive: {
    opacity: 1,
  },
  textInactive: {
    ...baseText,
    opacity: 0.5,
    color: '#3D4853',
  },
  textActive: {
    ...baseText,
    color: STYLES.PRIMARY_BLUE,
  },
  wallet: {
    width: 0.20 * width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  celsiusActive: {
    ...baseCelsius,
    backgroundColor: STYLES.PRIMARY_BLUE,
  },
  celsiusInactive: {
    ...baseCelsius,
    backgroundColor: 'rgb(197, 200, 203)',
  },
});

export default BottomNavigationStyle;
