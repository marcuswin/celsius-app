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
import RadioButtons from "../../atoms/RadioButtons/RadioButtons";

@connect(
  state => ({
    formData: state.ui.formData,
    btcAddress: state.wallet.addresses.btcAddress,
    ethAddress: state.wallet.addresses.ethAddress,
  }),
  dispatch => bindActionCreators(actions, dispatch)
)
class AddFunds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
      radioItems: [
        { label: 'BTC', value: 'btc' },
        { label: 'ETH', value: 'eth' },
      ],
    };

    const currency = props.navigation.getParam('currency');
    if (!currency) {
      props.initForm({
        currency: 'eth',
      })
    }
    const { formData, navigation, getCoinAddress } = this.props;

    this.getAddress(formData, navigation, getCoinAddress);
  }

  // lifecycle methods
  componentWillReceiveProps(nextProps) {
    const { formData, navigation, getCoinAddress } = nextProps;

    this.getAddress(formData, navigation, getCoinAddress);
  }

  getAddress = (formData, navigation, getCoinAddress) => {
    const { btcAddress, ethAddress } = this.props;
    if (!btcAddress && (formData.currency === 'btc' || navigation.getParam('currency') === 'btc')) {
      getCoinAddress('btc');
    }

    if (!ethAddress && (formData.currency === 'eth' || navigation.getParam('currency') === 'eth')) {
      getCoinAddress('eth');
    }
  }



  // event hanlders
  // rendering methods
  render() {
    const { radioItems } = this.state;
    const { formData, navigation, navigateBack } = this.props;

    const currency = navigation.getParam('currency');
    let address;
    let headingText;
    if (currency) {
      headingText = `Add more ${currency.toUpperCase()}`;
      address = this.props[`${currency.toLowerCase()}Address`];
    } else {
      address = this.props[`${formData.currency}Address`];
      headingText = 'Add funds';
    }

    const copyCurrency = currency ? currency.toUpperCase() : 'BTC and ETH';
    return (
      <SimpleLayout
        animatedHeading={{ text: headingText, textAlign: "center" }}
        background={STYLES.PRIMARY_BLUE}
        bottomNavigation={false}
      >

        {currency ? (
          <Text style={AddFundsStyle.textOne}>
            Use the wallet address below to transfer {currency.toUpperCase()} to your unique Celsius wallet address.
          </Text>
        ) : (
            <Text style={AddFundsStyle.textOne}>
              Transfer your coins from another wallet by selecting the coin you want to transfer.
          </Text>
          )}

        {!currency ? (
          <View style={AddFundsStyle.radioWrapper}>
            <RadioButtons field='currency' items={radioItems} value={formData.currency} />
          </View>
        ) : null}

        <View style={[AddFundsStyle.imageWrapper, { opacity: address ? 1 : 0.2 }]}>

              { Platform.OS === 'ios' ? (
                <View style={AddFundsStyle.wrapperLogo}>
                  <View style={AddFundsStyle.celsiusLogo}>
                   <Icon name='CelsiusLogoV2' width='46' height='46' viewBox="0 0 49 49" fill='#FFFFFF' />
                  </View>
                </View>
                ) : null}

          <View style={[globalStyles.centeredColumn, AddFundsStyle.qrCode]}>
            <View style={AddFundsStyle.qrBackground}>
              { address &&
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
              onPress={() => Share.share({ message: address, title: 'Wallet address' })}
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
                  { Platform.OS === 'ios' ? (<Icon
                    style={{ marginTop: 17 }}
                    name='ShareIcon'
                    width='20' height='20'
                    fill='rgba(255, 255, 255, 0.5)'
                  />) : null }
                  Share
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Clipboard.setString(address)}
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
                  {Platform.OS === 'ios' ? (<Icon
                    style={{ marginTop: 17 }}
                    name='CopyIcon'
                    width='20' height='20'
                    fill='rgba(255, 255, 255, 0.5)'
                  />) : null }
                  Copy
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[AddFundsStyle.textTwo, { marginTop: 20, marginBottom: 25 }]}>
          Please keep in mind that you'll only be able to withdraw  to the original wallet you sent us { copyCurrency } from but anyone can send { copyCurrency } to the address above.
        </Text>

        <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 8, padding: 16 }}>
          <Text style={AddFundsStyle.textTwo}>
            For your security, if you would like to withdraw more than
            <Text style={[AddFundsStyle.textTwo, globalStyles.boldText]}> $50,000 </Text>
            worth of { copyCurrency } you will be required to contact us at
            <Text style={[AddFundsStyle.textTwo, globalStyles.boldText]}> app@celsius.network </Text>
            so that we can verify your identity prior to transferring your funds.
          </Text>
        </View>

        <CelButton
          inverse
          white
          onPress={() => navigateBack()}
          margin='30 50 20 50'
        >
          Done
        </CelButton>

      </SimpleLayout>

    );
  }
}

export default AddFunds;
