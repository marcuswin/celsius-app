import { StyleSheet } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

const ComingSoonStyle = StyleSheet.create({
  content: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  row: {
    paddingTop: 36
  },
  current: {
    color: 'rgba(168,102,170,1)'
  },
  heading: {
    fontSize: FONT_SCALE * 18,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'agile-book'
  },
  description: {
    fontSize: FONT_SCALE * 16,
    color: 'rgba(61,72,83,1)',
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'agile-extra-light'
  },
  item: {
    width: 120,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3
  }
});

export default ComingSoonStyle;
