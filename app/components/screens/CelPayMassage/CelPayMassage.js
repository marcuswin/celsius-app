import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import formatter from "../../../utils/formatter";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import CelPayMassageStyle from "./CelPayMassage.styles";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelButton from '../../../components/atoms/CelButton/CelButton';
import CelTextArea from '../../atoms/CelTextArea/CelTextArea';

@connect(
  state => ({
    walletSummary: state.wallet.summary,

  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelPayMassage extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {

  }

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: `Send to `,
        left: "back",
        right: "profile"
      }
    };
  }

  // Link coin and amount from previous screen 
  render() {
    const { header } = this.state;
    const { walletSummary, actions } = this.props;
    // const style = CelPayMassageStyle();

    return (
      <RegularLayout header={header}>
        <CelTextArea />
        <CelButton
          iconRight={"IconArrowRight"}
          margin="0 0 0 0"
          onPress={() => actions.navigateTo()} >
          Send {formatter.crypto(walletSummary.total_amount_usd)}
        </CelButton>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(CelPayMassage);
