import { StyleSheet, Dimensions } from 'react-native';


const {width} = Dimensions.get("window");

const TwoFaAuthSuccessStyle = StyleSheet.create({
  image: {
    marginTop: 70,
    height: width / 3,
    width: width / 3
  },
});

export default TwoFaAuthSuccessStyle;
