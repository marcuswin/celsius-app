import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import TodayInterestRatesModalStyle from "./TodayInterestRatesModal.styles";
import CelText from "../../atoms/CelText/CelText";
import CelModal from "../CelModal/CelModal";
import { MODALS } from "../../../constants/UI";
import InterestRateInfoTable from "../../molecules/InterestRateInfoTable/InterestRateInfoTable";

import { heightPercentageToDP } from "../../../utils/styles-util";
import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  state => ({
    interestRates: state.generalData.interestRates
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TodayInterestRatesModal extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { actions } = this.props;
    const style = TodayInterestRatesModalStyle();

    return (
      <CelModal name={MODALS.TODAY_INTEREST_RATES_MODAL}
                header
                primaryText={"HODL"}
                secondaryText={"with Celsius"}
                marginTop={heightPercentageToDP("5%")}
                height={heightPercentageToDP("90%")}
      >
        <CelText style={style.explanation}>Earn interest in CEL for all your coins to receive higher rates! The longer
          you HODL the better rates you earn.</CelText>
        <InterestRateInfoTable style={{ marginVertical: 20 }}/>

        <CelButton
          basic
          margin="15 0 0 0"
          onPress={() => actions.navigateTo("WalletLanding")}
        >
          See all
        </CelButton>

        <CelButton
          onPress={() => actions.navigateTo("WalletLanding")}
          margin="15 0 15 0"
        >
          Go to wallet
        </CelButton>
      </CelModal>
    );
  }
}

export default testUtil.hookComponent(TodayInterestRatesModal);
