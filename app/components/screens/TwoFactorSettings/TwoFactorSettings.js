import React, { Component } from 'react';
import { View, Linking } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import QRCode from 'react-qr-code';

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import TwoFactorSettingsStyle from './TwoFactorSettings.styles'
import CelButton from '../../atoms/CelButton/CelButton'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import Card from '../../atoms/Card/Card'
import CopyButton from '../../atoms/CopyButton/CopyButton'
import Separator from '../../atoms/Separator/Separator'

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

  render() {
    const { actions } = this.props
    const { secret, secretLoaded } = this.state
    const style = TwoFactorSettingsStyle()

    if (!secretLoaded) return <LoadingScreen/>

    return (
      <RegularLayout>
        <CelText align='center' type='H4'>
          Scan the QR code or enter the code manually in your auth app.
        </CelText>
        <Card styles={{alignItems: 'center', marginTop: 25}} >
          <QRCode
            value={this.getQRCode(secret)}
            size={141}
            bgColor='black'
            fgColor='white'
          />
          <CelText align='center' style={style.secretText} onPress={() => Linking.openURL(this.getQRCode(secret))}>{secret}</CelText>

          <View style={{paddingVertical: 15, width: '100%'}}>
            <Separator size={2} opacity={0.07} s/>
          </View>
          <CopyButton copyText={secret} onCopy={() => actions.showMessage("success", "Secret copied to clipboard!")}/>
        </Card>

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
