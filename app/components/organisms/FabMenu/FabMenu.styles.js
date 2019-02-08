import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
    },
    menuContainer: {
        justifyContent: 'flex-end',
        paddingBottom: 80
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

const FabMenuStyle = () => getThemedStyle(base, themed);

export default FabMenuStyle