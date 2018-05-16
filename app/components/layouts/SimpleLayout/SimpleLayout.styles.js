import {Dimensions, StyleSheet} from 'react-native';
// import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const { height } = Dimensions.get('window');

const SimpleLayoutStyle = StyleSheet.create({
  content: {
    paddingTop: 10,
    height: height - 87 - 50,
  },
});

export default SimpleLayoutStyle;
