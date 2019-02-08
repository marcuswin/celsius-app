import React, { Component } from 'react';
import { Animated } from 'react-native';
import { Svg } from 'expo';
import PropTypes from 'prop-types';

import testUtil from "../../../utils/test-util";
import { THEMES } from '../../../constants/UI';
import STYLES from '../../../constants/STYLES';

class Spinner extends Component {

  static propTypes = {
    theme: PropTypes.oneOf(Object.values(THEMES)),
    size: PropTypes.number
  };
  static defaultProps = {
    theme: THEMES.LIGHT,
    size: 50
  }

  constructor(props) {
    super(props);
    this.state = {
      spinValue: new Animated.Value(0)
    };
    this.animation = null;
  }

  componentDidMount = () => {
    this.animate();
  }

  componentWillUnmount = () => {
    this.animation.stop();
  }

  getColor = (theme) => {
    switch (theme) {
      case THEMES.LIGHT:
        return STYLES.COLORS.DARK_GRAY
      case THEMES.DARK:
        return STYLES.COLORS.WHITE
      case THEMES.CELSIUS:
        return STYLES.COLORS.DARK_GRAY
    }
  }

  repeat = () => {
    this.setState({ spinValue: new Animated.Value(0) })
    this.animate();
  }

  animate = () => {
    const { spinValue } = this.state;
    this.animation = Animated.timing(
      spinValue,
      {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
      }
    )
    this.animation.start(this.repeat)
  }

  render() {
    const { theme, size } = this.props
    const { spinValue } = this.state;

    // Second interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    const strokeColor = this.getColor(theme);
    const opacity = theme === THEMES.DARK ? 0.5 : 0.3;
    const style = [{ transform: [{ rotate: spin }], width: size, height: size, opacity }];
    return (
      <Animated.View style={style}>
        <Svg width={size} height={size} viewBox="0 0 100 100">
          <Svg.Circle cx="50" cy="50" r="40" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeDasharray="62.83185307179586" fill="transparent" />
        </Svg>
      </Animated.View>
    );
  }
}

export default testUtil.hookComponent(Spinner);
