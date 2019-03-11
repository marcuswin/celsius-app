import React, { Component } from 'react';
import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import AppearanceStyle from "./Appearance.styles";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import Separator from '../../atoms/Separator/Separator';
import STYLES from '../../../constants/STYLES';
import CircleButton from '../../atoms/CircleButton/CircleButton';
import { THEMES } from '../../../constants/UI';

@connect(
  state => ({
    theme: state.ui.theme
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class Appearance extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  static navigationOptions = () => ({
    title: "Appearance"
  });

  render() {
    const { theme, actions } = this.props;
    const style = AppearanceStyle();

    return (
      <RegularLayout>

        <View style={style.container}>

          <Separator color={STYLES.COLORS.DARK_GRAY_OPACITY}>COLOR THEME</Separator>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <CircleButton icon={theme === THEMES.LIGHT ? 'Close' : false} theme={theme} type="theme" style={[{ backgroundColor: '#fff' }, theme === THEMES.LIGHT ? {} : { borderColor: 'transparent' }]} onPress={() => { actions.setAppTheme(THEMES.LIGHT) }} />
            <CircleButton icon={theme === THEMES.DARK ? 'Close' : false} theme={theme} type="theme" style={[{ backgroundColor: STYLES.COLORS.DARK_BACKGROUND }, theme === THEMES.DARK ? {} : { borderColor: 'transparent' }]} onPress={() => { actions.setAppTheme(THEMES.DARK) }} />
            <CircleButton icon={theme === THEMES.CELSIUS ? 'Close' : false} theme={theme} type="theme" style={[{ backgroundColor: STYLES.COLORS.CELSIUS }, theme === THEMES.CELSIUS ? {} : { borderColor: 'transparent' }]} onPress={() => { actions.setAppTheme(THEMES.CELSIUS) }} />
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(Appearance);
