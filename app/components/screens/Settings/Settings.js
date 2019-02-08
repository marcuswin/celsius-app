import React, { Component } from 'react';
import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import { THEMES } from "../../../constants/UI";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CircleButton from '../../atoms/CircleButton/CircleButton';
import STYLES from '../../../constants/STYLES';

@connect(
  state => ({
    theme: state.ui.theme
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Settings extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: "Settings",
        left: "back",
        right: "logout"
      }
    };
  }

  render() {
    const { theme, actions } = this.props;
    const { header } = this.state;

    return (
      <RegularLayout theme={theme} header={header}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CircleButton icon={theme === THEMES.LIGHT ? 'Close' : false} theme={theme} type="theme" style={[{ backgroundColor: '#fff' }, theme === THEMES.LIGHT ? {} : { borderColor: 'transparent' }]} onPress={() => { actions.setAppTheme(THEMES.LIGHT) }} />
          <CircleButton icon={theme === THEMES.DARK ? 'Close' : false} theme={theme} type="theme" style={[{ backgroundColor: STYLES.COLORS.DARK_BACKGROUND }, theme === THEMES.DARK ? {} : { borderColor: 'transparent' }]} onPress={() => { actions.setAppTheme(THEMES.DARK) }} />
          <CircleButton icon={theme === THEMES.CELSIUS ? 'Close' : false} theme={theme} type="theme" style={[{ backgroundColor: STYLES.COLORS.CELSIUS }, theme === THEMES.CELSIUS ? {} : { borderColor: 'transparent' }]} onPress={() => { actions.setAppTheme(THEMES.CELSIUS) }} />
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(Settings);
