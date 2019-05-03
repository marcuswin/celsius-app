import React, { Component } from 'react';
import PropTypes from "prop-types";
import { View, ScrollView, TouchableOpacity } from "react-native";

import testUtil from "../../../utils/test-util";
import CelText from '../../atoms/CelText/CelText';
import CelModal from "../CelModal/CelModal";
import { MODALS } from "../../../constants/UI";
import WithdrawInfoModalStyle from "./WithdrawInfoModal.styles";
import CelButton from "../../atoms/CelButton/CelButton";
import DotsBar from '../../atoms/DotsBar/DotsBar';

class WithdrawInfoModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    toggleKeypad: PropTypes.func,
    type: PropTypes.bool,
  };
  static defaultProps = {}

  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1,
      steps: [
        {
          image: require('../../../../assets/images/illustrations-v3/PolarBearHODL3x.png'),
          title: "Are you sure you want to withdraw CEL?",
          description: "Your earning and borrowing interest rates are determined by the amount of CEL you HODL vs. the amount you've ever had in-app. Each withdrawal will affect your rates. View our loyalty program.",
        },
        {
          image: require('../../../../assets/images/illustrations-v3/PolarBearSad3x.png'),
          title: "Immediate withdrawals under $20,000",
          description: "Celsius enables you to withdraw coins at any time. However, for your security when exceeding this limit withdrawals are delayed for up to twenty-four hours.",
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
        }
      ]
    };
  }

  continue = () => {
    const { currentStep } = this.state
    const { closeModal, toggleKeypad, type } = this.props

    if (type) {
      if (currentStep === 4) {
        if (toggleKeypad) toggleKeypad();
        closeModal();
      } else {
        this.setState({ currentStep: currentStep + 1 })
      }
    } else if (currentStep === 3) {
      if (toggleKeypad) toggleKeypad();
      closeModal();
    } else {
      this.setState({ currentStep: currentStep + 1 })
    }
  }

  buttonColor = () => {
    const styles = WithdrawInfoModalStyle();
    const { currentStep } = this.state;
    const { type } = this.props;

    const normalButton = [styles.modalButton]

    if (type) {
      if (currentStep !== 4) {
        normalButton.push(styles.whiteButton)
      }
      return (
        <View >
          {currentStep === 4 ? <CelButton style={normalButton} onPress={this.continue}>Continue</CelButton> : <CelButton ghost style={normalButton} onPress={this.continue}>Next tip </CelButton>}
        </View >
      )
    }
    if (currentStep !== 3) {
      normalButton.push(styles.whiteButton)
    }
    return (
      <View >
        {currentStep === 3 ? <CelButton style={normalButton} onPress={this.continue}>Continue</CelButton> : <CelButton ghost style={normalButton} onPress={this.continue}>Next tip </CelButton>}
      </View >
    )

  }

  renderStep() {
    const { steps, currentStep } = this.state;
    const { closeModal, type } = this.props
    const styles = WithdrawInfoModalStyle();
    const ButtonStyle = this.buttonColor;

    const three = steps.slice(1, 4)

    return (
      <View>
        <ScrollView>
          <CelText type='H2' bold style={styles.title}> {type ? steps[currentStep - 1].title : three[currentStep - 1].title}</CelText>
          <CelText type='H4' style={styles.description}>{type ? steps[currentStep - 1].description : three[currentStep - 1].description}</CelText>
          <View style={styles.button}>
            <ButtonStyle />
            <TouchableOpacity style={{ marginTop: 10 }} onPress={() => closeModal()}>
              <CelText> Skip </CelText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }

  render() {
    const styles = WithdrawInfoModalStyle();
    const { steps, currentStep } = this.state;
    const { type } = this.props;
    let numberOfSteps

    if (type) {
      numberOfSteps = 4
    } else {
      numberOfSteps = 3
    }

    return (
      <CelModal
        name={MODALS.WITHDRAW_INFO_MODAL}
        picture={steps[currentStep - 1].image}
      >
        <View style={styles.wrapper}>
          <View style={styles.progressBar}>
          <DotsBar length={numberOfSteps} currentStep={currentStep}/>
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
