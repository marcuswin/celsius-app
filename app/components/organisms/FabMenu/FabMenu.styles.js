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
        marginBottom: 30,
    },
    head: {
        opacity: 0.90,
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        paddingTop: '60%'
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