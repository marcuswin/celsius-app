import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
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
    header: PropTypes.instanceOf(Object).isRequired
  };
  static defaultProps = {
  }

  render() {
    const { style, children, header } = this.props
    return (
      <View style={style.container}>
        <CelHeading {...header}>
          {header.children ? header.children :
            <CelText style={style.headerTitle} align="center" type="H3">{header.title || ""}</CelText>
          }
        </CelHeading>
        <ScrollView keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag'>
          {children}
        </ScrollView>
      </View>
    );
  }
}

export default testUtil.hookComponent(RegularLayout);
