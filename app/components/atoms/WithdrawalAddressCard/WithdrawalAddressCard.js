import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';



import WithdrawalAddressCardStyle from "./WithdrawalAddressCard.styles";
import Card from '../Card/Card';
import CelText from '../CelText/CelText';
import CelButton from '../CelButton/CelButton';
import CoinIcon from "../CoinIcon/CoinIcon";

const WithdrawalAddressCard = ({ coinShort, imageUrl, onPress, withdrawalAddress }) => {
  const style = WithdrawalAddressCardStyle()
  const opacity = withdrawalAddress.locked ? 0.5 : 1;

  return (
      <Card>
        <View style={[style.bodyWrapper, {opacity}]}>
          <View style={{ alignSelf: 'center' }}>
            <CoinIcon customStyles={style.size} coinShort={coinShort} url={imageUrl}/>
          </View>
          <View style={style.cardBody}>
            <CelText weight='600' >{coinShort}</CelText>
            <CelText margin='5 0 0 0' type='H6' weight='300'>{withdrawalAddress.address}</CelText>
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
  imageUrl: PropTypes.string,
  coinShort: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  withdrawalAddress: PropTypes.instanceOf(Object),
  theme: PropTypes.string
}

export default WithdrawalAddressCard
