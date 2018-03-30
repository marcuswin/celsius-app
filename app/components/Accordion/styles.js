import { StyleSheet } from 'react-native';
import {FONT_SCALE} from "../../config/constants/style";

const AccordionStyle = StyleSheet.create({
  wrapper: {
    marginBottom: 35,
  },
  headerWrapper: {
    marginTop: 20,
    height: 80,
    backgroundColor: '#3D4853',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    paddingLeft: 20,
    paddingRight: 20
  },
  headerText: {
    fontSize: FONT_SCALE * 36,
    color: '#fff',
    fontFamily: 'agile-book'
  },
  expandedWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  expandedContent: {
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    elevation: 3,
    paddingLeft: 10,
    paddingRight: 10,
  },
  expandedText: {
    fontSize: FONT_SCALE * 17,
    color: '#757575',
    fontFamily: 'agile-light',
    textAlign: 'center',
  },
});

export default AccordionStyle;
