import React, { Component } from 'react';
import PropTypes from "prop-types";
import { View, ScrollView } from "react-native";

import testUtil from "../../../utils/test-util";
import CelText from '../../atoms/CelText/CelText';
import CelModal from "../CelModal/CelModal";
import { MODALS } from "../../../constants/UI";
import WithdrawInfoModalStyle from "./WithdrawInfoModal.styles";
import CelButton from "../../atoms/CelButton/CelButton";

import ProgressBar from "../../atoms/ProgressBar/ProgressBar";

class WithdrawInfoModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    toggleKeypad: PropTypes.func,
  };
  static defaultProps = {}

  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1,
      steps: [
        {
          image: require('../../../../assets/images/illustrations-v3/PolarBearHODL3x.png'),
          title: "Are you sure you want to withdraw?",
          description: "The longer you HODL and the more you HODL, the more interest you’ll earn with Celsius. Withdrawing your funds will reduce the amount of interest you could potentially earn.",
        },
        {
          image: require('../../../../assets/images/illustrations-v3/PolarBearSad3x.png'),
          title: "Daily withdrawal limit is $20,000",
          description: "For your security, if you would like to withdraw more than $20,000 worth of your coins, you will be required to contact us at app@celsius.network, or chat with a member of our team, so that we can verify your identity before transferring your funds.",
        },
        {
          image: require('../../../../assets/images/illustrations-v3/PolarBearFistUp3x.png'),
          title: "Don’t forget to check your withdrawal address",
          description: "Take a closer look at the address you wish to send your funds to. If you transferred money from an exchange, the address may not be correct. If you need to change your withdrawal address, please contact us at app@celsius.network, or chat with a member of our team.",
        },
        {
          image: require('../../../../assets/images/illustrations-v3/PolarBearFistUp3x.png'),
          title: "Transactions are safely secured with BitGo",
          description: "BitGo is a leading custodial service powering exchanges like Kraken and UPbit. Coins will be moved from time to time to exchanges or to Hedge funds borrowing coins in order to short the market, in this case, coins are converted to fiat and secured in an FDIC-insured bank account.",
        },
      ]
    };
  }

  continue = () => {
    const { currentStep } = this.state
    const { closeModal, toggleKeypad } = this.props

    if (currentStep === 4) {
      if (toggleKeypad) toggleKeypad();
      closeModal();
    } else {
      this.setState({ currentStep: currentStep + 1 })
    }
  }

  renderStep() {
    const { steps, currentStep } = this.state;
    const styles = WithdrawInfoModalStyle();
    return (
      <View>
        <ScrollView>
          <CelText type='H2' bold style={styles.title} > {steps[currentStep - 1].title}</CelText>
          <CelText type='H4' style={styles.description}>{steps[currentStep - 1].description}</CelText>
          <View style={styles.button}>
            <CelButton onPress={this.continue}>
              Continue
            </CelButton>
          </View>
        </ScrollView>
      </View>
    )
  }

  render() {
    const styles = WithdrawInfoModalStyle();
    const { steps, currentStep } = this.state;

    return (
      <CelModal
        name={MODALS.WITHDRAW_INFO_MODAL}
        picture={steps[currentStep - 1].image}
      >
        <View style={styles.wrapper}>
          <View style={styles.progressBar}>
            <ProgressBar
              steps={4}
              currentStep={currentStep} />
          </View>
          <View>
            {this.renderStep()}
          </View>
        </View>

      </CelModal>
    );
  }
}

export default testUtil.hookComponent(WithdrawInfoModal);
