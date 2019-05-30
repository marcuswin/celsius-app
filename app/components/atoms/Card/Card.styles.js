import { Platform } from 'react-native'
import STYLES from '../../../constants/STYLES'

import { getThemedStyle, widthPercentageToDP } from '../../../utils/styles-util'

const base = {
  card: {
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8
  },
  cardBorder: {
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
    })
  },
  full: {
    width: '100%' // -40 because RegularLayout padding is 20 on both sides
  },
  half: {
    width: widthPercentageToDP('50%') - 28 // -28 because RegularLayout padding is 20 and gap between two cards should be 16 so 16/2 = 8
  },
  halfExtra: {
    width: widthPercentageToDP('45%') - 28 // -28 because RegularLayout padding is 20 and gap between two cards should be 16 so 16/2 = 8
  },
  third: {
    width: widthPercentageToDP('26.93%')
  },
  thirdExtra: {
    width: widthPercentageToDP('22.93%')
  }
}

const themed = {
  light: {},

  dark: {},

  celsius: {}
}

const CardStyle = () => getThemedStyle(base, themed)

export default CardStyle
