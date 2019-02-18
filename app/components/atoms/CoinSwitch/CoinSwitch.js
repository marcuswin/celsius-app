import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';

import testUtil from "../../../utils/test-util";

import CoinSwitchStyle from "./CoinSwitch.styles";
import CelText from "../CelText/CelText";
import formatter from "../../../utils/formatter";
import Icon from "../Icon/Icon";

const CoinSwitch = (props) => {
  const style = CoinSwitchStyle()
  const { isUsd, amountUsd, amountCrypto, updateFormField, coin } = props;

  const upperValue = isUsd ? formatter.usd(amountUsd) : formatter.crypto(amountCrypto);
  const lowerValue = !isUsd ? formatter.usd(amountUsd) : formatter.crypto(amountCrypto, coin);
  return (
    <View style={style.container}>
      { props.onAmountPress ? (
        <TouchableOpacity onPress={props.onAmountPress} style>
          <CelText align="center" type="H1">{ upperValue }</CelText>
          <CelText align="center" type="H2">{ lowerValue }</CelText>
        </TouchableOpacity>
      ) : (
        <View style>
          <CelText align="center" type="H1">{ upperValue }</CelText>
          <CelText align="center" type="H2">{ lowerValue }</CelText>
        </View>
      )}
      <View style={style.switchButton}>
        <TouchableOpacity onPress={() => updateFormField('isUsd', !isUsd)}>
          <Icon name="Switch" width="30" height="30" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

CoinSwitch.propTypes = {
  isUsd: PropTypes.bool,
  amountUsd: PropTypes.string,
  amountCrypto: PropTypes.string,
  updateFormField: PropTypes.func.isRequired,
  onAmountPress: PropTypes.func,
  coin: PropTypes.string,
}

export default testUtil.hookComponent(CoinSwitch);
