import { getThemedStyle } from '../../../utils/styles-util';


const base = {
    coinCardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    addMoreCoins: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        width: '50%',
        height: '18%',
        borderColor: 'gray',
        marginTop: 5
 
    },
    coinsText: {
        marginTop: '35%',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between'
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