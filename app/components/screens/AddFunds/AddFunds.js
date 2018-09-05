import React, { Component } from "react";
import { Text, View, TouchableOpacity, Clipboard, Share, Platform } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QRCode from "react-native-qrcode";

import * as appActions from "../../../redux/actions";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles, STYLES } from "../../../config/constants/style";
import AddFundsStyle from "./AddFunds.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import Icon from "../../atoms/Icon/Icon";
import CelSelect from "../../molecules/CelSelect/CelSelect";
import cryptoUtil from "../../../utils/crypto-util";
import { ELIGIBLE_COINS } from "../../../config/constants/common";
import { mixpanelEvents } from "../../../services/mixpanel";

const possibleAddresses = ELIGIBLE_COINS.filter(c => !cryptoUtil.isERC20(c) || c === 'ETH').map(c => c.toLowerCase());

@connect(
  state => {
    const walletAddresses = {};

    possibleAddresses.forEach(pa => {
      walletAddresses[pa] = {
        address: state.wallet.addresses[`${pa}Address`],
        alternateAddress: state.wallet.addresses[`${pa}AlternateAddress`],
      };
    });
    // possibleAddresses.forEach(pa => {
    //   walletAddresses[pa] = state.wallet.addresses[`${pa}Address`];
    // })

    return {
      formData: state.ui.formData,
      walletAddresses,
      activeScreen: state.nav.routes[state.nav.index].routeName,
      routes: state.nav.routes,
      supportedCurrencies: state.generalData.supportedCurrencies,
    }
  },
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class AddFunds extends Component {
  constructor(props) {
    super(props);

    const pickerItems = ELIGIBLE_COINS.map(ec => {
      const currency = props.supportedCurrencies.filter(sc => sc.short === ec)[0];
      const currencyName = currency.name[0].toUpperCase() + currency.name.slice(1);
      return {
        label: `${currencyName} (${ec})`,
        value: ec.toLowerCase(),
      }
    })

    this.state = {
      pickerItems,
      useAlternateAddress: false,
    };
  }

  // lifecycle methods
  componentDidMount() {
    const { navigation, actions } = this.props;
    const currency = navigation.getParam("currency");

    actions.initForm({ currency: currency || "cel" });
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
    const { actions, walletAddresses } = this.props;

    console.log()

    if ((!walletAddresses[currency] || !walletAddresses[currency].address) && currency !== 'eth') {
      actions.getCoinAddress(currency)
    }

    // get erc20 token address
    if ((!walletAddresses.eth || !walletAddresses.eth.address) && cryptoUtil.isERC20(currency)) {
      actions.getCoinAddress("eth");
    }
  };

  // event hanlders
  // rendering methods
  setAddress = (currency) => {
    if (currency) {
      const { walletAddresses } = this.props;
      const { useAlternateAddress } = this.state;

      const cryptoAddress = cryptoUtil.isERC20(currency) ? walletAddresses.eth : walletAddresses[currency];

      if (useAlternateAddress && !!cryptoAddress.alternateAddress) {
        return cryptoAddress.alternateAddress;
      }

      return cryptoAddress.address;
    }
  };

  switchAlternateAddress = () => {
    const { useAlternateAddress } = this.state;

    this.setState({
      useAlternateAddress: !useAlternateAddress
    });
  };

  goBack = () => {
    const { routes, actions } = this.props;

    const lastRoute = routes[routes.length - 2];
    const beforeLastRoute = routes[routes.length - 3];

    // Skip SecureTransactions screen
    if (lastRoute.routeName === 'SecureTransactions') {
      actions.navigateTo(beforeLastRoute.routeName, beforeLastRoute.params);
    } else {
      actions.navigateBack();
    }
    mixpanelEvents.pressAddFunds();
  }

  copyAddress = (address) => {
    const { actions } = this.props;
    actions.showMessage("success", "Address copied to clipboard!");
    Clipboard.setString(address);
  };

  render() {
    const { pickerItems, useAlternateAddress } = this.state;
    const { formData, navigation, actions } = this.props;

    const navCurrency = navigation.getParam("currency");
    let address;
    let headingText;
    let currentCurrency;
    if (navCurrency) {
      headingText = `Add more ${navCurrency.toUpperCase()}`;
      address = this.setAddress(navCurrency.toLowerCase());
      currentCurrency = navCurrency.toLowerCase();
    } else {
      address = this.setAddress(formData.currency);
      headingText = "Add funds";
      currentCurrency = formData.currency;
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
                {Platform.OS === "ios" ? (<Icon
                  style={{ marginTop: 17 }}
                  name='ShareIcon'
                  width='20' height='20'
                  fill='rgba(255, 255, 255, 0.5)'
                />) : null}
                <Text
                  style={[AddFundsStyle.buttonsText, { color: "white" }]}
                >
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
                {Platform.OS === "ios" ? (<Icon
                  style={{ marginTop: 17 }}
                  name='CopyIcon'
                  width='20' height='20'
                  fill='rgba(255, 255, 255, 0.5)'
                />) : null}
                <Text
                  style={[AddFundsStyle.buttonsText, { color: "white" }]}
                >
                  Copy
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {currentCurrency.toLowerCase() === 'ltc' && <View style={AddFundsStyle.alternateAddressWrapper}>
          <Text style={AddFundsStyle.alternateAddressText}>If your wallet doesn't support {useAlternateAddress ? '3' : 'M'}-format addresses you can use a {useAlternateAddress ? 'M' : '3'}-format LTC address.</Text>
          <CelButton
            white
            size="small"
            onPress={this.switchAlternateAddress}
            margin='0 10 0 10'
          >
            Use {useAlternateAddress ? 'M' : '3'}-format address
          </CelButton>
        </View>}

        <TouchableOpacity style={AddFundsStyle.secureTransactionsBtn} onPress={() => actions.navigateTo('SecureTransactions', { currency: navCurrency })}>
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
