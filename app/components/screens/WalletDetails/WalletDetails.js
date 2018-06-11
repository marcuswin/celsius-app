import React, { Component } from "react";
import { Content } from 'native-base';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';


import * as actions from "../../../redux/actions";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import {MainHeader} from "../../molecules/MainHeader/MainHeader";
import Message from "../../atoms/Message/Message";
import WalletDetailsHeading from "../../molecules/WalletDetailsHeading/WalletDetailsHeading";


@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    callsInProgress: state.api.callsInProgress,
    history: state.api.history,
    lastCompletedCall: state.api.lastCompletedCall,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class WalletDetails extends Component {

  render() {
    const { navigateTo } = this.props
    return (
      <BasicLayout bottomNavigation>
        <MainHeader 
          onCancel={() => navigateTo('WalletLanding')}
        />
        <WalletDetailsHeading />
        <Message />

        <Content style={{ paddingLeft: 40, paddingRight: 40 }} />
      </BasicLayout>
    )
  }
}

export default WalletDetails;
