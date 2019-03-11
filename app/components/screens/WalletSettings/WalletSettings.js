import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import WalletSettingsStyle from "./WalletSettings.styles";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import Separator from '../../atoms/Separator/Separator';
import STYLES from '../../../constants/STYLES';
import IconButton from '../../organisms/IconButton/IconButton';

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WalletSettings extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  static navigationOptions = () => ({
    title: "WalletSettings"
  });

  render() {

    return (
      <RegularLayout>
        <IconButton>Default currency</IconButton>
        <IconButton margin="0 0 20 0">Default view</IconButton>
        <Separator color={STYLES.COLORS.DARK_GRAY_OPACITY}>INTEREST</Separator>
        <IconButton>Earn interest in</IconButton>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(WalletSettings);