import React, { Component } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';

import testUtil from "../../../utils/test-util";
import RegularLayoutStyle from "./RegularLayout.styles";
// import KeyboardShift from '../../../utils/keyboard-shift-util';
import stylesUtil from '../../../utils/styles-util';

class RegularLayout extends Component {

  static propTypes = {
    padding: PropTypes.string,
    enableParentScroll: PropTypes.bool
  };

  static defaultProps = {
    padding: '20 20 100 20',
    enableParentScroll: true
  };

  render() {
    const { theme, children, padding, enableParentScroll } = this.props;
    const style = RegularLayoutStyle(theme);
    const paddings = stylesUtil.getPadding(padding);
    return (
      <React.Fragment>
        <ScrollView keyboardShouldPersistTaps='handled' keyboardDismissMode='on-drag' scrollEnabled={enableParentScroll} style={style.container} contentContainerStyle={[{ flexGrow: 1 }, paddings]}>
          <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
            {/* <KeyboardShift>
            <React.Fragment> */}
            {children}
            {/* </React.Fragment>
            </KeyboardShift> */}
          </SafeAreaView>
        </ScrollView>
      </React.Fragment>
    );
  }
}

export default testUtil.hookComponent(RegularLayout);
