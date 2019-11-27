import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, SafeAreaView } from "react-native";
// TODO(sb): RN update dependencies fixes
// import { BarCodeScanner } from "expo-barcode-scanner";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import QRScannerStyle from "./QRScanner.styles";

import CelText from "../../atoms/CelText/CelText";
import ThemedImage from "../../atoms/ThemedImage/ThemedImage";
import { getPermissionStatus, ALL_PERMISSIONS, requestForPermission } from "../../../utils/device-permissions";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class QRScannerScreen extends Component {
  static propTypes = {
    formField: PropTypes.string,
    onScan: PropTypes.func,
  };

  static defaultProps = {
    formField: "lastQRScan",
  };

  static navigationOptions = () => ({
    title: "QR code scan",
  });

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      handleBarCodeRead: undefined,
    };
  }

  async componentDidMount() {
    const { actions } = this.props;
    let perm = await getPermissionStatus(ALL_PERMISSIONS.CAMERA)

    if (perm !== RESULTS.GRANTED) {
      perm = await requestForPermission(ALL_PERMISSIONS.CAMERA)
    }
    actions.setFabType("hide");

    await this.setState({
      hasCameraPermission: perm === RESULTS.GRANTED,
      handleBarCodeRead: this.handleBarCodeRead,
    });
  }

  handleBarCodeRead = async ({ data }) => {
    const { actions, formField, navigation } = this.props;

    this.setState({ handleBarCodeRead: undefined });

    const onScan = navigation.getParam("onScan");

    // scanning metamask address -> 'ethereum:0x...'
    let address = data.indexOf(":") === -1 ? data : data.split(":")[1];
    address = address.trim();

    if (onScan) {
      onScan(address);
    } else {
      actions.updateFormField(formField, address);
    }
    actions.navigateBack();
  };

  renderScanner = () => {
    const { hasCameraPermission } = this.state;
    const style = QRScannerStyle();

    return (
      <View style={style.container}>
        {/* <BarCodeScanner onBarCodeScanned={this.state.handleBarCodeRead}> */}
          <View style={style.barcodeWrapper}>
            <View style={[style.mask, style.maskOverlayColor]} />
            <View style={style.imageWrapper}>
              <View style={[style.mask, style.maskOverlayColor]} />
              <ThemedImage
                lightSource={require("../../../../assets/images/mask/square-mask-01.png")}
                darkSource={require("../../../../assets/images/mask/dark-qrcode-mask3x.png")}
                style={style.image}
              />
              <View style={[style.mask, style.maskOverlayColor]} />
            </View>
            <View style={[style.mask, style.maskOverlayColor]}>
              <SafeAreaView style={[style.safeArea]}>
                <CelText
                  weight="300"
                  type="H4"
                  align="center"
                  style={style.permission}
                >
                  {hasCameraPermission === false
                    ? "Camera permission is needed in order to scan the QR Code."
                    : "Please center the QR code in the marked area."}
                </CelText>
              </SafeAreaView>
            </View>
            <View style={[style.mask, style.maskOverlayColor]}>
              <View style={style.view} />
            </View>
          </View>
        {/* </BarCodeScanner> */}
      </View>
    );
  };

  render() {
    return this.renderScanner();
  }
}

export default QRScannerScreen;
