import React, { Component } from "react";
import { Text, TouchableOpacity, View, Platform, Image, Clipboard, Linking } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QRCode from "react-native-qrcode";

import * as appActions from "../../../redux/actions";
import TwoFaAuthAppConfirmationStyle from "./TwoFaAuthAppConfirmation.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import { FONT_SCALE, GLOBAL_STYLE_DEFINITIONS as globalStyles, STYLES } from "../../../config/constants/style";
import Icon from "../../atoms/Icon/Icon";
import CelButton from "../../atoms/CelButton/CelButton";
import Separator from "../../atoms/Separator/Separator";

@connect(
  state => ({
    user: state.user.profile,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TwoFaAuthAppConfirmation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secretLoaded: false,
      secret: null,
      isPressed: false
    };
    // binders
  }

  async componentDidMount() {
    const {navigation, actions} = this.props;

    const pin = navigation.getParam("pin");

    const secret = await actions.getTwoFactorSecret(pin);

    if (secret) {
      this.setState({
        secret,
        secretLoaded: true,
      })
    }
  }

  // lifecycle methods
  componentWillReceiveProps() {

  }

  /**
   * @param {string} secret
   * @return {string}
   */
  getQRCode = secret => `otpauth://totp/Celsius?secret=${secret}&issuer=Celsius`;

  copyTwoFactorSecret = () => {
    const { actions } = this.props;
    const { secret, secretLoaded } = this.state;

    if (secretLoaded) {
      actions.showMessage("success", "Secret copied to clipboard!");

      Clipboard.setString(secret);
    }
  };

  // event hanlders
  // rendering methods
  render() {
    const { actions } = this.props;
    const { secret, secretLoaded } = this.state;

    const logoutButton = () => (

      <TouchableOpacity onPress={actions.logoutUser}>
        <Text style={[{
          color: "white",
          paddingLeft: 5,
          textAlign: "right",
          opacity: 0.8,
          marginTop: 2,
          fontSize: FONT_SCALE * 18,
          fontFamily: "agile-medium"
        }]}>Log out</Text>
      </TouchableOpacity>
    );

    return (
      <SimpleLayout
        mainHeader={{ backButton: true, right: logoutButton() }}
        animatedHeading={{ text: "Auth App" }}
        background={STYLES.GRAY_1}
        bottomNavigation
      >

        <View style={TwoFaAuthAppConfirmationStyle.wrapper}>
          <Text style={TwoFaAuthAppConfirmationStyle.text}>Scan the QR code or enter the code manually in your auth app.</Text>

          <View style={TwoFaAuthAppConfirmationStyle.qrCodeBackground}>
            <View style={TwoFaAuthAppConfirmationStyle.qrCodeWrapper}>
              {secretLoaded && <QRCode
                value={this.getQRCode(secret)}
                size={141}
                bgColor='black'
                fgColor='white'
              />}
            </View>
          </View>

          <View style={TwoFaAuthAppConfirmationStyle.box}>
            <View style={TwoFaAuthAppConfirmationStyle.addressWrapper}>
              {secretLoaded && <Text onPress={() => Linking.openURL(this.getQRCode(secret))} style={TwoFaAuthAppConfirmationStyle.address}>{secret}</Text>}
            </View>


            <TouchableOpacity
              onPress={this.copyTwoFactorSecret}
              style={TwoFaAuthAppConfirmationStyle.button}
            >
              <View style={TwoFaAuthAppConfirmationStyle.icon}>
                {Platform.OS === "ios" ? (<Icon
                  style={{ marginTop: 15, marginRight: 5 }}
                  name='CopyIcon'
                  width='20' height='20'
                  fill='rgba(61,72,83,0.3)'
                />) : null}
                <Text
                  style={TwoFaAuthAppConfirmationStyle.copy}
                >
                  Copy
                </Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>

          <CelButton
            onPress={() => actions.navigateTo('TwoFaAuthAppConfirmationCode')}
            disabled={!secretLoaded}
            margin={"40 40 0 40"}
          >
            Continue
          </CelButton>

        <Separator
          margin={"30 0 30 0"}
        />

        <View style={TwoFaAuthAppConfirmationStyle.imageTextWrapper}>
          <Image resizeMode={"contain"}
                 style={TwoFaAuthAppConfirmationStyle.image}
                 source={require("../../../../assets/images/Group_232-3x.png")}/>
          <View style={TwoFaAuthAppConfirmationStyle.textWrapper}>
            <Text style={[globalStyles.normalText, TwoFaAuthAppConfirmationStyle.imageText]}>
              We recommend you install an auth app (e.g. Authy, Google Authenticator) <Text style={[globalStyles.boldText]}>on another device</Text>, to make it more secure.
            </Text>
          </View>
        </View>



      </SimpleLayout>
    );
  }
}

export default TwoFaAuthAppConfirmation;
