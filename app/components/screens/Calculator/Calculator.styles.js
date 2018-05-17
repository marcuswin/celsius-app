import { StyleSheet } from 'react-native';
import { FONT_SCALE, STYLES } from "../../../config/constants/style";

const CommonCalculatorStyles = {
  defaultButton: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: STYLES.GRAY_6,
    borderRadius: 8,
    marginTop: 20
  },
  defaultButtonText: {
    fontFamily: 'agile-book',
    marginLeft: 25,
    opacity: 0.7,
    color: STYLES.GRAY_2,
    fontSize: FONT_SCALE * 18
  },
}

const CalculatorStyle = StyleSheet.create({
  content: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  container: {
    paddingTop: 25,
  },
  description: {
    color: STYLES.GRAY_2,
    fontSize: FONT_SCALE * 18,
    fontFamily: 'agile-extra-light',
    paddingBottom: 22,
    fontWeight: "200"
  },
  addButton: {
    ...CommonCalculatorStyles.defaultButton,
  },
  disabledAddButton: {
    ...CommonCalculatorStyles.defaultButton,
    borderColor: 'white',
  },
  addButtonText: {
    ...CommonCalculatorStyles.defaultButtonText,
  },
  disabledAddButtonText: {
    ...CommonCalculatorStyles.defaultButtonText,
    color: 'white',
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
    marginBottom: 40,
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
