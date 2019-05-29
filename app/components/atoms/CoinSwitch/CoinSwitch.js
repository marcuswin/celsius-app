import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity } from 'react-native'

import testUtil from '../../../utils/test-util'

import CoinSwitchStyle from './CoinSwitch.styles'
import CelText from '../CelText/CelText'
import formatter from '../../../utils/formatter'
import Icon from '../Icon/Icon'
import STYLES from '../../../constants/STYLES'

const CoinSwitch = props => {
  const style = CoinSwitchStyle()
  const {
    isUsd,
    amountUsd,
    amountCrypto,
    updateFormField,
    coin,
    amountColor
  } = props

  const upperValue = isUsd
    ? `$${amountUsd || '0.00'}`
    : `${formatter.getEllipsisAmount(amountCrypto, -5)}`
  const lowerValue = !isUsd
    ? `$${amountUsd || '0.00'}`
    : `${formatter.getEllipsisAmount(amountCrypto, -5)} ${coin}`

  return (
    <View style={style.container}>
      {!isUsd ? (
        <Icon
          name={`Icon${coin}`}
          width='40'
          height='40'
          fill={STYLES.COLORS.MEDIUM_GRAY3}
        />
      ) : (
        <View style={{ width: 40 }} />
      )}
      {props.onAmountPress ? (
        <View>
          <TouchableOpacity onPress={props.onAmountPress}>
            <CelText
              align='center'
              type='H1'
              margin='10 0 10 0'
              weight='regular'
              color={amountColor}
            >
              {upperValue}
            </CelText>
          </TouchableOpacity>
          <CelText align='center' type='H2' color={STYLES.COLORS.MEDIUM_GRAY}>
            {lowerValue}
          </CelText>
        </View>
      ) : (
        <View>
          <CelText
            align='center'
            type='H1'
            margin='10 0 10 0'
            weight='regular'
            color={amountColor}
          >
            {upperValue}
          </CelText>
          <CelText align='center' type='H2' color={STYLES.COLORS.MEDIUM_GRAY}>
            {lowerValue}
          </CelText>
        </View>
      )}
      <View style={style.switchButton}>
        <TouchableOpacity onPress={() => updateFormField('isUsd', !isUsd)}>
          <Icon
            name='Switch'
            width='30'
            height='30'
            fill={STYLES.COLORS.MEDIUM_GRAY}
          />
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
  amountColor: PropTypes.string
}

export default testUtil.hookComponent(CoinSwitch)
