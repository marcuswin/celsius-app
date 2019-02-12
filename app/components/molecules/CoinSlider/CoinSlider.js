import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';

import testUtil from "../../../utils/test-util";

import CircleButton from '../../atoms/CircleButton/CircleButton';
import CelText from '../../atoms/CelText/CelText';

class CoinSlider extends Component {

  static propTypes = {
    coinList: PropTypes.instanceOf(Array).isRequired,
    onCoinSelect: PropTypes.func
  };
  static defaultProps = {
    onCoinSelect: () => {}
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedCoinShortName: ''
    };
  }

  // lifecycle methods
  // event hanlders
  // rendering methods
  render() {
    const { selectedCoinShortName } = this.state;
    const { onCoinSelect } = this.props;
    return (
      <View>
        <CelText type="H4" align='center'>Choose coin to deposit</CelText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: 18}} contentContainerStyle={{paddingRight: 35}}>
          {this.props.coinList.map(coin =>
            <CircleButton
              key={coin.short}
              onPress={() => {
                onCoinSelect(coin);
                this.setState({selectedCoinShortName: coin.short})
              }}
              type="coin"
              icon={`Icon${coin.short}`}
              text={coin.displayName}
              style={{marginLeft: 35}}
              selectable
              isSelected={selectedCoinShortName === coin.short}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

export default testUtil.hookComponent(CoinSlider);
