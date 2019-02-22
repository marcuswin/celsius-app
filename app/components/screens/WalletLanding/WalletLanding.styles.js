import { getThemedStyle } from '../../../utils/styles-util';


const base = {
    coinCardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },

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