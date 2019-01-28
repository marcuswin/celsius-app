import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import CelHeadingStyle from "./CelHeading.styles";
import stylesUtil from '../../../utils/styles-util';
import CelButton from '../../atoms/CelButton/CelButton';

@connect(
  state => ({
    style: CelHeadingStyle(state.ui.theme),
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelHeading extends Component {

  static propTypes = {
    type: PropTypes.oneOf(['regular']),
    back: PropTypes.bool,
    right: PropTypes.oneOf(['action', 'settings'])
  };
  static defaultProps = {
    type: 'regular',
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  getLeftContent = () => {
    const { back } = this.props;
    return (back &&
      <CelButton basic onPress={() => { }}>Back</CelButton>
    )
  }

  getRightContent = () => {
    const { right } = this.props;
    return {
      "action": <CelButton basic onPress={() => { }}>Action</CelButton>,
      "settings": <CelButton basic onPress={() => { }}>Settings</CelButton>
    }[right];
  }

  getHeaderContent = () => {
    const { type, style, children } = this.props
    return {
      'regular':
        <React.Fragment>
          <View style={style.left}>
            {this.getLeftContent()}
          </View>
          <View style={style.center}>
            {children}
          </View>
          <View style={style.right}>
            {this.getRightContent()}
          </View>
        </React.Fragment>
    }[type]
  }

  render() {
    const { style } = this.props
    const paddings = stylesUtil.getPadding("15 20 15 20")
    return (
      <SafeAreaView style={style.container}>
        <View style={[style.content, paddings]}>
          {this.getHeaderContent()}
        </View>
      </SafeAreaView>
    );
  }
}

export default testUtil.hookComponent(CelHeading);
