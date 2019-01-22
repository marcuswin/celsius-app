import { Dimensions } from 'react-native';

import { getThemedStyle } from '../../../utils/styles-util';

const { width, height } = Dimensions.get('window');

const base = {
    container: {
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    menuContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width,
        height,
    },
    menuItemsContainer: {  
        flexDirection: 'row',
    },
    fabButtonStyle: {
        width: 60,
        height: 60,
        backgroundColor: "rgba(65,86,166,1)",
        borderRadius: 60,
        justifyContent: 'center'
    },
    logo: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center'
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

const FabMenuStyle = (theme) => getThemedStyle(theme, base, themed);

export default FabMenuStyle