import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import { KYC_STATUSES } from "../../../config/constants/common";
import {
  shouldRenderInitialIdVerification
} from "../../../utils/user-util";
import Message from "../../atoms/Message/Message";
import ProgressBar from "../../atoms/ProgressBar/ProgressBar";
import { STYLES } from "../../../config/constants/style";
import { heightPercentageToDP } from "../../../utils/scale";

let interval;

@connect(
  state => ({
    appInitialized: state.app.appInitialized,
    user: state.users.user,
    isAppAllowed: state.users.compliance.app.allowed,
    expiredSession: state.users.expiredSession,
    displayedRatesModal: state.ui.showedTodayRatesOnOpen,
    appSettings: state.users.appSettings,
    openedModal: state.ui.openedModal,
    userActions: state.ui.userActions,
    callsInProgress: state.api.callsInProgress,
    branchHashes: state.transfers.branchHashes,
    activeScreen: state.nav.routes[state.nav.index].routeName,
    previousScreen: state.nav.routes[state.nav.index - 1] ? state.nav.routes[state.nav.index - 1].routeName : null
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class HomeScreen extends Component {
  state = {
    progress: 0,
  };

  async componentWillMount() {
    const { actions, appInitialized } = this.props;
    if (!appInitialized) await actions.appInitStart();
  }

  componentDidMount = async () => {
    interval = setInterval(() => {
      this.setState(state => ({
        progress: state.progress + 0.2,
      }));
    }, 500);
  };

  componentWillReceiveProps = (nextProps) => {
    const { appInitialized, actions, activeScreen } = this.props;

    if (nextProps.appInitialized && nextProps.activeScreen === 'Home' && appInitialized !== nextProps.appInitialized) {
      return this.navigateToFirstScreen();
    }
    if (appInitialized === true && nextProps.appInitialized === false) {
      return actions.appInitStart();
    }

    if (activeScreen === 'Home' || nextProps.activeScreen === 'Home') {
      actions.refreshBottomNavigation();
    }
  };

  componentWillUnmount() {
    clearInterval(interval);
  }

  loginPasscode = () => {
    const { actions, userActions } = this.props;

    if (!userActions.enteredInitialPin) {
      actions.fireUserAction('enteredInitialPin');
      actions.openInitialModal();
      actions.navigateTo('Home');
    }
  };

  navigateToFirstScreen = () => {
    const { user, userActions, actions, isAppAllowed } = this.props;

    if (!user) return actions.navigateTo('Welcome');

    if (!user.first_name || !user.last_name) return actions.navigateTo('SignupTwo');
    if (!user.has_pin) return actions.navigateTo('CreatePasscode');

    if (!isAppAllowed) return actions.navigateTo("Compliance");

    if (shouldRenderInitialIdVerification(userActions)) {
      return actions.navigateTo('VerifyIdentity', {
        verificationCallback: this.loginPasscode,
        label: "login",
        help: true,
        backButton: false,
      });
    }

    if (!user.kyc || (user.kyc && user.kyc.status !== KYC_STATUSES.passed)) return actions.navigateTo('NoKyc');
    return actions.navigateTo('WalletBalance');
  };

  renderLoadingScreen = () => (
    <View>
      <Message />
      <View style={{ backgroundColor: STYLES.PRIMARY_BLUE, height: "100%", width: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: heightPercentageToDP("8.5%") }}>
        <Image source={require('../../../../assets/images/celsius-logo3x.png')} style={{ resizeMode: "contain", height: heightPercentageToDP("32.5%"), width: heightPercentageToDP("32.5%"), marginBottom: 40 }} />
        <ProgressBar
          progress={this.state.progress}
          duration={500}
        />
      </View>
    </View>
  )

  render() {
    // const { appInitialized } = this.props;
    // if (!appInitialized) return this.renderLoadingScreen();
    // return null;
    return this.renderLoadingScreen();
  }
}

export default HomeScreen;
