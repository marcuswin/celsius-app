import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Image, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../../redux/actions";
import OfflineModeStyle from "./OfflineMode.styles";
import { GLOBAL_STYLE_DEFINITIONS as globalStyle } from "../../../config/constants/style";
import CelInput from "../../atoms/CelInput/CelInput";
import formater from "../../../utils/formatter";


@connect(
  state => ({
    connected: state.ui.internetConnected,
    walletTotal: state.wallet.total,
  }),
  dispatch => bindActionCreators(actions, dispatch)
)
class OfflineMode extends Component {

  static propTypes = {
    purpose: PropTypes.string,
  };

  static defaultProps = {
    purpose: "Connection"
  }

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
    // binders
  }

  // lifecycle methods
  // event hanlders
  // rendering methods
  render() {
    const {walletTotal, purpose} = this.props;
    let title;
    let text;

    switch (purpose) {
      case "Location":
        title = "Celsius Network is unavailable in your location";
        text = "Your money is safe with us and earning interest as usual. For additional information, please contact our support.";
        break;
      default:
        title = "There's no internet connection";
        text = "Please, make sure that your Wi-Fi or Cellular data is turned on, then try again."
    }

    return (
      <View style={OfflineModeStyle.background}>
        { walletTotal &&
        <View style={{ marginTop: 15, width: 200 }}>
          <CelInput field={"currentWalletBalance"} shadow theme="white" value={formater.usd(walletTotal.quotes.USD.total)}
                    labelText="Current wallet balance:" autoCapitalize="sentences"/>
        </View>
        }
        <Image source={require("../../../../assets/images/OfflineMode/deer-tangled3x.png")} style={[OfflineModeStyle.image, {resizeMode: "contain"}]}/>
        <Text style={[globalStyle.heading, OfflineModeStyle.header]}>{title}</Text>
        <Text style={[globalStyle.normalText, OfflineModeStyle.explanation]}>{text}</Text>
      </View>
    );
  }
}

export default OfflineMode;
