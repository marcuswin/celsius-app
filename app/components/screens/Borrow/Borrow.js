import React, { Component } from 'react';

import testUtil from "../../../utils/test-util";
import LoadingScreen from "../LoadingScreen/LoadingScreen";


class Borrow extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  render() {
    return (
      <LoadingScreen/>
    );
  }
}

export default testUtil.hookComponent(Borrow);
