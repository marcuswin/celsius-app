import { Dimensions, StyleSheet } from "react-native";
import {STYLES} from "../../../config/constants/style";

const SCREEN_WIDTH = Dimensions.get("window").width;

const smallImageSize = SCREEN_WIDTH / 4 - 8;

const ProfileImageStyle = StyleSheet.create({
  text: {
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'agile-light',
  },
  viewWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 7,
    width: smallImageSize,
    height: smallImageSize,
    borderRadius: smallImageSize / 2,
    backgroundColor: 'white',
  },
  imageWrapper: {
    width: smallImageSize,
    height: smallImageSize,
    borderRadius: smallImageSize / 2,
    borderWidth: 3,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: smallImageSize - 20,
    height: smallImageSize - 20,
    borderRadius: (smallImageSize - 20) / 2,
  },
  gif: {
    width: smallImageSize,
    height: smallImageSize,
    borderRadius: smallImageSize / 2,
  },
  activeImage: {
    borderColor: STYLES.PRIMARY_GREEN,
  },
});

export default ProfileImageStyle;


