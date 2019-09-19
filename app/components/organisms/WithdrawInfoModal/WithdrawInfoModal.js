import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Animated, View, ScrollView} from "react-native";


import formatter from "../../../utils/formatter";
import CelModal from "../CelModal/CelModal";
import { MODALS } from "../../../constants/UI";
import WithdrawInfoModalStyle from "./WithdrawInfoModal.styles";
// import { widthPercentageToDP } from '../../../utils/styles-util';
// import STYLES from '../../../constants/STYLES';

// const cardWidth = widthPercentageToDP("70%");
// const { width } = Dimensions.get('window');

class WithdrawInfoModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    toggleKeypad: PropTypes.func,
    type: PropTypes.string,
    withdrawalSettings: PropTypes.instanceOf(Object),
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
          image: require('../../../../assets/images/illustrations-v3/PolarBearHODL3x.png'),
          title: "Are you sure you want to withdraw CEL?",
          description: "A withdrawal could affect your membership interest rates. Rates are determined by your loyalty level: the amount of CEL you HODL vs. the amount of other assets you hold. Please view our loyalty program.",
        },
        {
          image: require('../../../../assets/images/illustrations-v3/PolarBearSad3x.png'),
          title: `Immediate withdrawals under ${withdrawalSettings && formatter.usd(withdrawalSettings.maximum_withdrawal_amount)}`,
          description: "Celsius enables you to withdraw coins at any time. However, when exceeding this limit, withdrawals might be delayed for twenty-four (24) hours due to our security protocols.",
        },
        {
          image: require('../../../../assets/images/illustrations-v3/PolarBearFistUp3x.png'),
          title: "Don’t forget to check your withdrawal address",
          description: "Celsius uses a smart-contract based wallet for ETH and ERC20 coins, some wallets and exchanges (e.g. Bitfinex) do not support transactions from a smart-contract source. We recommend a one time test withdrawal with a small sum. Contact app@celsius.network if you are unsure.",
        },
        {
          image: require('../../../../assets/images/illustrations-v3/PolarBearFistUp3x.png'),
          title: "Transactions are safely secured with BitGo",
          description: "BitGo is a leading custodial service powering exchanges like Kraken and UPbit. Coins will be moved from time to time to exchanges or to Hedge funds borrowing coins in order to short the market, in this case, coins are converted to fiat and secured in an FDIC-insured bank account.",
        },

      ],

    };
  }


  scroll = () => {
    this.continue()
    // this.buttonColor()

  }

  continue = () => {
    const { currentStep } = this.state
    const { toggleKeypad, type } = this.props

    if (type) {
      if (currentStep === 4) {
        if (toggleKeypad) toggleKeypad();
      } else {
        this.setState({ currentStep: currentStep + 1 })
      }
    } else if (currentStep === 3) {
      if (toggleKeypad) toggleKeypad();
    } else {
      this.setState({ currentStep: currentStep + 1 })
    }

  }
  closeModalHandler = () => {
    const { closeModal } = this.props
    closeModal()
    this.setState({ currentStep: 1 })
  }

  buttonColor = () => {
    const styles = WithdrawInfoModalStyle();
    const { currentStep } = this.state;
    const { type } = this.props;

    const normalButton = [styles.modalButton]
    if (type) {
      if (currentStep !== 4) {
        normalButton.push(styles.whiteButton)
        //   }
        //   return (
        //     <View >
        //       {currentStep === 4 ? <CelButton style={normalButton} onPress={this.closeModalHandler}>Continue</CelButton> : <CelButton ghost style={normalButton} onPress={this.continue}>Next tip </CelButton>}
        //     </View >
        //   )
        // }
        // if (currentStep !== 3) {
        //   normalButton.push(styles.whiteButton)
        // }
        // return (
        //   <View >
        //     {step[index] ? <CelButton style={normalButton} onPress={this.closeModalHandler}>Continue</CelButton> : <CelButton ghost style={normalButton} onPress={this.continue}>Next tip </CelButton>}
        //   </View >
        // )

      }
    }
  }

  // transitionAnimation = (index) => ({
  //   transform: [
  //     { perspective: 800 },
  //     {
  //       scale: this.state.xOffset.interpolate({
  //         inputRange: [
  //           (index - 1) * cardWidth,
  //           index * cardWidth,
  //           (index + 1) * cardWidth
  //         ],
  //         outputRange: [0.9, 1, 0.9],
  //         extrapolate: "clamp"
  //       })
  //     }
  //   ]
  // });

  // renderDots() {
  //   const { steps } = this.state

  //   const position = Animated.divide(this.state.xOffset, width);

  //   return (
  //     <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
  //       {steps.map((_, i) => {
  //         const opacity = position.interpolate({
  //           inputRange: [i - 0.50000000001, i - 0.5, i, i + 0.5, i + 0.50000000001],
  //           outputRange: [0.3, 1, 1, 1, 0.3],
  //           extrapolate: 'clamp'
  //         })
  //         return (
  //           <Animated.View
  //             key={i + 1}
  //             style={{ opacity, height: 10, width: 10, backgroundColor: STYLES.COLORS.MEDIUM_GRAY, margin: 8, borderRadius: 5 }}
  //           />
  //         );
  //       })
  //       }

  //     </View>
  //   );
  // }

  // renderStep() {
  //   const { steps, xOffset } = this.state;
  //   const { type } = this.props
  //   const styles = WithdrawInfoModalStyle();
  //   // const ButtonStyle = this.buttonColor;

  //   const three = steps.slice(1, 4)

  //   return (
  //     <View>
  //       <ScrollView>
  //         <Animated.ScrollView
  //           style={{ flexGrow: 1, }}
  //           scrollEventThrottle={16}
  //           onScroll={Animated.event(
  //             [{ nativeEvent: { contentOffset: { x: xOffset } } }],
  //             { useNativeDriver: true },

  //           )}
  //           onScrollEndDrag={this.scroll}
  //           horizontal
  //           pagingEnabled
  //           showsHorizontalScrollIndicator
  //         >
  //           {type ?
  //             steps.map((step, index) => (
  //               <Animated.View style={[styles.screen, this.transitionAnimation(index)]}>
  //                 <CelText type='H2' weight='bold' style={styles.title}> {step.title}</CelText>
  //                 <CelText type='H4' style={styles.description}>{step.description}</CelText>
  //               </Animated.View>
  //             )
  //             )
  //             :
  //             three.map((step, index) => (
  //               <Animated.View style={[styles.screen, this.transitionAnimation(index)]}>
  //                 <CelText type='H2' weight='bold' style={styles.title}> {step.title}</CelText>
  //                 <CelText type='H4' style={styles.description}>{step.description}</CelText>
  //               </Animated.View>
  //             ))
  //           }
  //         </Animated.ScrollView>
  //         <View style={styles.button}>
  //           {/* <ButtonStyle /> */}
  //           <TouchableOpacity style={{ marginTop: 10 }} onPress={this.closeModalHandler}>
  //             <CelText> Skip </CelText>
  //           </TouchableOpacity>
  //         </View>
  //       </ScrollView>
  //     </View>
  //   )
  // }

  renderImage() {
    const { steps, xOffset } = this.state;
    const styles = WithdrawInfoModalStyle();

    return (
      <ScrollView>
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
          showsHorizontalScrollIndicator
        >
          {steps.forEach((step, index) => (
            <Animated.View style={[styles.screen, this.transitionAnimation(index)]}>
              {step.image}
            </Animated.View>
          )
          )}
        </Animated.ScrollView>
      </ScrollView>
    )

  }

  render() {
    const { steps } = this.state
    const { type } = this.props

    return (
      <CelModal
        name={MODALS.WITHDRAW_INFO_MODAL}
        // picture={this.renderImage()}
        onClose={this.closeModalHandler}
        // content={true}
        modalInfo={steps}
        type={type}
      >
        <View style={{ paddingTop: 20 }}>
          {/* {this.renderDots()} */}
          {/* {this.renderStep()} */}
        </View>
      </CelModal>
    );
  }
}

export default WithdrawInfoModal
