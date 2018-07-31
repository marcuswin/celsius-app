import React, {Component} from 'react';
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";
import { BarCodeScanner, Permissions } from 'expo';
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";

import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import * as appActions from "../../../redux/actions";

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

    if (onScan) {
      onScan(data);
    } else {
      actions.updateFormField(formField, data);
    }

    actions.navigateBack();
  };

  renderScanner = () => {
    const { hasCameraPermission, navigation } = this.state;

    const scanTitle = navigation.getParam('scanTitle');

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={{ flex: 1 }}>
        {!!scanTitle && <Text>{scanTitle}</Text>}
        <BarCodeScanner
          onBarCodeRead={this.state.handleBarCodeRead}
          style={StyleSheet.absoluteFill}
        />
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