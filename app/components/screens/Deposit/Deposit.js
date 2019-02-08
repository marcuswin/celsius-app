import React, { Component } from 'react';
import { View } from 'react-native';

import testUtil from "../../../utils/test-util";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelText from '../../atoms/CelText/CelText';
import CircleButton from '../../atoms/CircleButton/CircleButton';

class Deposit extends Component {

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
        title: "Deposit coins",
        left: "back",
        right: "profile"
      }}>
        <CelText type="H4">Choose coin to deposit</CelText>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CircleButton type="coin" icon="IconBTC" text="Bitcoin" />
          <CircleButton type="coin" icon="IconETH" text="Ethereum" />
          <CircleButton type="coin" icon="IconLTC" text="Litecoin" />
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(Deposit);
