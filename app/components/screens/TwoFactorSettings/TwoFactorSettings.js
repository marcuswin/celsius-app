import React, { Component } from 'react';
import { Clipboard, View, Linking, TouchableOpacity } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import QRCode from 'react-qr-code';
import STYLES from "../../../constants/STYLES";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
// import TwoFactorSettingsStyle from './TwoFactorSettings.styles'
import Icon from '../../atoms/Icon/Icon'
import CelButton from '../../atoms/CelButton/CelButton'
import LoadingScreen from '../LoadingScreen/LoadingScreen'

@connect(
  state => ({
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TwoFactorSettings extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  static navigationOptions = () => ({
    title: "Auth App"
  });

  constructor(props) {
    super(props);

    this.state = {
      secretLoaded: false,
      secret: null,
    };
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

  getQRCode = secret => `otpauth://totp/Celsius?secret=${secret}&issuer=Celsius`;

  copyTwoFactorSecret = () => {
    const { actions } = this.props;
    const { secret } = this.state;

    actions.showMessage("success", "Secret copied to clipboard!");

    Clipboard.setString(secret);
  };

  render() {
    const { actions } = this.props;
    const { secret, secretLoaded } = this.state;
    // const style = TwoFactorSettingsStyle();

    if (!secretLoaded) return <LoadingScreen/>

    return (
      <RegularLayout>
        <CelText align='center' type='H4'>
          Scan the QR code or enter the code manually in your auth app.
        </CelText>
          <View style={{marginTop: 20, borderColor: 'rgba(61,72,83,0.1)', borderWidth: 5}}>
            <QRCode
              value={this.getQRCode(secret)}
              size={141}
              bgColor='black'
              fgColor='white'
            />
          </View>

          <View style={{marginTop: 20, borderWidth: 5, borderColor: 'rgba(61,72,83,0.1)', maxWidth: '80%'}}>
            <View style={{backgroundColor: 'rgba(61,72,83,0.1)', padding: 10}}>
              <CelText align='center' style={{color: STYLES.COLORS.CELSIUS, textDecorationLine: 'underline',}} onPress={() => Linking.openURL(this.getQRCode(secret))}>{secret}</CelText>
            </View>
            <View style={{padding: 10}}>
              <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} onPress={this.copyTwoFactorSecret}>
                <Icon
                  name={'CopyIcon'}
                  width='20' height='20'
                  fill='rgba(61,72,83,0.3)'
                />
                <CelText type='H4' margin='0 0 0 10'>Copy</CelText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <CelButton onPress={() => {actions.navigateTo('TwoFaAuthAppConfirmationCode')}}>
              Continue
            </CelButton>
          </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(TwoFactorSettings);
