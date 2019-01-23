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
        justifyContent: 'space-between',
        marginLeft: 30,
        marginRight: 30
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

const FabMenuStyle = (theme) => getThemedStyle(theme, base, themed);

export default FabMenuStyle