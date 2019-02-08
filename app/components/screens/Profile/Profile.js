import React, { Component } from 'react';

import testUtil from "../../../utils/test-util";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';


class Profile extends Component {

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
      <RegularLayout header={{
        title: "Profile Screen",
        left: "back",
        right: "profile"
      }}>
        <CelText>Hello Profile</CelText>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(Profile);
