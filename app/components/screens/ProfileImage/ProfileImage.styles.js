import { Dimensions, StyleSheet } from "react-native";
import {FONT_SCALE} from "../../../config/constants/style";

const SCREEN_WIDTH = Dimensions.get("window").width;

const ProfileImageStyle = StyleSheet.create({

  content: {
    marginBottom: 140,
    marginTop: 100,
  },
  link: {
    fontSize: FONT_SCALE * 20,
    color: '#88A2C7',
    fontFamily: 'agile-light',
  },
  text: {
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'agile-light',
  },
  collection: {
    justifyContent: 'space-between'
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
    width: SCREEN_WIDTH / 4 - 8,
    height: SCREEN_WIDTH / 4 - 8,
    borderRadius: (SCREEN_WIDTH / 4 - 8) / 2,
    backgroundColor: 'white',
  },
  image: {
    width: SCREEN_WIDTH / 4 - 16,
    height: SCREEN_WIDTH / 4 - 16,
    borderRadius: (SCREEN_WIDTH / 4 - 16) / 2,
  },
});

export default ProfileImageStyle;


