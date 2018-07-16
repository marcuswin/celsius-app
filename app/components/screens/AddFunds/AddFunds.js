import React, { Component } from "react";
import { Text, View, TouchableOpacity, Clipboard, Share, Platform } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QRCode from "react-native-qrcode";

import * as actions from "../../../redux/actions";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles, STYLES } from "../../../config/constants/style";
import AddFundsStyle from "./AddFunds.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import Icon from "../../atoms/Icon/Icon";
import CelSelect from "../../molecules/CelSelect/CelSelect";
import cryptoUtil from "../../../utils/crypto-util";

@connect(
  state => ({
    formData: state.ui.formData,
    btcAddress: state.wallet.addresses.btcAddress,
    ethAddress: state.wallet.addresses.ethAddress,
    activeScreen: state.nav.routes[state.nav.index].routeName,
    routes: state.nav.routes,
  }),
  dispatch => bindActionCreators(actions, dispatch)
)
class AddFunds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pickerItems: [
        { label: "Celsius (CEL)", value: "cel" },
        { label: "Bitcoin (BTC)", value: "btc" },
        { label: "Ethereum (ETH)", value: "eth" }
      ]
    };
  }

  // lifecycle methods
  componentDidMount() {
    const { navigation, initForm } = this.props;
    const currency = navigation.getParam("currency");

    initForm({ currency: currency || "cel" });
  }

  componentWillReceiveProps(nextProps) {
    const { activeScreen, formData } = this.props;

    if (nextProps.formData.currency && nextProps.formData.currency !== formData.currency) {
      this.getAddress(nextProps.formData.currency);
    }

    if ((activeScreen !== nextProps.activeScreen && nextProps.activeScreen === "AddFunds")) {
      this.componentDidMount();
    }
  }

  getAddress = (currency) => {
    const { btcAddress, ethAddress, getCoinAddress } = this.props;

    if (!btcAddress && currency === "btc") {
      getCoinAddress("btc");
    }

    if (!ethAddress && cryptoUtil.isERC20(currency)) {
      getCoinAddress("eth");
    }
  };

  // event hanlders
  // rendering methods
  setAddress = (currency) => {
    const { btcAddress, ethAddress } = this.props;

    if (currency === "btc") return btcAddress;
    if (cryptoUtil.isERC20(currency)) return ethAddress;
  };

  goBack = () => {
    const { routes, navigateTo } = this.props;

    const lastRoute = routes[routes.length - 2];
    const beforeLastRoute = routes[routes.length - 3];

    if (lastRoute.routeName === 'SecureTransactions') {
      navigateTo(beforeLastRoute.routeName, beforeLastRoute.params);
    } else {
      navigateTo(lastRoute.routeName, lastRoute.params);
    }
  }

  copyAddress = (address) => {
    const { showMessage } = this.props;
    showMessage("success", "Address copied to clipboard!");
    Clipboard.setString(address);
  };

  render() {
    const { pickerItems } = this.state;
    const { formData, navigation, navigateTo } = this.props;

    const navCurrency = navigation.getParam("currency");
    let address;
    let headingText;
    if (navCurrency) {
      headingText = `Add more ${navCurrency.toUpperCase()}`;
      address = this.setAddress(navCurrency.toLowerCase());
    } else {
      address = this.setAddress(formData.currency);
      headingText = "Add funds";
    }

    return (
      <SimpleLayout
        mainHeader={{ onCancel: this.goBack, backButton: false }}
        animatedHeading={{ text: headingText, textAlign: "center" }}
        background={STYLES.PRIMARY_BLUE}
        bottomNavigation={false}
      >

        {navCurrency ? (
          <Text style={AddFundsStyle.textOne}>
            Use the wallet address below to transfer {navCurrency.toUpperCase()} to your unique Celsius wallet
            address.
          </Text>
        ) : (
          <Text style={AddFundsStyle.textOne}>
            Transfer your coins from another wallet by selecting the coin you want to transfer.
          </Text>
        )}

        {!navCurrency && (
          <CelSelect field="currency" items={pickerItems} labelText="Pick a currency" value={formData.currency} margin="25 50 15 50"/>
        )}

        <View style={[AddFundsStyle.imageWrapper, { opacity: address ? 1 : 0.2 }]}>

          {Platform.OS === "ios" ? (
            <View style={AddFundsStyle.wrapperLogo}>
              <View style={AddFundsStyle.celsiusLogo}>
                <Icon name='CelsiusLogoV2' width='46' height='46' viewBox="0 0 49 49" fill='#FFFFFF'/>
              </View>
            </View>
          ) : null}

          <View style={[globalStyles.centeredColumn, AddFundsStyle.qrCode]}>
            <View style={AddFundsStyle.qrBackground}>
              {address &&
              <QRCode
                value={address}
                size={120}
                bgColor='black'
                fgColor='white'
              />
              }
            </View>
          </View>
        </View>

        <View style={AddFundsStyle.box}>
          <View style={AddFundsStyle.addressWrapper}>
            <Text style={AddFundsStyle.address}>{address}</Text>
          </View>

          <View style={AddFundsStyle.boxButtonsWrapper}>
            <TouchableOpacity
              onPress={() => Share.share({ message: address, title: "Wallet address" })}
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
                  {Platform.OS === "ios" ? (<Icon
                    style={{ marginTop: 17 }}
                    name='ShareIcon'
                    width='20' height='20'
                    fill='rgba(255, 255, 255, 0.5)'
                  />) : null}
                  Share
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.copyAddress(address)}
              style={[AddFundsStyle.buttons, {
                borderBottomRightRadius: 8
              }]}
            >
              <View style={AddFundsStyle.buttonTextWrapper}>
                <Text
                  style={[AddFundsStyle.buttonsText, { color: "white" }]}
                >
                  {Platform.OS === "ios" ? (<Icon
                    style={{ marginTop: 17 }}
                    name='CopyIcon'
                    width='20' height='20'
                    fill='rgba(255, 255, 255, 0.5)'
                  />) : null}
                  Copy
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={AddFundsStyle.secureTransactionsBtn} onPress={() => navigateTo('SecureTransactions', { currency: navCurrency })}>
          <Icon
            name="Shield"
            width={20}
            height={25}
            fill="white"
            stroke="white"
            style={{ opacity: 0.5 }}
          />
          <Text style={AddFundsStyle.textTwo}>Transactions are secure</Text>
        </TouchableOpacity>

        <CelButton
          white
          onPress={this.goBack}
          margin='0 50 30 50'
        >
          Done
        </CelButton>

      </SimpleLayout>

    );
  }
}

export default AddFunds;
