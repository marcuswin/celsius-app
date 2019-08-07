import React, { Component } from 'react';
import { Platform, Switch } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
// import LoanSettingsStyle from "./LoanSettings.styles";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import Card from "../../atoms/Card/Card";
import IconButton from "../../organisms/IconButton/IconButton";
import STYLES from "../../../constants/STYLES";
import { getTheme } from "../../../utils/styles-util";


@connect(
  state => ({
    allLoans: state.loans.allLoans,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class LoanSettings extends Component {

  static navigationOptions = () => ({
    title: "Loan Settings",
    right: "profile"
  });

  constructor(props) {
    super(props)

    this.state = {
      isAutomaticInterestPaymentEnabled: false
    }

  }

  rightSwitch = () => {
    const { isAutomaticInterestPaymentEnabled } = this.state;

    const isIos = Platform.OS === 'ios'
    const falseColor = isIos ? 'transparent' : STYLES.COLORS.DARK_GRAY3
    const theme = getTheme();
    return (
      <Switch
        onValueChange={this.handleSwitchChange}
        value={isAutomaticInterestPaymentEnabled}
        thumbColor={ theme === 'light' ? STYLES.COLORS.WHITE : STYLES.COLORS.DARK_TOGGLE_FOREGROUND }
        ios_backgroundColor={ theme === 'light' ? STYLES.COLORS.DARK_GRAY3 : STYLES.COLORS.DARK_TOGGLE_BACKGROUND }
        trackColor={{ false: falseColor, true: STYLES.COLORS.GREEN }}
      />
    )
  };

  handleSwitchChange = () => {
    const {navigation, actions} = this.props;
    const { isAutomaticInterestPaymentEnabled } = this.state;
    const id = navigation.getParam("id")

    this.setState({
      isAutomaticInterestPaymentEnabled: !isAutomaticInterestPaymentEnabled
    });
    actions.updateLoanSettings(id, {automaticInterestPayment: isAutomaticInterestPaymentEnabled})
  };

  render() {
    const {navigation, actions} = this.props;
    // const style = LoanSettingsStyle();
    const Switcher = this.rightSwitch;
    const id = navigation.getParam("id");
    
    return (
      <RegularLayout>
        <Card close>
          <CelText weight={"500"} type={"H5"}>Automatic Interest Payment</CelText>
          <CelText weight={"300"} type={"H6"} margin={"10 0 0 0"}>By enabling automatic interest payments, your monthly payment will be automatically deducted from your total wallet balance.</CelText>
        </Card>
        <IconButton margin={"20 0 0 0"} right={<Switcher />} hideIconRight>
          Automatic Interest Payment
        </IconButton>
        <IconButton
          margin={"20 0 0 0"}
          onPress={() => actions.navigateTo('ChoosePaymentMethod', {screen: "ChoosePaymentMethod"})}
        >
          Change Interest Payment Type
        </IconButton>
        <IconButton margin={"20 0 0 0"} onPress={() => actions.navigateTo("PrincipalPayment", {id})}>
          Principal Payment
        </IconButton>
      </RegularLayout>
    );
  }
}

export default LoanSettings
