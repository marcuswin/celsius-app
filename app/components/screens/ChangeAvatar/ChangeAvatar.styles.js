// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
        flex: 1
    },
    imageBorder: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: 'white'
    },
    imageWrapper: {
        
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

const ChangeAvatarStyle = () => getThemedStyle(base, themed);

export default ChangeAvatarStyle