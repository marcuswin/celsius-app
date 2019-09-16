import React, { Component } from "react";
import { View, ScrollView, Animated, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
import DepositInfoModalStyle from "./DepositInfoModal.styles";
import CelModal from "../CelModal/CelModal";
import { MODALS } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import CelButton from "../../atoms/CelButton/CelButton";
import { widthPercentageToDP } from '../../../utils/styles-util';
import STYLES from '../../../constants/STYLES';

const cardWidth = widthPercentageToDP("70%");
const { width } = Dimensions.get('window');

@connect(
  state => ({
    currencies: state.currencies.rates
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class DepositInfoModal extends Component {

  static propTypes = {
    type: PropTypes.string
  };
  static defaultProps = {
    type: ""
  };

  constructor(props) {
    super(props);
    const { type, currencies } = props;
    let steps;


    const coinName = currencies.find(coin => coin.short === type);

    switch (type) {
      case "":
        steps = [
          {
            image: require("../../../../assets/images/stacked_coins.png"),
            title: "Only deposit same coin type as selected",
            description: "Depositing a different coin than selected will result in permanent loss of funds.",
            buttonText: "Continue"
          },
          {
            image: require("../../../../assets/images/stacked_coins.png"),
            title: "Review your transaction details carefully",
            description: "Depositing coins without all required data, such as Destination Tag (XRP) or MemoID (XLM), or incorrect data will result in permanent loss.",
            buttonText: "I understand"
          }
        ];
        break;
      case "XRP":
        steps = [
          {
            image: { uri: coinName.image_url },
            title: `Only deposit Ripple (XRP) to this wallet`,
            description: "Sending any other digital asset to this specific address, will result in permanent loss.",
            buttonText: "Continue"
          },
          {
            image: { uri: coinName.image_url },
            title: "Destination Tag is required to deposit XRP",
            description: "Sending funds without destination tag or with an incorrect one, will result in loss.",
            buttonText: "I understand"
          }
        ];
        break;
      case "XLM":
        steps = [
          {
            image: { uri: coinName.image_url },
            title: `Only deposit Stellar (XLM) to this wallet`,
            description: "Sending any other digital asset to this specific address, will result in permanent loss.",
            buttonText: "Continue"
          },
          {
            image: { uri: coinName.image_url },
            title: "Memo ID is required to deposit XLM",
            description: "Sending funds without memo ID or with an incorrect one, will result in loss.",
            buttonText: "I understand"
          }
        ];
        break;
      case "EOS":
        steps = [
          {
            image: { uri: coinName.image_url },
            title: `Only deposit EOS (EOS) to this wallet`,
            description: "Sending any other digital asset to this specific address, will result in permanent loss.",
          },
          {
            image: { uri: coinName.image_url },
            title: "Memo ID is required to deposit EOS",
            description: "Sending funds without memo ID or with an incorrect one, will result in loss.",
            buttonText: "I understand"
          }
        ];
        break;
      case "USDT ERC20":
        steps = [
          {
            image: { uri: coinName.image_url },
            title: `Please ensure only Tether ERC20 tokens are deposited to this address`,
            description: "Sending other USDT coins to this address (the Omni Layer version) may result in the permanent loss of funds.",
            buttonText: "I understand"
          }
        ];
        break;
      default:
        steps = [
          {
            image: { uri: coinName.image_url },
            title: `Only deposit ${coinName.displayName} (${type}) to this wallet`,
            description: "Sending any other digital asset to this specific address, will result in permanent loss.",
            buttonText: "I understand"
          }
        ];
    }

    this.state = {
      currentStep: 0,
      steps,
      xOffset: new Animated.Value(0),

    };
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


  renderText = () => {
    const { steps, xOffset } = this.state
    const { actions } = this.props
    const styles = DepositInfoModalStyle();

    return (
      < ScrollView >
        <Animated.ScrollView
          style={{ flexGrow: 1 }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: xOffset } } }],
            { useNativeDriver: true },

          )}
          onScrollEndDrag={this.scroll}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {steps.map((step, index) => (
            <Animated.View style={[styles.screen, this.transitionAnimation(index)]}>
              <CelText type='H2' align={"center"} weight='bold' style={styles.title}>{step.title}</CelText>
              <CelText type='H4' align={"center"} style={styles.description}>{step.description}</CelText>
              {step.buttonText && <CelButton margin={"20 0 20 0"} onPress={() => actions.closeModal()} >{step.buttonText}</CelButton>}
            </Animated.View>
          ))
          }
        </Animated.ScrollView>
      </ScrollView >
    )
  }

  renderDots() {
    const { steps } = this.state

    const position = Animated.divide(this.state.xOffset, width);

    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        {steps.map((_, i) => {
          const opacity = position.interpolate({
            inputRange: [i - 0.50000000001, i - 0.5, i, i + 0.5, i + 0.50000000001],
            outputRange: [0.3, 1, 1, 1, 0.3],
            extrapolate: 'clamp'
          })
          return (
            <Animated.View
              key={i}
              style={{ opacity, height: 10, width: 10, backgroundColor: STYLES.COLORS.MEDIUM_GRAY, margin: 8, borderRadius: 5 }}
            />
          );
        })
        }

      </View>
    );
  }

  render() {
    // const style = DepositInfoModalStyle();
    const { steps, currentStep } = this.state;

    return (
      <CelModal
        name={MODALS.DEPOSIT_INFO_MODAL}
        picture={steps[currentStep].image}
        pictureCircle
      >
        <View style={{ paddingTop: 40 }}>
          {steps.length > 1 && this.renderDots()}
          {this.renderText()}
        </View>

      </CelModal>
    );
  }
}

export default DepositInfoModal;
