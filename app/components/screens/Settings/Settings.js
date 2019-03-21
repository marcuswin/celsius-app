import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import testUtil from "../../../utils/test-util";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import STYLES from '../../../constants/STYLES';
import IconButton from '../../organisms/IconButton/IconButton';
import CelButton from '../../atoms/CelButton/CelButton';
import CelText from '../../atoms/CelText/CelText';

@connect(
  () => ({}),
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

  render() {
    const { actions } = this.props;

    return (
      <RegularLayout>
        {/* <IconButton onPress={() => actions.navigateTo("NotificationsSettings")} icon="Notifications">Notifications</IconButton> */}
        <IconButton onPress={() => actions.navigateTo("SecuritySettings")} margin="0 0 20 0" icon="Security">Security</IconButton>
        {/* <IconButton onPress={() => actions.navigateTo("WalletSettings")} margin="0 0 20 0" icon="WalletSettings">Wallet</IconButton> */}
        <IconButton onPress={() => actions.navigateTo("ApiAuthorization")} margin="0 0 20 0" icon="Api">API</IconButton>
        {/* <IconButton onPress={() => actions.navigateTo("Appearance")} margin="0 0 20 0" icon="Appearance">Appearance</IconButton> */}
        <CelButton basic onPress={() => { }} textColor={STYLES.COLORS.CELSIUS_BLUE}>See Terms of Use</CelButton>
        <CelText>App Version - 3.0</CelText>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(Settings);
