import { StyleSheet, Dimensions, Platform } from 'react-native'
import { getThemedStyle } from '../../../utils/styles-util'
import STYLES from '../../../constants/STYLES'

const { height, width } = Dimensions.get('window')
const newWidth = height * (3 / 4)
const widthOffset = -((newWidth - width) / 2)

const base = {
  container: {
    flex: 1
  },
  camera: {
    position: 'absolute',
    ...StyleSheet.absoluteFill,
    ...Platform.select({
      android: {
        left: widthOffset,
        right: widthOffset
      }
    })
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: STYLES.COLORS.WHITE,
    ...Platform.select({
      ios:{
        width: '100%'
      },
      android: {
        
    left: -widthOffset,
    right: -widthOffset
      }
    })
  }
}

const themed = {
  light: {},

  dark: {},

  celsius: {}
}

const CameraScreenStyle = () => getThemedStyle(base, themed)

export default CameraScreenStyle
