import { StyleSheet, Dimensions } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

const width = Dimensions.get('window').width;


const CryptoForPeopleStyle = StyleSheet.create({

  titleText: {
    fontFamily: 'agile-bold',
    fontWeight: '500',
    fontSize: FONT_SCALE * 21,
    textAlign: 'left',
    color: 'rgba(61,72,83,1)',
    marginBottom: 30,
    marginLeft: 36,
    marginRight: 36
  },
  explanationText: {
    fontFamily: 'agile-light',
    fontWeight: '200',
    fontSize: FONT_SCALE * 18,
    textAlign: 'left',
    color: 'rgba(61,72,83,1)',
    marginBottom: 20,
    marginLeft: 36,
    marginRight: 36
  },
  video: {
    marginBottom: 30,
    alignItems: 'center'
  },
  WebViewContainer: {
    width,
    height: 210
  }
});

export default CryptoForPeopleStyle;
