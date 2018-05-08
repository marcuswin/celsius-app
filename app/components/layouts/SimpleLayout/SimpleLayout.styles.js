import {Dimensions, StyleSheet} from 'react-native';
// import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const { height } = Dimensions.get('window');

const SimpleLayoutStyle = StyleSheet.create({
  content: {
    paddingLeft: 36,
    paddingRight: 36,
    paddingTop: 10,
    marginBottom: 90,
    height: height - 87 - 50,
  },
});

export default SimpleLayoutStyle;
