import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from "../../../utils/scale";
import {normalize} from "../../../utils/styles-util";

const SCREEN_WIDTH = Dimensions.get("window").width;

const smallImageSize = SCREEN_WIDTH / 4.9;

const SelectCoinStyle = StyleSheet.create({

  text: {
    marginTop: heightPercentageToDP("3%"),
    fontFamily: 'agile-light',
    textAlign: 'left',
    fontSize: normalize(18),
    color: '#3D4853',
  },
  coinContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: heightPercentageToDP("3%"),
  },
  coinWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: widthPercentageToDP("1.5%"),
    marginRight: widthPercentageToDP("1.5%"),
    marginBottom: heightPercentageToDP("1.21%"),
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
    shadowRadius: 5,
  },
  coinName: {
    marginTop: heightPercentageToDP("2.21%"),
    fontFamily: 'agile-bold',
    color: '#3D4853',
    fontSize: normalize(13),
  },
  amountTextUSD: {
    fontFamily: 'inconsolata-regular',
    color: '#3D4853',
    fontSize: normalize(13),
  },
  amountText: {
    fontFamily: 'inconsolata-regular',
    color: '#899099',
    fontSize: normalize(13),
    marginBottom: heightPercentageToDP("2.21%")
  },
});

export default SelectCoinStyle;
