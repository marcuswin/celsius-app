import { StyleSheet } from 'react-native';
import { FONT_SCALE } from '../../../config/constants/style';

const WithdrawalInfoStyle = StyleSheet.create({
  iconWrapper: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginLeft: 20,
    marginRight: 20
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginTop: 25
  },
  suggestion: {
    fontFamily: "agile-light",
    fontSize: FONT_SCALE * 18,
    color: "#fff",
    textAlign: "center",
  },
  suggestionWrapper: {
    backgroundColor: "rgba(255,255,255,0.1)",
    width: "100%",
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 30,
    marginTop: 30
  }
});

export default WithdrawalInfoStyle;
