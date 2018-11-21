import { StyleSheet, Dimensions } from 'react-native';
import { FONT_SCALE, STYLES } from "../../../config/constants/style";

const { width } = Dimensions.get("window")

const TwoFaAuthAppConfirmationStyle = StyleSheet.create({
  text: {
    color: STYLES.GRAY_2,
    fontFamily: 'agile-extra-light',
    marginBottom: 20, marginTop: 20, fontSize: FONT_SCALE * 20
  },
  box: {
    width: 196,
    height: 96,
    borderRadius: 8,
    backgroundColor: 'rgba(61,72,83,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 4
  },
  addressWrapper: {
    width: 200,
    height: 56,
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2
  },
  address: {
    fontSize: FONT_SCALE * 16,
    color: STYLES.PRIMARY_BLUE,
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontFamily: 'inconsolata-regular',
    paddingTop: 5,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 5
  },
  button : {
    borderBottomRightRadius: 8, borderBottomLeftRadius: 8, width: 190,
    height: 40,
    marginBottom: 2,
    justifyContent: 'space-around',
    backgroundColor: STYLES.GRAY_1
  },
  icon: { width: 200,
    height: 49,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  copy: {
    color: "rgba(61,72,83,0.7)",
    textAlign: "center",
    fontFamily: 'agile-book',
    fontSize: FONT_SCALE * 16, marginTop: 15
  },
  wrapper: {
   alignItems: 'center'
  },
  qrCodeBackground: {
    borderRadius: 8,
    height: 151,
    width: 151,
    backgroundColor: 'rgba(61,72,83,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto'
  },
    qrCodeWrapper: {
      borderRadius: 8,
      height: 141,
      width: 141,
      backgroundColor: 'white'
    },
  imageTextWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30
  },
  image: {
    height: width / 3.5,
    width: width / 3.5
  },
  textWrapper: {
    width: 170,
    height: 100,
  },
  imageText: {
    fontSize: FONT_SCALE * 18,
    textAlign: "left"
  }
});

export default TwoFaAuthAppConfirmationStyle;
