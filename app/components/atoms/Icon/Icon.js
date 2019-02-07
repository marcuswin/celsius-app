import React, { Component } from 'react';
import SvgIcon from 'react-native-svg-icon';
import PropTypes from 'prop-types';

import testUtil from "../../../utils/test-util";
import Svgs from '../../../constants/SVGS';

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

    const viewBox = Svgs[`${name}ViewBox`] || this.props.viewBox;
    return <SvgIcon viewBox={viewBox} name={name} svgs={Svgs} fill={fill} {...this.props} style={[{ alignSelf: 'center', justifyContent: 'center' }, style]} />;
  }
}

export default testUtil.hookComponent(Icon);