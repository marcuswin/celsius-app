import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import React, { Component } from 'react';

import * as appActions from "../../../redux/actions";
import testUtil from "../../../utils/test-util";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelButton from '../../atoms/CelButton/CelButton';

@connect(
  () => ({
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Profile extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  static navigationOptions = () => ({
    title: "Profile Screen"
  });

  constructor(props) {
    super(props);
    this.state = {};
  }

  logoutUser = async () => {
    const { actions } = this.props;
    await actions.logoutUser();
  }

  render() {
    return (
      <RegularLayout>
        <CelText>Hello Profile</CelText>
        <CelButton onPress={this.logoutUser}>Logout</CelButton>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(Profile);
