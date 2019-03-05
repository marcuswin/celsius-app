import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import BorrowEnterAmountStyle from "./BorrowEnterAmount.styles";
import CelText from '../../atoms/CelText/CelText';
import CelButton from '../../atoms/CelButton/CelButton';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelNumpad from "../../molecules/CelNumpad/CelNumpad";
import ProgressBar from "../../atoms/ProgressBar/ProgressBar";
import { KEYPAD_PURPOSES } from "../../../constants/UI";
import formatter from "../../../utils/formatter";
import STYLES from "../../../constants/STYLES";
import BorrowConfirmModal from "../../organisms/BorrowConfirmModal/BorrowConfirmModal";

@connect(
  (state) => ({
    loanCompliance: state.user.compliance.loan,
    formData: state.forms.formData,
    walletSummary: state.wallet.summary,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BorrowEnterAmount extends Component {
  static propTypes = {};
  static defaultProps = {}

  constructor(props) {
    super(props);
    const { loanCompliance, walletSummary } = props
    const eligibleCoins = walletSummary.coins.filter(coinData => loanCompliance.coins.includes(coinData.short))

    this.state = {
      header: {
        title: "Enter the amount",
        left: "back",
        right: "info",
        onInfo: () => props.actions.showMessage('warning', 'Not implemented yet!'),
      }
    };

    props.actions.initForm({
      loanAmount: '5000',
      maxAmount: eligibleCoins.reduce((max, element) => element.amount_usd > max ? element.amount_usd : max, 0) / 2,
    })
  }

  getAmountColor = () => {
    const { formData } = this.props;

    if (formData.loanAmount < 5000 || formData.loanAmount > formData.maxAmount) {
      return STYLES.COLORS.ORANGE
    }

    return STYLES.COLORS.DARK_GRAY
  }

  handleAmountChange = (newValue) => {
    const { actions, formData } = this.props

    actions.updateFormField('loanAmount', newValue)

    if (newValue < 5000) {
      actions.showMessage('warning', '$5,000 is the minimum to proceed.')
    }

    if (newValue > formData.maxAmount) {
      actions.showMessage('warning', `${formatter.usd(newValue)} exceeds the maximum amount you can borrow based on your wallet deposits. Deposit more, or change the amount to proceed.`)
    }
  }

  renderButton() {
    const { formData, actions } = this.props

    if (formData.loanAmount > formData.maxAmount) {
      return (
        <CelButton
          onPress={() => {
            actions.navigateTo('Deposit')
            actions.toggleKeypad()
          }}
          margin="20 0 0 0"
        >
          Deposit more
        </CelButton>
      )
    }

    return (
      <CelButton
        disabled={formData.loanAmount < 5000}
        onPress={() => {
          actions.navigateTo('BorrowCollateral')
          // actions.navigateTo('VerifyProfile', { onSuccess: () => actions.openModal(UI.MODALS.BORROW_CONFIRM)})
          actions.toggleKeypad()
        }}
        margin="20 0 0 0"
        iconRight="arrowRight"
      >
        Choose collateral
      </CelButton>
    )
  }

  render() {
    const { header } = this.state;
    const { actions, formData } = this.props;
    // const style = BorrowEnterAmountStyle();

    return (
      <RegularLayout header={header}>
        <View>
          <View style={{ alignItems: 'center' }}>
            <ProgressBar steps={6} currentStep={1} />
            <CelText align="center" type="H4" margin="30 0 60 0">How much would you like to borrow?</CelText>

            <View style={{ width: '100%' }}>
              <TouchableOpacity onPress={actions.toggleKeypad} style={{ width: '100%' }}>
                <CelText color={this.getAmountColor()} type="H1" align="center">{ formatter.usd(formData.loanAmount, { code: '', precision: 0 }) }</CelText>
                <View style={{ position: 'absolute', right: 0, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                  <CelText type="H3">USD</CelText>
                </View>
              </TouchableOpacity>
            </View>

            { this.renderButton() }
          </View>

          <CelNumpad
            field={"loanAmount"}
            value={formData.loanAmount}
            updateFormField={actions.updateFormField}
            setKeypadInput={actions.setKeypadInput}
            toggleKeypad={actions.toggleKeypad}
            onPress={this.handleAmountChange}
            purpose={KEYPAD_PURPOSES.AMOUNT}
          />
        </View>

        <BorrowConfirmModal
          formData={formData}
          onConfirm={() => actions.navigateTo('WalletLanding')}
        />
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(BorrowEnterAmount);
