import { Dimensions, StyleSheet } from "react-native";
import {FONT_SCALE, COLORS} from "../../../config/constants/style";

const {width} = Dimensions.get('window');

const ReferralModalStyle = StyleSheet.create({
  box: {
    width: 0.8 * width - 180,
    height: 95,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 35,
    marginLeft: 'auto',
    marginRight: 'auto',

  },
  linkWrapper: {
    width: 200,
    height: 47,
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(137,144,153,0.15)',
    borderColor: 'rgba(137,144,153,0.15)',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  link: {
    fontSize: FONT_SCALE * 16,
    color: COLORS.blue,
    textAlign: 'center',
    fontFamily: 'inconsolata-regular',
    paddingTop: 5,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 5
  },
  boxButtonsWrapper: {
    // flex: 1,
    flexDirection: 'row',
    height: 47,
    borderColor: 'rgba(137,144,153,0.15)',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderWidth: 1,
  },
  buttons: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 100,
    height: 47
  },
  buttonTextWrapper: {
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
  },
  buttonsText: {
    fontFamily: 'agile-book',
    fontSize: FONT_SCALE * 16,
    textAlign: 'center',
    color: '#899099',
    paddingTop: 13,
    paddingLeft: 8,
    marginLeft: 5
  },
});

export default ReferralModalStyle;
