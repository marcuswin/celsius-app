import { StyleSheet, Dimensions } from 'react-native';
import { STYLES } from "../../../config/constants/style";

const {width, height} = Dimensions.get('window');

const ComplianceStyle = StyleSheet.create({
  background: {
    height,
    width,
    backgroundColor: STYLES.GRAY_1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: width/2,
    height: width/2 * 0.96,
  },
  header: {
    textAlign: 'center',
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20
  },
  explanation: {
    textAlign: 'center',
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20
  }
});

export default ComplianceStyle;
