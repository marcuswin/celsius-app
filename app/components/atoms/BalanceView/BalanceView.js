import React from 'react';
import PropTypes from 'prop-types';
import { View } from "react-native";

import testUtil from "../../../utils/test-util";
// import BalanceViewStyle from "./BalanceView.styles";
import CelText from '../../atoms/CelText/CelText';
import formatter from "../../../utils/formatter";
import Card from "../Card/Card";


const BalanceView = (props) => {
  // const style = BalanceViewStyle();
  const { crypto, usd, coin, opacity } = props;

  return (
    <Card backgroundColor={'red'} padding="10 10 10 10" opacity={opacity}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
        <CelText align='left' type='H7' >
          Balance:
              </CelText>
        <CelText align='right' type='H7'>
          {`${formatter.getEllipsisAmount(crypto, -5)} ${coin}`} | {`$${formatter.floor10(usd, -2)}`}
        </CelText>
      </View>
    </Card>
  );
};

BalanceView.propTypes = {
  usd: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  crypto: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default testUtil.hookComponent(BalanceView);
