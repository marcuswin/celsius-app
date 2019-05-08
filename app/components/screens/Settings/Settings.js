import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Constants } from "expo";

import * as appActions from "../../../redux/actions";
import testUtil from "../../../utils/test-util";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import STYLES from '../../../constants/STYLES';
import IconButton from '../../organisms/IconButton/IconButton';
import CelButton from '../../atoms/CelButton/CelButton';
import CelText from '../../atoms/CelText/CelText';
import { KYC_STATUSES } from "../../../constants/DATA";

const { revisionId } = Constants.manifest;

@connect(
  (state) => ({
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Settings extends Component {

  static propTypes = {
    // text: PropTypes.string
  };

  static defaultProps = {
  }

  static navigationOptions = () => ({
    title: "Settings",
    right: "logout"
  });

  componentDidMount() {
    const {actions} = this.props;
    actions.getUserAppSettings()
  }

  render() {
    const { actions, kycStatus } = this.props;

    const hasPassedKYC = kycStatus === KYC_STATUSES.passed

    return (
      <RegularLayout>
        {/* <IconButton onPress={() => actions.navigateTo("NotificationsSettings")} icon="Notifications">Notifications</IconButton> */}
        <IconButton onPress={() => actions.navigateTo("SecuritySettings")} margin="0 0 20 0" icon="Security">Security</IconButton>
        { hasPassedKYC && <IconButton onPress={() => actions.navigateTo("WalletSettings")} margin="0 0 20 0" icon="WalletSettings">Wallet</IconButton> }
        { hasPassedKYC && <IconButton onPress={() => actions.navigateTo("ApiAuthorization")} margin="0 0 20 0" icon="Api">API</IconButton> }
        {/* <IconButton onPress={() => actions.navigateTo("Appearance")} margin="0 0 20 0" icon="Appearance">Appearance</IconButton> */}
        <CelButton basic onPress={() => {actions.navigateTo('TermsOfUse')}} textColor={STYLES.COLORS.CELSIUS_BLUE}>See Terms of Use</CelButton>
        <CelText margin="30 0 0 0" weight="light" align='center' type="H7" style={{ opacity: 0.5 }}>Celsius App version: { revisionId }</CelText>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(Settings);
