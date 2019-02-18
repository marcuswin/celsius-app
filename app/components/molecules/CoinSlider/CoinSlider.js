import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';

import testUtil from "../../../utils/test-util";

import CircleButton from '../../atoms/CircleButton/CircleButton';
import CelText from '../../atoms/CelText/CelText';

class CoinSlider extends Component {

  static propTypes = {
    coinList: PropTypes.instanceOf(Array).isRequired,
    updateFormField: PropTypes.func.isRequired,
    field: PropTypes.string.isRequired,
    value: PropTypes.string,
    onCoinSelect: PropTypes.func
  };

  static defaultProps ={
    onCoinSelect: () => {}
  };

  componentDidMount() {
    const { updateFormField, field, onCoinSelect, defaultSelected, value } = this.props;

    // On initial mount, if nothing set in redux state (value), preselect default coin if exists
    if (defaultSelected && !value) {
      onCoinSelect(defaultSelected);
      updateFormField(field, defaultSelected);
    }
  }

  render() {
    const { coinList, updateFormField, field, onCoinSelect, value } = this.props;

    return (
      <View>
        <CelText type="H4" align='center'>Choose coin to deposit</CelText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: 18}} contentContainerStyle={{paddingRight: 35}}>
          {coinList.map(coin =>
            <CircleButton
              key={coin.short}
              onPress={() => {
                onCoinSelect(coin.short);
                updateFormField(field, coin.short);
              }}
              type="coin"
              icon={`Icon${coin.short}`}
              text={coin.displayName}
              style={{marginLeft: 35}}
              selectable
              isSelected={value === coin.short}
            />
          )}
        </ScrollView>
      </View>
    )
  }
}

export default testUtil.hookComponent(CoinSlider);
