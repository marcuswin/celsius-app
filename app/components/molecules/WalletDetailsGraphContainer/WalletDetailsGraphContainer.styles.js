import { StyleSheet } from 'react-native';
import { FONT_SCALE } from "../../../config/constants/style";

const WalletDetailsGraphContainerStyles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    paddingLeft: 36,
    paddingRight: 36,
    paddingTop: 14,
    paddingBottom: 14,
    marginBottom: 16,
    width: '100%',
  },
  coinAmount: {
    fontSize: FONT_SCALE * 14,
    fontFamily: 'agile-book',
    color: '#181C21',
    fontWeight: '100',
  },
  periodButton: {
    backgroundColor: '#D8DADD',
    borderRadius: 17,
    paddingLeft: 20,
    paddingRight:20,
    paddingTop: 7.5,
    paddingBottom: 7.5,
    marginLeft: 5,
    marginRight: 5,
  },
  periodButtonText: {
    color: 'white',
    fontFamily: 'agile-book',
  },
  graphDataWrapper: {
    marginTop: 30,
    marginBottom: 30,
  },
  buttonsWrapper: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default WalletDetailsGraphContainerStyles;
