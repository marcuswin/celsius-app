import { Dimensions } from "react-native";
import STYLES from '../../../constants/STYLES';
// import {STYLES} from "../../config/constants/style";
import { getThemedStyle } from '../../../utils/styles-util';


const SCREEN_WIDTH = Dimensions.get("window").width;

const smallImageSize = SCREEN_WIDTH / 4 - 8;

const base = {
    container: {
        flex: 1
    },
    imageBorder: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignContent: 'flex-start',
        alignItems: 'center',
        
    },
    imageWrapper: {
        width: smallImageSize,
        height: smallImageSize,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
      },
      activeImage: {
        borderColor: STYLES.COLORS.GREEN,
        width: smallImageSize ,
        height: smallImageSize,
        
      },
      image: {
        width: smallImageSize,
        height: smallImageSize,
        borderRadius: (smallImageSize) / 2,
      },
      avatar: {
          paddingLeft: 20,
          paddingTop: 20,
      },
      button: {
          paddingTop: 30
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