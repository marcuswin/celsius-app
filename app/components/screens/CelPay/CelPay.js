import React, { Component } from 'react';

import testUtil from "../../../utils/test-util";
import StaticScreen from "../StaticScreen/StaticScreen";
import { EMPTY_STATES } from "../../../constants/UI";


class CelPay extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      header: { title: "Choose a friend to CelPay", right: "search" }
    };
  }

  render() {
    const { header } = this.state;
    return (
      <StaticScreen
        header={header}
        emptyState={{ purpose: EMPTY_STATES.ERROR }}
      />
    );
  }
}

export default testUtil.hookComponent(CelPay);
