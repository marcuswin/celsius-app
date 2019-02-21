import React from 'react';
import PropTypes from 'prop-types';

import testUtil from "../../../utils/test-util";
// import BalanceViewStyle from "./BalanceView.styles";
import CelText from '../../atoms/CelText/CelText';
import formatter from "../../../utils/formatter";
import Card from "../Card/Card";


const BalanceView = (props) => {
  // const style = BalanceViewStyle();
  const {crypto, usd, coin, opacity} = props;

  return (
      <Card  padding="10 10 10 10" opacity={opacity}>
        <CelText align="center" type="H7">
          New balance: { formatter.crypto(crypto, coin) } | { formatter.usd(usd)  }
        </CelText>
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
