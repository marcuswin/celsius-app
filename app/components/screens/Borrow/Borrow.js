import React, { Component } from 'react';

import testUtil from "../../../utils/test-util";
import LoadingScreen from "../LoadingScreen/LoadingScreen";


class Borrow extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      header: { title: "Enter the amount", right: "info" },
    };
  }

  render() {
    const { header } = this.state;
    return (
      <LoadingScreen
        header={header}
      />
    );
  }
}

export default testUtil.hookComponent(Borrow);
