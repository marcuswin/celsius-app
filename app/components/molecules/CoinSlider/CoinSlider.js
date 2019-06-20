import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';



import CircleButton from '../../atoms/CircleButton/CircleButton';

class CoinSlider extends Component {

  static propTypes = {
    coinList: PropTypes.instanceOf(Array).isRequired,
    updateFormField: PropTypes.func.isRequired,
    field: PropTypes.string.isRequired,
    value: PropTypes.string,
    defaultSelected: PropTypes.string,
    onCoinSelect: PropTypes.func
  };

  static defaultProps ={
    onCoinSelect: () => {},
    defaultSelected: '',
    value: ''
  };

  componentDidMount() {
    const { updateFormField, field, onCoinSelect, defaultSelected } = this.props;

    if (defaultSelected) {
      onCoinSelect(defaultSelected);
      updateFormField(field, defaultSelected);
    }
  }

  render() {
    const { coinList, updateFormField, field, onCoinSelect, value } = this.props;

    return (
      <View>
        {/* <CelText type="H4" align='center'>Choose coin to deposit</CelText> */}
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

export default CoinSlider
