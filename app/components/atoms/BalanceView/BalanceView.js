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
      <Card backgroundColor={'red'} padding="10 10 10 10" opacity={opacity}>
        <CelText  weight='300' align="center" type="H7">
          Balance: { `${formatter.getEllipsisAmount(crypto, -5)} ${coin}` } | { formatter.usd(usd)  }
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
