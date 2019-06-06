import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import testUtil from "../../../utils/test-util";

import WithdrawalAddressCardStyle from "./WithdrawalAddressCard.styles";
import Card from '../Card/Card';
import CelText from '../CelText/CelText';
import Icon from '../Icon/Icon';
import CelButton from '../CelButton/CelButton';
import STYLES from '../../../constants/STYLES';

const WithdrawalAddressCard = ({ coinShort, icon, onPress, withdrawalAddress }) => {
  const style = WithdrawalAddressCardStyle()
  const opacity = withdrawalAddress.locked ? 0.5 : 1;
  return (
      <Card>
        <View style={[style.bodyWrapper, {opacity}]}>
          <Icon height="35" width="35" name={icon} />
          <View style={style.cardBody}>
            <CelText weight='600' >{coinShort}</CelText>
            <CelText margin='5 0 0 0' type='H6' weight='300' color={STYLES.COLORS.DARK_GRAY6}>{withdrawalAddress.address}</CelText>
            { withdrawalAddress.locked ? (
              <CelText>Address change in progress...</CelText>
            ) : (
              <CelButton margin='8 0 0 0' size='small' onPress={() => onPress()} basic>Change</CelButton>
            )}
          </View>
        </View>
      </Card>
  );
}

WithdrawalAddressCard.propTypes = {
  icon: PropTypes.string,
  coinShort: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  withdrawalAddress: PropTypes.instanceOf(Object),
}

export default testUtil.hookComponent(WithdrawalAddressCard);
