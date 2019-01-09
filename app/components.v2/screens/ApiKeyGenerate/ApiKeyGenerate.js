import React, { Component } from 'react';
import { Text, TouchableOpacity } from "react-native";
import { View } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";
// import {STYLES} from "../../../config/constants/style";
// import SettingsStyle from "./Settings.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import { FONT_SCALE, STYLES, GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import CelButton from '../../atoms/CelButton/CelButton';
import CelCheckbox from '../../atoms/CelCheckbox/CelCheckbox';
import { heightPercentageToDP } from '../../../utils/scale';
import GenerateApiKeyModal from '../../organisms/GenerateApiKeyModal/GenerateApiKeyModal';


@connect(
  state => ({
    user: state.users.user,
    apiKey: state.apiKeys.lastGeneratedKey
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class ApiKeyGenerate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agreedWalletBalance: false,
      agreedReadTransaction: false,
      agreedReadDeposit: false,
      agreedReadWithdraw: false
    };
  }
  toggleWalletBalance = () => {
    this.setState(previousState => (
      { agreedWalletBalance: !previousState.agreedWalletBalance }
    ))
  }
  toggleReadTransaction = () => {
    this.setState(previousState => (
      { agreedReadTransaction: !previousState.agreedReadTransaction }
    ))
  }
  toggleReadDeposit = () => {
    this.setState(previousState => (
      { agreedReadDeposit: !previousState.agreedReadDeposit }
    ))
  }
  toggleReadWithdraw = () => {
    this.setState(previousState => (
      { agreedReadWithdraw: !previousState.agreedReadWithdraw }
    ))
  }

  generateApiKey = () => {
    const { agreedWalletBalance, agreedReadDeposit, agreedReadTransaction, agreedReadWithdraw } = this.state;
    const { actions } = this.props;
    const permissions = {
      read_balance: agreedWalletBalance,
      read_transactions: agreedReadTransaction,
      read_deposit_address: agreedReadDeposit,
      withdraw: agreedReadWithdraw
    }
    actions.createAPIKey(permissions);
  }

  render() {
    const { actions } = this.props;
    const { agreedWalletBalance, agreedReadDeposit, agreedReadTransaction, agreedReadWithdraw } = this.state;

    const logoutButton = () => (

      <TouchableOpacity onPress={actions.logoutUser}>
        <Text style={[{
          color: 'white',
          paddingLeft: 5,
          textAlign: 'right',
          opacity: 0.8,
          marginTop: 2,
          fontSize: FONT_SCALE * 18,
          fontFamily: 'agile-medium',
        }]}>Log out</Text>
      </TouchableOpacity>
    )

    return (
      <SimpleLayout
        mainHeader={{ backButton: true, right: logoutButton() }}
        animatedHeading={{ text: 'Api Auth' }}
        background={STYLES.GRAY_1}
        bottomNavigation
      >
        <Text style={[globalStyles.normalText, { marginTop: heightPercentageToDP('3.69%'), marginBottom: heightPercentageToDP('3.69%') }]}>
          Generate your API key by selecting permissions from the list below:
        </Text>
        <View style={{ marginBottom: heightPercentageToDP('2.46%') }}>
          <CelCheckbox
            label="Read wallet balance"
            value={agreedWalletBalance}
            onChange={this.toggleWalletBalance}
            theme={"blueTransparent"}
            checkedImage={require('../../../../assets/images/icons/icon-check-blue3x.png')}
          />
        </View>
        <View style={{ marginBottom: heightPercentageToDP('2.46%') }}>
          <CelCheckbox
            label="Read transactions"
            value={agreedReadTransaction}
            onChange={this.toggleReadTransaction}
            theme={"blueTransparent"}
            checkedImage={require('../../../../assets/images/icons/icon-check-blue3x.png')}
          />
        </View>
        <View style={{ marginBottom: heightPercentageToDP('2.46%') }}>
          <CelCheckbox
            label="Read deposits"
            value={agreedReadDeposit}
            onChange={this.toggleReadDeposit}
            theme={"blueTransparent"}
            checkedImage={require('../../../../assets/images/icons/icon-check-blue3x.png')}
          />
        </View>
        <View style={{ marginBottom: heightPercentageToDP('4.93%') }}>
          <CelCheckbox
            label="Read withdrawals"
            value={agreedReadWithdraw}
            onChange={this.toggleReadWithdraw}
            theme={"blueTransparent"}
            checkedImage={require('../../../../assets/images/icons/icon-check-blue3x.png')}
          />
        </View>
        <View>
          <CelButton
            onPress={this.generateApiKey}
            color="blue"
          >Generate API key</CelButton>
        </View>
        <GenerateApiKeyModal />
      </SimpleLayout >
    );
  }
}

export default ApiKeyGenerate;
