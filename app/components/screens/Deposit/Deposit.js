import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import QRCode from 'react-qr-code';

import cryptoUtil from "../../../utils/crypto-util";
import testUtil from "../../../utils/test-util";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import * as appActions from '../../../redux/actions';
import { getDepositEligibleCoins } from '../../../redux/custom-selectors';
import CopyButton from '../../atoms/CopyButton/CopyButton';
import ShareButton from '../../atoms/ShareButton/ShareButton';
import CelButton from '../../atoms/CelButton/CelButton';
import CelText from '../../atoms/CelText/CelText';
import Separator from '../../atoms/Separator/Separator';
import STYLES from '../../../constants/STYLES';
import DepositStyle from './Deposit.styles';
import Card from '../../atoms/Card/Card';
import Icon from '../../atoms/Icon/Icon';
import { MODALS } from '../../../constants/UI'
import CelModal from '../../organisms/CelModal/CelModal';
import Spinner from '../../atoms/Spinner/Spinner';
import CoinPicker from '../../molecules/CoinPicker/CoinPicker';

@connect(
  state => ({
    eligibleCoins: getDepositEligibleCoins(state),
    formData: state.forms.formData,
    walletAddresses: state.wallet.addresses
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Deposit extends Component {

  static navigationOptions = () => ({
    title: "Deposit coins",
    right: "profile"
  });

  constructor(props) {
    super(props);
    this.state = {
      isFetchingAddress: false,
      useAlternateAddress: false
    };
  }

  getAddress = (currency) => {
    const { walletAddresses } = this.props;

    let address = '';
    let alternateAddress = '';
    let destinationTag = '';
    let memoId = '';
    let fullAddress = '';

    if (!currency) {
      return {
        address,
        alternateAddress,
        destinationTag,
        memoId
      }
    }

    // If currency is ERC20 get ETH address because it's the same for all ERC20, else
    // find the address in wallet for specific currency
    if (cryptoUtil.isERC20(currency)) {
      fullAddress = walletAddresses.ETHAddress;
      alternateAddress = walletAddresses.ETHAlternateAddress;
    } else {
      fullAddress = walletAddresses[`${currency}Address`];
      alternateAddress = walletAddresses[`${currency}AlternateAddress`];
    }

    // Because getAddress is called in render method, it might happen that currency is defined and
    // walletAddresses is still not defined because those 2 are fetched from different APIs
    if (!fullAddress) {
      return {
        address,
        alternateAddress,
        destinationTag,
        memoId
      }
    }

    // If address has dt(destinationTag) or memoId, split it and return it separately
    if (fullAddress.includes("?dt=")) {
      const splitAddress = fullAddress.split("?dt=");
      address = splitAddress[0];
      destinationTag = splitAddress[1]
    } else if (fullAddress.includes("?memoId=")) {
      const splitAddress = fullAddress.split("?memoId=");
      address = splitAddress[0];
      memoId = splitAddress[1];
    } else {
      address = fullAddress;
    }

    return {
      address,
      alternateAddress,
      destinationTag,
      memoId
    }
  };

  getDefaultSelectedCoin = () => {
    const { formData, navigation } = this.props;
    const currencyFromNav = navigation.getParam("coin");

    // If nothing comes through navigation and nothing stored in the redux state,
    // use ETH as default selected coin
    let defaultSelectedCoin = 'ETH';

    if (currencyFromNav) {
      defaultSelectedCoin = currencyFromNav
    } else if (formData.selectedCoin) {
      defaultSelectedCoin = formData.selectedCoin
    }

    return defaultSelectedCoin;
  };

  handleCoinSelect = async (field, item) => {
    const { actions } = this.props;
    await actions.updateFormField(field, item);
    await this.fetchAddress(item);
  };

  fetchAddress = async (currency) => {
    const { actions, walletAddresses } = this.props;
    this.setState({isFetchingAddress: true});
    // Every ERC20 has the same address, so we use ETH address
    // Also check if it's already fetched and stored in redux state to avoid additional http requests
    if (cryptoUtil.isERC20(currency) && !walletAddresses.ETHAddress) {
      await actions.getCoinAddress('ETH');
    } else if (!cryptoUtil.isERC20(currency) && !walletAddresses[`${currency}Address`]) {
      // If it's not ERC20 and not already fetched and stored in redux state, get the address
      await actions.getCoinAddress(currency);
    }

    this.setState({isFetchingAddress: false, useAlternateAddress: false})
  };

  openModal = (destinationTag, memoId) => {
    const { actions } = this.props;

    if (destinationTag) {
      actions.openModal(MODALS.DESTINATION_TAG_MODAL)
    }

    if (memoId) {
      actions.openModal(MODALS.MEMO_ID_MODAL)
    }
  };

  renderSwitchAddressBlock = (alternativeAddress, currency) => {
    const { useAlternateAddress } = this.state;
    let alternateText1 = '';
    let alternateText2 = '';
    let buttonText = '';

    // Switching wording, depending on currency and if using alternative address
    if (currency === 'LTC') {
      alternateText1 = `${useAlternateAddress ? "3" : "M"}`;
      alternateText2 = `${useAlternateAddress ? "M" : "3"}`;

      buttonText = `Use ${useAlternateAddress ? "M" : "3"}-format address`;

    } else if (currency === 'BCH') {
      alternateText1 = `${useAlternateAddress ? "Cash Address" : "Bitcoin"}`;
      alternateText2 = `${useAlternateAddress ? "Bitcoin" : "Cash Address"}`;

      buttonText = `Use ${useAlternateAddress ? "Bitcoin" : "Cash Address"}-format address`;
    }

    return (
      <Card styles={{backgroundColor: STYLES.COLORS.CELSIUS_BLUE}}>
        <CelText color='#FFFFFF'>
          If your wallet doesn't support <CelText bold color='#FFFFFF'>{alternateText1}-format</CelText> addresses you can use a <CelText bold color='#FFFFFF'>{alternateText2}-format</CelText> {currency} address.
        </CelText>

        <CelButton
          white
          onPress={() => {this.setState({useAlternateAddress: !this.state.useAlternateAddress})}}
          style={{borderWidth: 0.5, borderColor: '#FFFFFF', marginTop: 10}}
        >
          {buttonText}
        </CelButton>
      </Card>
    )
  };

  renderLoader = () => (
    <View style={{marginTop: 50, justifyContent: 'center', alignItems: 'center'}}>
      <Spinner />
    </View>
  );

  render() {
    const { actions, formData, eligibleCoins } = this.props;
    const { address, alternateAddress, destinationTag, memoId } = this.getAddress(formData.selectedCoin);
    const { useAlternateAddress, isFetchingAddress } = this.state;
    const styles = DepositStyle();

    return (
      <RegularLayout padding={'20 0 40 0'}>

        <CoinPicker
          coinList={eligibleCoins}
          updateFormField={actions.updateFormField}
          onCoinSelect={this.handleCoinSelect}
          value={formData.selectedCoin}
          field='selectedCoin'
          defaultSelected={this.getDefaultSelectedCoin()}
        />

        {address && !isFetchingAddress ?
          <View style={styles.container}>
            <Card>
              <View style={{alignItems: 'center'}}>
                <QRCode
                  value={useAlternateAddress ? alternateAddress : address}
                  size={100}
                  bgColor='#FFF'
                  fgColor='#000'
                />
                <CelText type='H4' align={'center'} style={{marginTop: 10}}>{useAlternateAddress ? alternateAddress : address}</CelText>

                <View style={styles.copyShareWrapper}>
                  <Separator size={2}/>
                  <View style={styles.copyShareButtonsWrapper}>
                    <CopyButton copyText={useAlternateAddress ? alternateAddress : address}/>
                    <Separator vertical size={2}/>
                    <ShareButton shareText={useAlternateAddress ? alternateAddress : address}/>
                  </View>
                </View>
              </View>
            </Card>

            {alternateAddress && this.renderSwitchAddressBlock(alternateAddress, formData.selectedCoin)}

            {destinationTag || memoId ?
              <Card>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <CelText style={{opacity: 0.7}}>{destinationTag ? 'Destination Tag:' : 'Memo Id'}</CelText>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CelText>{destinationTag || memoId}</CelText>
                    <TouchableOpacity onPress={() => this.openModal(destinationTag, memoId)}>
                      <Icon name="InfoCircle" height="18" width="18" fill="#ffffff" stroke="rgba(61,72,83,0.3)" style={{marginLeft: 10}}/>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.copyShareWrapper}>
                  <Separator size={2} />
                  <View style={styles.copyShareButtonsWrapper}>
                    <CopyButton copyText={destinationTag || memoId}/>
                    <Separator vertical size={2}/>
                    <ShareButton shareText={destinationTag || memoId}/>
                  </View>
                </View>
              </Card>
              : null}
          </View>
        : null }

        {isFetchingAddress && this.renderLoader()}

        <CelModal name={MODALS.DESTINATION_TAG_MODAL}>
          <CelText align='center' type='H1' margin='0 0 32 0'>Destination Tag for XRP</CelText>
          <CelText align='center' type='H4' margin='0 0 24 0'>Ripple (XRP) transactions require destination tags as an additional information.</CelText>
          <CelText align='center' type='H4' margin='0 0 24 0'>The Destination Tag is used to determine what account a given transaction should be assigned and credited to.</CelText>
          <CelText align='center' type='H4' margin='0 0 24 0'>Quoting the tag along with the Ripple wallet address ensures that your transaction is uniquely identified and processed successfully.</CelText>

          <CelButton onPress={() => actions.closeModal()}>
            Got it
          </CelButton>
        </CelModal>

        <CelModal name={MODALS.MEMO_ID_MODAL}>
          <CelText align='center' type='H1' margin='0 0 32 0'>Stellar (XLM) Memo ID</CelText>
          <CelText align='center' type='H4' margin='0 0 24 0'>Memo ID is used to determine what account a given transaction should be assigned and credited to.</CelText>
          <CelText align='center' type='H4' margin='0 0 24 0'>Quoting the Memo ID with the Stellar wallet address ensures that your transaction is uniquely identified and processed successfully.</CelText>
          <CelText align='center' type='H4' margin='0 0 24 0'>Exchanges require Memo ID, so please make sure to provide it, or you risk losing your money.</CelText>

          <CelButton onPress={() => actions.closeModal()}>
            Got it
          </CelButton>
        </CelModal>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(Deposit);
