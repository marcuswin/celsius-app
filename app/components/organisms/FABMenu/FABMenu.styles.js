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
        justifyContent: 'flex-end',
        paddingBottom: 150
    },
    menuItemsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30
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