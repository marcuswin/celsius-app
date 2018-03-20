import { StyleSheet } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

const ResizeHeaderStyle = StyleSheet.create({
  titleContainer: {
    flex: 1,
    paddingTop: 40
  },
  subtitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: FONT_SCALE * 42,
    fontFamily: 'agile-bold',
    paddingRight: 40,
    paddingLeft: 40
  },
  navTitle: {
    color: 'white',
    fontSize: FONT_SCALE * 18,
    backgroundColor: 'transparent',
  },
  navTitleView: {
    height: 80,
    opacity: 0,
  },
  backArrow: {
    color: 'white',
    fontSize: FONT_SCALE * 33,
    marginLeft: 5,
    marginRight: 5,
    opacity: 0.8
  },
  backButtonText: {
    color: 'white',
    paddingLeft: 4,
    opacity: 0.8
  },
  title: {
    fontSize: FONT_SCALE * 20,
  },
  name: {
    fontWeight: 'bold',
  },
  columnHeight: {
    height: 30,
    paddingLeft: 20,
  },
  logo: {
    width: 31,
    height: 31,
    alignSelf: 'flex-end',
    marginTop: 5,
    marginRight: 40,
    opacity: 0.8
  },
  description: {
    color: 'rgba(255,255,255,1)',
    fontFamily: 'agile-light',
    fontSize: FONT_SCALE * 18,
    lineHeight: FONT_SCALE * 23
  },
  signUpForm: {
    paddingTop: 30
  },
  formItem: {
    marginLeft: 0,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    borderBottomColor: 'transparent',
    paddingLeft: 18,
    paddingRight: 18,
    height: 60
  },
  formLabel: {
    color: 'rgba(205,226,255,1)'
  },
  submitButtonWrapper: {
    paddingTop: 53,
    paddingBottom: 53,
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    height: 60
  }
});

export default ResizeHeaderStyle;
