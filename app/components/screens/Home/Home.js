import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Constants } from "expo";

import * as appActions from "../../../redux/actions";
import { KYC_STATUSES } from "../../../config/constants/common";
import store from "../../../redux/store";
import { shouldRenderInitialIdVerification } from "../../../utils/user-util";
import Message from "../../atoms/Message/Message";
import ProgressBar from "../../atoms/ProgressBar/ProgressBar";
import {STYLES} from "../../../config/constants/style";
import { heightPercentageToDP } from "../../../utils/scale";

const { CLIENT_VERSION, ENV } = Constants.manifest.extra;

@connect(
  state => ({
    appInitialized: state.app.appInitialized,
    user: state.users.user,
    expiredSession: state.users.expiredSession,
    displayedRatesModal: state.ui.showedTodayRatesOnOpen,
    appSettings: state.users.appSettings,
    openedModal: state.ui.openedModal,
    userActions: state.ui.userActions,
    callsInProgress: state.api.callsInProgress,
    branchHashes: state.transfers.branchHashes,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class HomeScreen extends Component {
  state = {
    progress: 0,
  };

  async componentWillMount() {
    const { actions, appInitialized } = this.props;
    if (!appInitialized) actions.appInitStart();

    if (['PREPROD', 'PRODUCTION'].indexOf(ENV) !== -1 &&
      CLIENT_VERSION !== store.getState().generalData.backendStatus.client_version) {

      store.dispatch(actions.showMessage(
        'warning',
        ['When Update?', '', 'Right now! Please head to the app store and download the newest update. Stay cool.'].join('\n'),
      ));
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(state => ({
        progress: state.progress + 0.2,
      }));
    }, 500);
  }

  componentWillReceiveProps = (nextProps) => {
    const { appInitialized, actions } = this.props
    if (nextProps.appInitialized && nextProps.activeScreen === 'Home' && appInitialized !== nextProps.appInitialized) {
      return this.navigateToFirstScreen();
    }
    if (appInitialized === true && nextProps.appInitialized === false) {
      return actions.appInitStart();
    }
  };

  componentDidUpdate() {
    const { actions } = this.props;
    actions.refreshBottomNavigation();
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
    const { user, userActions, actions } = this.props;

    if (!user) return actions.navigateTo('Welcome');

    if (!user.first_name || !user.last_name) return actions.navigateTo('SignupTwo');
    if (!user.has_pin) return actions.navigateTo('CreatePasscode');
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
  }

  renderLoadingScreen = () => (
    <View>
      <Message/>
      <View style={{backgroundColor: STYLES.PRIMARY_BLUE, height: "100%", width: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: heightPercentageToDP("8.5%")}}>
      <Image source={require('../../../../assets/images/celsius-logo3x.png')} style={{ resizeMode: "contain", height: heightPercentageToDP("32.5%"), width: heightPercentageToDP("32.5%"), marginBottom: 40 }}/>
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
