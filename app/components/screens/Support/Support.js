import React, { Component } from 'react';

import testUtil from "../../../utils/test-util";
import StaticScreen from "../StaticScreen/StaticScreen";
import { EMPTY_STATES } from "../../../constants/UI";


class Support extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      header: {
        title: "Chat with support",
        right: "close"
      }
    };
  }

  render() {
    const { header } = this.state;
    return (
      <StaticScreen
        header={header}
        emptyState={{ purpose: EMPTY_STATES.USER_CLEARED }}
      />
    );
  }
}

export default testUtil.hookComponent(Support);
