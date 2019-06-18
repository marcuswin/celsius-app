import React, { Component } from 'react';
import SvgIcon from 'react-native-svg-icon';
import PropTypes from 'prop-types';
import { View } from 'react-native'

import testUtil from "../../../utils/test-util";
import Svgs from '../../../constants/SVGS';
import { getTheme } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";
import { THEMES } from "../../../constants/UI";

const iconColors = {
  primary: {
    [THEMES.LIGHT]: STYLES.COLORS.DARK_GRAY,
    [THEMES.DARK]: STYLES.COLORS.WHITE_OPACITY5,
  }
}

class Icon extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    fill: PropTypes.string
  };
  static defaultProps = {
    fill: '#000'
  }

  render() {
    const { name, fill, style } = this.props
    const theme = getTheme()
    let fillColor = fill;

    if (['primary'].includes(fill)) fillColor = iconColors[fill][theme]

    const viewBox = Svgs[`${name}ViewBox`] || this.props.viewBox;
    return ( 
      <View style={{overflow: 'hidden'}}>
        <SvgIcon 
          viewBox={viewBox}
          name={name} {...this.props}
          svgs={Svgs} fill={fillColor}
          style={[{ alignSelf: 'center', justifyContent: 'center' }, style]}
        />
      </View>
      )
  }
}

export default testUtil.hookComponent(Icon);
