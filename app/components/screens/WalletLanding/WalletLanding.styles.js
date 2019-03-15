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
        width: '50%',
        height: '18%',
        borderColor: 'gray',
        marginTop: 5
 
    },
    coinsTextGrid: {
        marginTop: '35%',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between'
    },

    addMoreCoinsList: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        width: '100%',
        height: '10%',
        borderColor: 'gray',
        marginTop: 5,
 
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