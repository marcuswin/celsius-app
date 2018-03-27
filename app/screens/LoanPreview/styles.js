import { StyleSheet } from 'react-native';
import {FONT_SCALE} from "../../config/constants/style";

const LoanPreviewStyle = StyleSheet.create({
  content: {
    paddingLeft: 40,
    paddingRight: 40
  },
  wrapper: {
    paddingTop: 36,
    paddingBottom: 36,
  },
  description: {
    color: '#3D4853',
    fontSize: FONT_SCALE * 18,
    fontFamily: 'agile-extra-light'
  },
  amountTextPercent: {
    color: '#C8C8C8',
    fontFamily: 'agile-light'
  },
  iconDescription: {
    marginTop: 9,
    textAlign: 'center',
    color: '#3D4853',
    fontSize: FONT_SCALE * 14,
    fontFamily: 'agile-extra-light'
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(200,200,200,0.3)'
  },
  iconWrapper: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2, elevation: 3
  },
  pdfWrapper: {
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 90,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2, elevation: 3
  }
});

export default LoanPreviewStyle;
