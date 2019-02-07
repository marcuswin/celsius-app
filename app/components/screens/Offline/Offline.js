import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import OfflineStyle from "./Offline.styles";
import { GLOBAL_STYLE_DEFINITIONS as globalStyle } from "../../../config/constants/style";
import CelInput from "../../atoms/CelInput/CelInput";
import formater from "../../../utils/formatter";


@connect(
  state => ({
    connected: state.ui.internetConnected,
    walletTotal: state.wallet.total,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class OfflineMode extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
    // binders
  }

  // lifecycle methods
  componentDidMount = async () => {
    const {actions} = this.props;
    await actions.getWalletDetails();
  };


  // event handlers
  // rendering methods
  render() {
    const {walletTotal} = this.props;
    return (
      <View style={OfflineStyle.background}>
        { walletTotal &&
        <View style={{ marginTop: 15, width: 200 }}>
          <CelInput field={"currentWalletBalance"} shadow theme="white" value={formater.usd(walletTotal.quotes.USD.total)}
                    labelText="Current wallet balance:" autoCapitalize="sentences"/>
        </View>
        }
        <Image source={require("../../../../assets/images/sorry-deer3x.png")} style={[OfflineStyle.image, {resizeMode: "contain"}]}/>
        <Text style={[globalStyle.heading, OfflineStyle.header]}>Celsius Network is unavailable in your location</Text>
        <Text style={[globalStyle.normalText, OfflineStyle.explanation]}>Your money is safe with us and earning interest as usual. For additional information, please contact our support at app@celsius.network..</Text>
      </View>
    );
  }
}

export default OfflineMode;
