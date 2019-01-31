import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import RegularLayoutStyle from "./RegularLayout.styles";
import CelHeading from '../../organisms/CelHeading/CelHeading';
import CelText from '../../atoms/CelText/CelText';
import KeyboardShift from '../../../utils/keyboard-shift-util';
import stylesUtil from '../../../utils/styles-util';
import { THEMES } from '../../../constants/UI';

@connect(
  state => ({
    lastSavedTheme: state.ui.theme,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class RegularLayout extends Component {

  static propTypes = {
    header: PropTypes.instanceOf(Object).isRequired,
    padding: PropTypes.string,
    theme: PropTypes.oneOf(Object.values(THEMES))
  };
  static defaultProps = {
    padding: '20 20 20 20'
  }

  render() {
    const { theme, lastSavedTheme, children, header, padding } = this.props
    const style = RegularLayoutStyle(theme || lastSavedTheme)
    const paddings = stylesUtil.getPadding(padding);
    return (
      <React.Fragment>
        <CelHeading {...header}>
          {header.children ? header.children :
            <CelText style={style.headerTitle} align="center" type="H3">{header.title || ""}</CelText>
          }
        </CelHeading>

        <ScrollView keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag' style={[style.container, paddings]}>
          <KeyboardShift>
            <View>
              {children}
            </View>
          </KeyboardShift>
        </ScrollView>

      </React.Fragment>
    );
  }
}

export default testUtil.hookComponent(RegularLayout);