import { StyleSheet, Dimensions } from 'react-native';
import device from '../../../utils/device-util';

import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const { height, width } = Dimensions.get('window');

let bottomNavigationHeight;
let paddingBottom;
if (device.isiPhoneX()) {
  bottomNavigationHeight = 87;
  paddingBottom = 30;
} else {
  bottomNavigationHeight = 60;
  paddingBottom = 5;
}

const baseItem = {
  justifyContent: 'center',
  alignItems: 'center',
  width: 0.25 * width,
};

const baseText = {
  fontFamily: 'agile-medium',
  fontSize: FONT_SCALE * 14,
  letterSpacing: 0.17,
  lineHeight: 17,
  textAlign: 'center',
};

const BottomNavigationStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    height: bottomNavigationHeight,
    top: height - bottomNavigationHeight,
    left: 0,
    width,
    backgroundColor: 'rgba(255,255,255,0.82)',

    flexDirection: 'row',

    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.1,
    shadowRadius: 2,

    paddingBottom,
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
});

export default BottomNavigationStyle;
