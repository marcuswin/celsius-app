import React, { Component } from 'react';


import StaticScreen from "../StaticScreen/StaticScreen";
import { EMPTY_STATES } from "../../../constants/UI";


class Support extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  static navigationOptions = () => ({
    title: 'Chat with support',
  })

  render() {
    return (
      <StaticScreen
        emptyState={{ purpose: EMPTY_STATES.USER_CLEARED }}
      />
    );
  }
}

export default Support
