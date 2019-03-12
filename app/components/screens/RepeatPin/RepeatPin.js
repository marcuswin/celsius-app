import React, { Component } from 'react';

import testUtil from "../../../utils/test-util";
import CelText from '../../atoms/CelText/CelText';
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';


class RepeatPin extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <AuthLayout>
        <CelText>Hello RepeatPin</CelText>
      </AuthLayout>
    );
  }
}

export default testUtil.hookComponent(RepeatPin);
