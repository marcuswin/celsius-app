import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import RegisterPromoCodeModalStyle from "./RegisterPromoCodeModal.styles";
import CelText from "../../atoms/CelText/CelText";
import { MODALS } from "../../../constants/UI";
import CelModal from "../CelModal/CelModal";
import CelInput from "../../atoms/CelInput/CelInput";
import CelButton from "../../atoms/CelButton/CelButton";
import { BRANCH_LINKS } from "../../../constants/DATA";

@connect(
  state => ({
    formData: state.forms.formData,
    formErrors: state.forms.formErrors,
    promoCode: state.branch.promoCode,
    referralLink: state.branch.registeredLink
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class RegisterPromoCodeModal extends Component {

  static propTypes = {
    type: PropTypes.oneOf(["celsius", "register"])
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      confirmed: false
    };
  }

  componentDidMount() {
    const {actions} = this.props;
    actions.updateFormFields({ promoCode: null });
  }

  proceed = () => {
    this.setState({
      confirmed: true
    });
  };

  confirm = () => {
    const { actions, type } = this.props;


    if (type === "celsius") {
      actions.submitProfileCode(this.proceed);
    }

    if (type === "register") {
      actions.registrationPromoCode(this.proceed);
    }
  };

  render() {
    const { confirmed } = this.state;
    const { formData, actions, formErrors, promoCode, type, referralLink } = this.props;
    const style = RegisterPromoCodeModalStyle();
    const code = {};

    let congratsText
    if (type === "celsius" && promoCode) {
      code.amount = promoCode.referred_award_amount;
      code.coin = promoCode.referred_award_coin
      congratsText = `You have received ${code.amount} ${code.coin}. You can now see it in your wallet.`
    }

    if (type === "register" && referralLink) {
      code.amount = referralLink.referred_award_amount;
      code.coin = referralLink.link_type === BRANCH_LINKS.INDIVIDUAL_REFERRAL ? 'USD' : referralLink.referred_award_coin
      congratsText = referralLink.link_type === BRANCH_LINKS.INDIVIDUAL_REFERRAL
        ? 'You will receive bonus $10 in BTC distributed after initial deposit of $1,000 or more in the first five days. Additional $10 bonus distributed after keeping $1,000 or more for 90 days. Wallet balance value is based on time of deposit.'
        : `You have received ${code.amount} ${code.coin}. You can now see it in your wallet.`
    }

    return (
      <CelModal
        picture={confirmed ? require("../../../../assets/images/victory-bear3x.png") : require("../../../../assets/images/money-bear3x.png")}
        name={MODALS.REGISTER_PROMO_CODE_MODAL}
        style={style.container}
      >

        {!confirmed ?
          <View>
            <CelText margin={"40 0 10 0"} align={"center"} type={"H2"} weight={"700"}>Enter a promo code</CelText>

            <CelInput margin="0 0 20 0" type="text" field="promoCode" placeholder="Promo code"
                      value={formData.promoCode} error={formErrors.promoCode}/>

            <CelButton
              onPress={() => this.confirm()}
            >
              Confirm
            </CelButton>
          </View> : null
        }

        {confirmed ?
          <View>
            <CelText margin={"20 0 10 0"} align={"center"} type={"H2"} weight={"700"}>Congrats!</CelText>
            <CelText margin={"10 0 30 0"} align={"center"} type={"H4"} weight={"300"}>{ congratsText }</CelText>
            <CelButton
              onPress={() => {
                actions.closeModal();
              }}
            >
              Continue
            </CelButton>
          </View> : null
        }

      </CelModal>
    );
  }
}

export default testUtil.hookComponent(RegisterPromoCodeModal);
