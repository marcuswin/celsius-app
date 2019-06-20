import React, { Component } from 'react';


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

export default Borrow
