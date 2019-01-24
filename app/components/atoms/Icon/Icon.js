import React, { Component } from 'react';
import SvgIcon from 'react-native-svg-icon';
// import PropTypes from 'prop-types';
// import {} from 'react-native';

import testUtil from "../../../utils/test-util";

// import IconStyle from "./Icon.styles";
import Svgs from '../../../constants/SVGS';

class Icon extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };

    // binders
  }

  // lifecycle methods
  // event hanlders
  // rendering methods
  render() {
    const { name, fill } = this.props

    const viewBox = Svgs[`${name}ViewBox`] || this.props.viewBox;
    return <SvgIcon viewBox={viewBox} name={name} svgs={Svgs} fill={fill} />;
  }
}

export default testUtil.hookComponent(Icon);