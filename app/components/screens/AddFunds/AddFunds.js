import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
// import {} from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QRCode from "react-native-qrcode";

import * as actions from "../../../redux/actions";
import { GLOBAL_STYLE_DEFINITIONS, STYLES } from "../../../config/constants/style";
import AddFundsStyle from "./AddFunds.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import Icon from "../../atoms/Icon/Icon";


@connect(
  () => ({
    // map state to props
  }),
  dispatch => bindActionCreators(actions, dispatch)
)
class AddFunds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
      address: "0xbb9bc244d798123fde783fcc1c72d3bb8c189413"
    };
    // binders
  }

  // lifecycle methods
  // event hanlders
  // rendering methods
  render() {
    const { address } = this.state;
    return (
      <SimpleLayout
        animatedHeading={{ text: "Add Funds", textAlign: "center" }}
        background={STYLES.PRIMARY_BLUE}
        bottomNavigation={false}
      >
        <Text style={AddFundsStyle.textOne}>
          Transfer your coins from another wallet by selecting the coin you want to transfer.
        </Text>
        <View style={AddFundsStyle.imageWrapper}>
          <View style={AddFundsStyle.wrapperLogo}>
            <View style={AddFundsStyle.celsiusLogo}>
              <Icon name='CelsiusLogoV2'
                    width='46' height='46' viewBox="0 0 49 49"
                    fill='#FFFFFF'
              />
            </View>
          </View>
          <View style={[GLOBAL_STYLE_DEFINITIONS.centeredColumn, AddFundsStyle.qrCode
          ]}>
            <View style={AddFundsStyle.qrBackground}>
              <QRCode
                value={address}
                size={120}
                bgColor='black'
                fgColor='white'
              />
            </View>
          </View>
        </View>
        <View style={AddFundsStyle.box}>
          <View style={AddFundsStyle.addressWrapper}>
            <Text style={AddFundsStyle.address}>
              0xbb9bc244d798123fde783fcc1c72d3bb8c189413
            </Text>
          </View>
          <View style={AddFundsStyle.boxButtonsWrapper}>
            <TouchableOpacity
              onPress={console.log}
              style={[AddFundsStyle.buttons, {
                borderBottomLeftRadius: 8,
                borderRightWidth: 1,
                borderRightColor: "rgba(255, 255, 255, 0.3)"
              }]}
            >
              <View style={AddFundsStyle.buttonTextWrapper}>
                <Text
                  style={[AddFundsStyle.buttonsText, { color: "white" }]}
                >
                  <Icon
                    style={{ marginTop: 17 }}
                    name='ShareIcon'
                    width='20' height='20'
                    fill='rgba(255, 255, 255, 0.5)'
                  />
                  Share
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={console.log}
              style={[AddFundsStyle.buttons, {
                borderBottomRightRadius: 8,
                borderLeftWidth: 1,
                borderLeftColor: "rgba(255, 255, 255, 0.3)"
              }]}
            >
              <View style={AddFundsStyle.buttonTextWrapper}>
                <Text
                  style={[AddFundsStyle.buttonsText, { color: "white" }]}
                >
                  <Icon
                    style={{ marginTop: 17 }}
                    name='CopyIcon'
                    width='20' height='20'
                    fill='rgba(255, 255, 255, 0.5)'
                  />
                  Copy
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={AddFundsStyle.textTwo}>
          Please keep in mind that you'll only be able to withdraw ETH to the original wallet you sent us ETH from but
          anyone can send ETH to the address above.
        </Text>
        <CelButton
          inverse
          white
          onPress={console.log}
          margin='30 50 20 50'
        >
          Done
        </CelButton>

      </SimpleLayout>

    );
  }
}

export default AddFunds;
