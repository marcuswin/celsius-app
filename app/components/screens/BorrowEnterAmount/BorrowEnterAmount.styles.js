import { Platform } from 'react-native'
import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from "../../../utils/styles-util";

const base = {
  coinIconWrapper: {
    width: 40,
    position: 'absolute',
    height: '100%',
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  coinTextWrapper: {
    position: 'absolute',
    right: 0,
    height: '100%',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: 'auto',
    alignItems: 'center',
    borderRadius: 8,
    ...Platform.select({
      android: {
        borderColor: '#E9E9E9',
        borderTopWidth: 0.2,
        borderLeftWidth: 0.2,
        borderRightWidth: 0.5,
        borderBottomWidth: 2
      },
      ios: {
        ...STYLES.SHADOW_STYLES
      }
    }),
    paddingHorizontal: 10,
    marginBottom: 5
  },
};

const themed = {
  light: {
    selectWrapper: {
      backgroundColor: STYLES.COLORS.WHITE
    }
  },

  dark: {
    selectWrapper: {
      backgroundColor: STYLES.COLORS.DARK_HEADER,
      ...Platform.select({
        android: {
          borderColor: 'transparent',
        },
      })
    }
  },

  celsius: {
    selectWrapper: {
      backgroundColor: STYLES.COLORS.WHITE
    }
  }
};

const BorrowEnterAmountStyle = () => getThemedStyle(base, themed);

export default BorrowEnterAmountStyle;
