import { StyleSheet } from 'react-native';
import {FONT_SCALE, STYLES} from "../../../config/constants/style";

const CalculatorStyle = StyleSheet.create({
  content: {
    paddingLeft: 40,
    paddingRight: 40
  },
  container: {
    paddingTop: 46
  },
  description: {
    color: '#3D4853',
    fontSize: FONT_SCALE * 18,
    fontFamily: 'agile-extra-light',
    paddingBottom: 22,
    fontWeight: "200"
  },
  addButton: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#C8C8C8',
    borderRadius: 8,
    marginTop: 20
  },
  addButtonText: {
    fontFamily: 'agile-book',
    marginLeft: 25,
    opacity: 0.7,
    color: '#3D4853',
    fontSize: FONT_SCALE * 18
  },
  addBtnColumn: {
    justifyContent: 'center'
  },
  item: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 15,
    elevation: 3
  },
  itemLabel: {
    color: '#3D4853',
    fontSize: FONT_SCALE * 11,
    opacity: 0.7,
    fontFamily: 'agile-book'
  },
  input: {
    fontSize: FONT_SCALE * 36,
    color: '#3D4853',
    fontFamily: 'agile-book'
  },
  submitButtonWrapper: {
    marginTop: 40,
    paddingBottom: 60,
  },
  submitButton: {
    height: 60,
    borderWidth: 2,
    borderColor: STYLES.PRIMARY_BLUE,
    justifyContent: 'center',
    borderRadius: 100
  },
  submitButtonTitle: {
    fontFamily: 'agile-medium',
    color: STYLES.PRIMARY_BLUE,
    textAlign: 'center',
    fontSize: FONT_SCALE * 21
  },
  listItem: {
    borderRadius: 8,
    marginLeft: 0,
    paddingBottom: 5,
    paddingTop: 0,
    paddingRight: 0,
    borderBottomWidth: 0,
    borderColor: 'transparent'
  }
});

export default CalculatorStyle;
