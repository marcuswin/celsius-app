import { StyleSheet } from 'react-native';
import { getThemedStyle } from '../../../utils/styles-util';

const base = {
    container: {
        flex: 1
    },
    camera: {
        position: 'absolute',
        ...StyleSheet.absoluteFill
    },
    flipCameraImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        alignSelf: 'flex-end'
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

const CameraScreenStyle = () => getThemedStyle(base, themed);

export default CameraScreenStyle