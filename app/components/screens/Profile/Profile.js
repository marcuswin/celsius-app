import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import ProfileStyle from "./Profile.styles";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';

@connect(
  state => ({
    style: ProfileStyle(state.ui.theme),
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Profile extends Component {

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
    // const { style } = this.props
    return (
      <RegularLayout header={{
        title: "Profile Screen",
        left: "back",
        right: "profile"
      }}>
        <CelText>Hello Profile</CelText>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(Profile);
