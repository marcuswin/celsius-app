import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Animated, View, ScrollView, TouchableOpacity } from "react-native";


import formatter from "../../../utils/formatter";
import CelText from '../../atoms/CelText/CelText';
import CelModal from "../CelModal/CelModal";
import { MODALS } from "../../../constants/UI";
import WithdrawInfoModalStyle from "./WithdrawInfoModal.styles";
import CelButton from "../../atoms/CelButton/CelButton";
import DotsBar from '../../atoms/DotsBar/DotsBar';
import { widthPercentageToDP } from '../../../utils/styles-util';

const cardWidth = widthPercentageToDP("70%");

class WithdrawInfoModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    toggleKeypad: PropTypes.func,
    type: PropTypes.bool,
    withdrawalSettings: PropTypes.instanceOf(Object),
    index: PropTypes.number,
  };
  static defaultProps = {}

  constructor(props) {
    super(props);
    const { withdrawalSettings } = props

    this.state = {
      currentStep: 1,
      xOffset: new Animated.Value(0),
      steps: [
        {
          index: 1,
          image: require('../../../../assets/images/illustrations-v3/PolarBearHODL3x.png'),
          title: "Are you sure you want to withdraw CEL?",
          description: "A withdrawal could affect your membership interest rates. Rates are determined by your loyalty level: the amount of CEL you HODL vs. the amount of other assets you hold. Please view our loyalty program.",
        },
        {
          index: 2,
          image: require('../../../../assets/images/illustrations-v3/PolarBearSad3x.png'),
          title: `Immediate withdrawals under ${withdrawalSettings && formatter.usd(withdrawalSettings.maximum_withdrawal_amount)}`,
          description: "Celsius enables you to withdraw coins at any time. However, when exceeding this limit, withdrawals might be delayed for twenty-four (24) hours due to our security protocols.",
        },
        {
          index: 3,
          image: require('../../../../assets/images/illustrations-v3/PolarBearFistUp3x.png'),
          title: "Don’t forget to check your withdrawal address",
          description: "Celsius uses a smart-contract based wallet for ETH and ERC20 coins, some wallets and exchanges (e.g. Bitfinex) do not support transactions from a smart-contract source. We recommend a one time test withdrawal with a small sum. Contact app@celsius.network if you are unsure.",
        },
        {
          index: 4,
          image: require('../../../../assets/images/illustrations-v3/PolarBearFistUp3x.png'),
          title: "Transactions are safely secured with BitGo",
          description: "BitGo is a leading custodial service powering exchanges like Kraken and UPbit. Coins will be moved from time to time to exchanges or to Hedge funds borrowing coins in order to short the market, in this case, coins are converted to fiat and secured in an FDIC-insured bank account.",
        }
      ],

    };
  }

  closeModalHandler = () => {
    const { closeModal } = this.props
    closeModal()
    this.setState({ currentStep: 1 })
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.currentStep !== this.props.currentStep) {
  //   }
  // }

  scroll = () => {
    // const { type } = this.props
    // const { steps } = this.state
    // const three = steps.slice(1, 4)

    // console.log(currentStep, 'currentStep')
    
      // type ?
      //   steps.map((step) => (
      //     this.setState({ currentStep: step.index })
      //   )
      // )
      //   :
      //   three.map((step, index) => (
      //     this.setState({ currentStep: index })
      //   ))
    
  }

  continue = () => {
    const { currentStep } = this.state
    const { toggleKeypad, type } = this.props

    if (type) {
      if (currentStep === 4) {
        if (toggleKeypad) toggleKeypad();
        this.closeModalHandler();
      } else {
        this.setState({ currentStep: currentStep + 1 })
      }
    } else if (currentStep === 3) {
      if (toggleKeypad) toggleKeypad();
      this.closeModalHandler();
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



  transitionAnimation = (index) => ({
    transform: [
      { perspective: 800 },
      {
        scale: this.state.xOffset.interpolate({
          inputRange: [
            (index - 1) * cardWidth,
            index * cardWidth,
            (index + 1) * cardWidth
          ],
          outputRange: [0.9, 1, 0.9],
          extrapolate: "clamp"
        })
      }
    ]
  });

  renderStep() {
    const { steps, xOffset } = this.state;
    const { type } = this.props
    const styles = WithdrawInfoModalStyle();
    const ButtonStyle = this.buttonColor;

    const three = steps.slice(1, 4)
    // console.log(steps.index, 'INDEX 1')

    return (
      <View index={steps.index}>
        <ScrollView style={{ flexGrow: 1, }}
        // onScroll={this.scroll}
        >
          <Animated.ScrollView
            style={{ flexGrow: 1, }}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: xOffset } } }],
              { useNativeDriver: true },

            )}
            onScrollEndDrag={this.scroll}
            horizontal
            pagingEnabled
          >
            {type ?
              steps.map((step, index) => (
                <Animated.View key={steps.indexindex} style={[styles.screen, this.transitionAnimation(index)]}>
                  <CelText type='H2' weight='bold' style={styles.title}> {step.title}</CelText>
                  <CelText type='H4' style={styles.description}>{step.description}</CelText>
                </Animated.View>
              )
              )
              :
              three.map((step, index) => (
                <Animated.View key={steps.index} style={[styles.screen, this.transitionAnimation(index)]}>
                  <CelText type='H2' weight='bold' style={styles.title}> {step.title}</CelText>
                  <CelText type='H4' style={styles.description}>{step.description}</CelText>
                </Animated.View>
              ))
            }
          </Animated.ScrollView>
          <View style={styles.button}>
            <ButtonStyle />
            <TouchableOpacity style={{ marginTop: 10 }} onPress={this.closeModalHandler}>
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
    const { type, index } = this.props;
    let numberOfSteps

    // console.log(steps, 'INDEX')


    if (type) {
      numberOfSteps = 4
    } else {
      numberOfSteps = 3
    }

    return (
      <CelModal
        name={MODALS.WITHDRAW_INFO_MODAL}
        picture={steps[currentStep - 1].image}
        onClose={this.closeModalHandler}
        index={index}
      >
        <View style={styles.progressBar}>
          <DotsBar length={numberOfSteps} currentStep={currentStep} />
        </View>
        <View style={styles.wrapper}>
          <View>
            {this.renderStep()}
          </View>
        </View>
      </CelModal>
    );
  }
}

export default WithdrawInfoModal
