import { StyleSheet } from "react-native";
import { FONT_SCALE, COLORS } from "../../../config/constants/style";


const ShareCopyStyle = StyleSheet.create({
  box: {
    minHeight: 95,
    borderRadius: 8
  },
  smallbox: {
    width: 200
  },
  largebox: {
    flex: 1
  },
  whitebox: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)'
  },
  bluebox: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)'
  },
  linkWrapper: {
    flex: 1,
    minHeight: 40,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    justifyContent: 'center'
  },
  whitelinkWrapper: {
    borderWidth: 1,
    backgroundColor: 'rgba(137,144,153,0.15)',
    borderColor: 'rgba(137,144,153,0.15)'
  },
  bluelinkWrapper: {},
  link: {
    fontSize: FONT_SCALE * 16,
    textAlign: 'center',
    fontFamily: 'inconsolata-regular',
    paddingTop: 5,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 5,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  whitelink: {
    fontFamily: 'agile-medium'
  },
  bluelink: {
    color: 'white'
  },
  linkBlue: {
    color: COLORS.blue,
  },
  boxButtonsWrapper: {
    flexDirection: 'row',
    height: 47,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderWidth: 1,
  },
  whiteboxButtonsWrapper: { borderColor: 'rgba(137,144,153,0.15)' },
  blueboxButtonsWrapper: { borderColor: 'rgba(137,144,153,0.15)' },
  buttons: {
    height: 47,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bluebuttons: {
    borderRightWidth: 1,
    borderRightColor: "rgba(255, 255, 255, 0.3)"
  },
  whitebuttons: {
    borderRightWidth: 1,
    borderRightColor: "rgba(137,144,153,0.15)"
  },
  smallbuttons: {
    width: 100
  },
  largebuttons: {
    flex: 1
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
    paddingLeft: 8,
    marginLeft: 5
  },
  whitebuttonsText: {
    color: '#899099'
  },
  bluebuttonsText: {
    color: 'white'
  }
});

export default ShareCopyStyle;
