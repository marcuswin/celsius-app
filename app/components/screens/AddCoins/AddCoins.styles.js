import { Dimensions, StyleSheet } from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

const SCREEN_WIDTH = Dimensions.get("window").width;

const smallImageSize = SCREEN_WIDTH / 4.9;

const AddCoinsStyle = StyleSheet.create({

  text: {
    marginTop: 30,
    fontFamily: 'agile-light',
    textAlign: 'left',
    fontSize: FONT_SCALE * 18,
    color: '#3D4853',
  },
  explanation: {
    flexDirection: 'row',
    width: 300,
    height: 52,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 3},
    borderRadius: 8,
    marginBottom: 30,
  },
  explanationText: {
    fontSize: FONT_SCALE * 15,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 15,
    fontFamily: 'agile-light',
    color: '#3D4853',
    textAlign: 'left',
  },
  coinContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30,
    marginBottom: 30,
  },
  coinWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coin: {
    justifyContent: 'center',
    alignItems: 'center',
    width: smallImageSize / 1.5,
    height: smallImageSize / 1.5,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: smallImageSize,
    height: smallImageSize,
    borderRadius: smallImageSize / 2,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 5
  },
  coinName: {
    marginTop: 15,
    fontFamily: 'agile-bold',
    color: '#3D4853',
    fontSize: FONT_SCALE * 14,
  },
  coinNameShort: {
    fontFamily: 'agile-light',
    color: '#3D4853',
    fontSize: FONT_SCALE * 14,
    marginBottom: 25,
  },
});

export default AddCoinsStyle;
