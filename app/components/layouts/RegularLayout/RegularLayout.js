import React, { Component } from 'react';
import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import RegularLayoutStyle from "./RegularLayout.styles";
import CelHeading from '../../organisms/CelHeading/CelHeading';
import CelText from '../../atoms/CelText/CelText';

@connect(
  state => ({
    style: RegularLayoutStyle(state.ui.theme),
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class RegularLayout extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  render() {
    const { style, children } = this.props
    return (
      <View style={style.container}>
        <CelHeading type="regular" back right="action">
          <CelText style={style.headerTitle} align="center" type="H3">Label</CelText>
        </CelHeading>
        {children}
      </View>
    );
  }
}

export default testUtil.hookComponent(RegularLayout);
