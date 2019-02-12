import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import testUtil from "../../../utils/test-util";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import * as appActions from '../../../redux/actions';
import CoinSlider from '../../molecules/CoinSlider/CoinSlider';

@connect(
  state => ({
    currencies: state.currencies.rates
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
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

  handleCoinSelect = (coin) => {
    const { actions } = this.props;

    actions.getCoinAddress(coin.short);
  }

  render() {
    return (
      <RegularLayout header={{
        title: "Deposit coins",
        left: "back",
        right: "profile"
      }} padding={'20 0 40 0'}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <CoinSlider
            coinList={this.props.currencies}
            onCoinSelect={this.handleCoinSelect}
          />
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(Deposit);
