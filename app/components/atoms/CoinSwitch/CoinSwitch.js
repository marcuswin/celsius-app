import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity } from 'react-native'

import testUtil from '../../../utils/test-util'

import CoinSwitchStyle from './CoinSwitch.styles'
import CelText from '../CelText/CelText'
import formatter from '../../../utils/formatter'
import Icon from '../Icon/Icon'
import STYLES from '../../../constants/STYLES'
import { getScaledFont } from '../../../utils/styles-util'

const CoinSwitch = props => {
  const style = CoinSwitchStyle()
  const {
    isUsd,
    amountUsd,
    amountCrypto,
    updateFormField,
    coin,
    amountColor,
    noUsdDecimals
  } = props
  
  const upperValue = isUsd
    ? formatter.usd(amountUsd, {
      precision: noUsdDecimals && amountUsd ? 0 : 2
    })
    : `${formatter.getEllipsisAmount(amountCrypto, -5)}`
  const lowerValue = !isUsd
    ? formatter.usd(amountUsd, {
      precision: noUsdDecimals && amountUsd ? 0 : 2
    })
    : `${formatter.getEllipsisAmount(amountCrypto, -5)} ${coin}`

  return (
    <View style={style.container}>
      <Icon
        name={`Icon${coin}`}
        width='40'
        height='40'
        fill={STYLES.COLORS.MEDIUM_GRAY}
      />
      {props.onAmountPress ? (
        <View>
          <TouchableOpacity onPress={props.onAmountPress}>
            <CelText
              align='center'
              style={{ height: getScaledFont(STYLES.FONTSIZE.H1) }}
              size={STYLES.FONTSIZE.H1 - upperValue.length}
              margin='10 0 10 0'
              weight='regular'
              color={amountColor}
            >
              {upperValue}
            </CelText>
          </TouchableOpacity>
          <CelText
            align='center'
            color={STYLES.COLORS.MEDIUM_GRAY}
            style={{ height: getScaledFont(STYLES.FONTSIZE.H2) }}
            size={STYLES.FONTSIZE.H2 - upperValue.length / 2}
          >
            {lowerValue}
          </CelText>
        </View>
      ) : (
        <View>
          <CelText
            align='center'
            style={{ height: getScaledFont(STYLES.FONTSIZE.H1) }}
            size={STYLES.FONTSIZE.H1 - upperValue.length}
            margin='10 0 10 0'
            weight='regular'
            color={amountColor}
          >
            {upperValue}
          </CelText>
          <CelText
            align='center'
            type='H2'
            color={STYLES.COLORS.MEDIUM_GRAY}
            style={{ height: getScaledFont(STYLES.FONTSIZE.H2) }}
            size={STYLES.FONTSIZE.H2 - upperValue.length / 2}
          >
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
  noUsdDecimals: PropTypes.bool,
  amountUsd: PropTypes.string,
  amountCrypto: PropTypes.string,
  updateFormField: PropTypes.func.isRequired,
  onAmountPress: PropTypes.func,
  coin: PropTypes.string,
  amountColor: PropTypes.string
}

export default testUtil.hookComponent(CoinSwitch)
