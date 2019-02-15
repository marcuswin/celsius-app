import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import testUtil from "../../../utils/test-util";
import BalanceViewStyle from "./BalanceView.styles";
import CelText from '../../atoms/CelText/CelText';
import formatter from "../../../utils/formatter";
import Card from "../Card/Card";


const BalanceView = (props) => {
  const style = BalanceViewStyle();
  const {crypto, usd, coin, opacity} = props;

  return (
      <View style={[style.container]}>
        <Card  padding="10 10 10 10" opacity={opacity}>
          <CelText align="center" type="H7">
           New balance: { formatter.crypto(crypto, coin) } | { formatter.usd(usd)  }
          </CelText>
        </Card>
      </View>
    );
};

BalanceView.PropTypes = {
  usd: PropTypes.string,
  crypto: PropTypes.string,
};

export default testUtil.hookComponent(BalanceView);
