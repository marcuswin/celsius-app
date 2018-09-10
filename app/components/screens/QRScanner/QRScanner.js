import React, {Component} from 'react';
import PropTypes from "prop-types";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import { BarCodeScanner, Permissions } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import * as appActions from "../../../redux/actions";
import { MainHeader } from "../../molecules/MainHeader/MainHeader";

import QRScannerStyle from './QRScanner.styles';

const ScanOverlayBackground = () => (
  <Image resizeMode="cover" source={require('../../../../assets/images/camera-mask-qr.png')} style={QRScannerStyle.overlayBackground} />
);

const ScanOverlayContent = ({children}) => (
  <View style={QRScannerStyle.overlayContent}>
    {children}
  </View>
);

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class QRScannerScreen extends Component{
  static propTypes = {
    formField: PropTypes.string,
    onScan: PropTypes.func,
  };

  static defaultProps = {
    formField: 'lastQRScan',
  };

  state = {
    hasCameraPermission: null,
    handleBarCodeRead: undefined,
  };

  async componentWillMount() {
    let permission = await Permissions.getAsync(Permissions.CAMERA);

    if (permission.status !== 'granted') {
      permission = await Permissions.askAsync(Permissions.CAMERA);
    }

    this.setState({ hasCameraPermission: permission.status === 'granted', handleBarCodeRead: this.handleBarCodeRead, });
  }

  handleBarCodeRead = async ({ data }) => {
    const { actions, formField, navigation } = this.props;

    this.setState({ handleBarCodeRead: undefined, });

    const onScan = navigation.getParam('onScan');

    // scanning metamask address -> 'ethereum:0x...'
    let address = data.indexOf(':') === -1 ? data : data.split(':')[1];
    address = address.trim();

    if (onScan) {
      onScan(address);
    } else {
      actions.updateFormField(formField, address);
    }

    actions.navigateBack();
  };

  renderScanner = () => {
    const { hasCameraPermission} = this.state;
    const { navigation } = this.props;

    const scanTitle = navigation.getParam('scanTitle');

    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeRead={this.state.handleBarCodeRead}
          style={StyleSheet.absoluteFill}
        >
          { Platform.OS === 'ios' && <ScanOverlayBackground/> }
          <ScanOverlayContent>
            <MainHeader
              backgroundColor="transparent"
              backButton
            />
            {!!scanTitle && <Text style={[QRScannerStyle.scanText, QRScannerStyle.scanTitle]}>{scanTitle}</Text>}
            <Text style={[QRScannerStyle.scanText, QRScannerStyle.scanInstructions]}>
              {hasCameraPermission === false ?
              'Camera permission is needed in order to scan the QR Code.' :
              'Please center the address’ QR code in the marked area.'}
            </Text>
          </ScanOverlayContent>
          { Platform.OS !== 'ios' && <ScanOverlayBackground/> }
        </BarCodeScanner>
      </View>
    );
  };

  render() {
    return (
      <BasicLayout>
        {this.renderScanner()}
      </BasicLayout>
    )
  }
}

export default QRScannerScreen;
