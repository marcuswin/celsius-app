import React, { Component } from "react";
import { View, Text } from "native-base";
import { TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import CelButton from "../../atoms/CelButton/CelButton";
import formatter from "../../../utils/formatter"

import * as actions from "../../../redux/actions";
import WalletDetailsHeadingStyle from "./WalletDetailsHeading.styles";
import Icon from "../../atoms/Icon/Icon";

@connect(
  state => ({
    nav: state.nav,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class WalletDetailsHeading extends Component {

  render() {
    return <View style={WalletDetailsHeadingStyle.root}>
      <View style={{position: "relative", width: '100%'}}>
        <Text style={WalletDetailsHeadingStyle.totalValueAmount}>{formatter.usd(6332900)}</Text>
        <Text style={WalletDetailsHeadingStyle.totalCoinAmount}>100 ETH</Text>
        <TouchableOpacity style={{position: 'absolute', top: 0, bottom: 0, left: 15, opacity: .4, justifyContent: 'center', alignItems: 'center'}} onPress={this.props.onPressPrevious}>
          <Icon name="IconChevronLeft" height='20' width='20' fill="white" viewBox="0 0 22 22" />
        </TouchableOpacity>
        <TouchableOpacity style={{position: 'absolute', top: 0, bottom: 0, right: 15, opacity: .4, justifyContent: 'center', alignItems: 'center'}} onPress={this.props.onPressNext}>
          <Icon name="IconChevronRight" height='20' width='20' fill="white" viewBox="0 0 22 22" />
        </TouchableOpacity>
      </View>
      <View style={WalletDetailsHeadingStyle.buttonWrapper}>
        <CelButton size="mini" white onPress={() => {this.props.navigateTo('AddFunds')}}>Add funds</CelButton>
      </View>
    </View>
  }
}

export default WalletDetailsHeading;


// todo - styles