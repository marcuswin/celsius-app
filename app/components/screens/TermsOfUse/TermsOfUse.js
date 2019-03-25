import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import TermsOfUseStyle from "./TermsOfUse.styles";
import CelText from '../../atoms/CelText/CelText';
// import Terms from './Terms.txt'

@connect(
  () => ({
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TermsOfUse extends Component {
  static propTypes = {};
  static defaultProps = {}

  static navigationOptions = () => ({
    title: "TermsOfUse Screen",
    right: "profile"
  });

  componentDidMount = () => {

    // require('./Terms.txt').then(r => r.text()).then(text => console.log(text))
  };


  render() {
    // const style = TermsOfUseStyle();

    return (
        <CelText>Hello TermsOfUse</CelText>
    );
  }
}

export default testUtil.hookComponent(TermsOfUse);
