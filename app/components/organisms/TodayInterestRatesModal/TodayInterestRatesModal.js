import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import TodayInterestRatesModalStyle from "./TodayInterestRatesModal.styles";
import CelText from '../../atoms/CelText/CelText';
import CelModal from "../CelModal/CelModal";
import UI, { EMPTY_STATES } from "../../../constants/UI";
import EmptyState from "../../atoms/EmptyState/EmptyState";

const { MODALS } = UI

@connect(
  state => ({
    interestRates: state.generalData.interestRates,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TodayInterestRatesModal extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const style = TodayInterestRatesModalStyle();
    return (
      <CelModal name={MODALS.TODAY_INTEREST_RATES_MODAL}>
        <CelText>Earn interest in CEL for all your coins to receive higher rates! The longer you HODL the better rates you earn.</CelText>
        <EmptyState purpose={EMPTY_STATES.UNDER_CONSTRUCTION}/>
      </CelModal>
    );
  }
}

export default testUtil.hookComponent(TodayInterestRatesModal);
