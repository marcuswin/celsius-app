import { getThemedStyle } from '../../../utils/styles-util';


const base = {
  coinCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  addMoreCoinsGrid: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    width: '46%',
    height: '18%',
    borderColor: 'gray',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },

  addMoreCoinsList: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    width: '100%',
    height: '10%',
    borderColor: 'gray',
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  coinsTextGrid: {
    marginTop: '35%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between'

  },

  coinsTextList: {
    marginTop: '15%',
    alignItems: 'center',
    alignContent: 'center',
    // justifyContent: 'space-between'
  }
}

const themed = {
  light: {
  },

  dark: {
  },

  celsius: {
  }
}

const WalletLandingStyle = () => getThemedStyle(base, themed);

export default WalletLandingStyle
