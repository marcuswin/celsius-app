import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'

import testUtil from '../../../utils/test-util'
import * as appActions from '../../../redux/actions'
import CelModal from '../CelModal/CelModal'
import { MODALS, KEYPAD_PURPOSES } from '../../../constants/UI'
import CelButton from '../../atoms/CelButton/CelButton'
import CelText from '../../atoms/CelText/CelText'
import Card from '../../atoms/Card/Card'
import formatter from '../../../utils/formatter'
import Separator from '../../atoms/Separator/Separator'
import STYLES from '../../../constants/STYLES'
import CoinSwitch from '../../atoms/CoinSwitch/CoinSwitch'
import SimpleSelect from '../../molecules/SimpleSelect/SimpleSelect'
import InterestCalculatorModalStyle from './InterestCalculatorModal.styles'
import { getPadding } from '../../../utils/styles-util'
import CelNumpad from '../../molecules/CelNumpad/CelNumpad'

@connect(
  state => ({
    interestRates: state.generalData.interestRates,
    formData: state.forms.formData,
    currencies: state.currencies.rates,
    interestCompliance: state.user.compliance.interest,
    interestRatesDisplay: state.interest.ratesDisplay,
    currencyRatesShort: state.currencies.currencyRatesShort,
    keypadOpen: state.ui.isKeypadOpen
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class InterestCalculatorModal extends Component {
  static propTypes = {
    defaultCoin: PropTypes.string
  }
  static defaultProps = { defaultCoin: 'BTC' }

  constructor (props) {
    super(props)
    const { defaultCoin, currencies, interestCompliance } = this.props

    const coinSelectItems = currencies
      .filter(c => interestCompliance.coins.includes(c.short))
      .map(c => ({ label: `${c.displayName} - ${c.short}`, value: c.short }))

    this.state = {
      coinSelectItems,
      activePeriod: '',
      earnInterestIn: false
    }

    props.actions.initForm({ coin: defaultCoin })
  }

  async componentDidMount () {
    const { actions } = this.props
    await actions.getInterestRates()
  }

  getAllowedDecimals = currency => (currency === 'USD' ? 0 : 5)

  // TODO: move to formatter? check WithdrawEnterAmount
  setCurrencyDecimals (value, currency) {
    if (!this.hasEnoughDecimals(value, currency)) return value
    // remove last digit
    const numberOfDecimals = formatter.getNumberOfDecimals(value)
    const allowedDecimals = this.getAllowedDecimals(currency)

    return value.slice(0, allowedDecimals - numberOfDecimals)
  }

  // TODO: move to formatter? check WithdrawEnterAmount
  hasEnoughDecimals (value = '', currency) {
    const numberOfDecimals = formatter.getNumberOfDecimals(value)
    const allowedDecimals = this.getAllowedDecimals(currency)

    return numberOfDecimals > allowedDecimals
  }

  handleAmountChange = newValue => {
    const { formData, currencyRatesShort, actions } = this.props
    const selectedCoin = formData.coin || 'BTC'
    const coinRate = currencyRatesShort[selectedCoin.toLowerCase()]

    let amountCrypto
    let amountUsd

    if (formData.isUsd) {
      amountUsd = this.setCurrencyDecimals(newValue, 'USD')
      amountCrypto = amountUsd / coinRate || 0
    } else {
      amountCrypto = this.setCurrencyDecimals(newValue) || 0
      amountUsd = amountCrypto * coinRate
    }

    actions.updateFormFields({
      amountCrypto: amountCrypto.toString(),
      amountUsd: amountUsd.toString()
    })
  }

  handleCoinChange = (field, value) => {
    const { actions } = this.props

    actions.updateFormFields({
      [field]: value,
      amountUsd: undefined,
      amountCrypto: undefined
    })
  }

  render () {
    const { coinSelectItems, earnInterestIn } = this.state
    const {
      actions,
      formData,
      interestRates,
      keypadOpen,
      currencyRatesShort
    } = this.props

    const selectedCoin = formData.coin || 'BTC'
    const interestRateForCoin =
      interestRates && formData.coin
        ? interestRates[formData.coin]
        : { rate: 0, cel_rate: 0 }

    const style = InterestCalculatorModalStyle()

    const weeklyInterest =
      (formData.amountCrypto *
        (earnInterestIn
          ? interestRateForCoin.cel_rate
          : interestRateForCoin.rate)) /
      52
    const yearlyInterest =
      formData.amountCrypto *
      (earnInterestIn ? interestRateForCoin.cel_rate : interestRateForCoin.rate)
    const noCelCardStyle = [style.earningCard]
    const celCardStyle = [style.earningCard]

    const noCelTextColor = !earnInterestIn
      ? STYLES.COLORS.WHITE
      : STYLES.COLORS.DARK_GRAY
    const celTextColor = earnInterestIn
      ? STYLES.COLORS.WHITE
      : STYLES.COLORS.DARK_GRAY

    if (!earnInterestIn) {
      noCelCardStyle.push(style.selectedCard)
    } else {
      celCardStyle.push(style.selectedCard)
    }

    return (
      <CelModal name={MODALS.INTEREST_CALCULATOR_MODAL} padding='0 0 0 0'>
        <CelText weight='bold' type='H2' align={'center'}>
          Interest calculator
        </CelText>
        <CelText align={'center'} margin='4 0 20 0'>
          How much do you plan to deposit?
        </CelText>

        <View
          style={[
            style.amounts,
            {
              backgroundColor: STYLES.COLORS.LIGHT_GRAY
            },
            { ...getPadding('20 20 20 20') }
          ]}
        >
          <View style={style.selectWrapper}>
            <SimpleSelect
              items={coinSelectItems}
              field='coin'
              displayValue={selectedCoin}
              updateFormField={actions.updateFormField}
              onChange={this.handleCoinChange}
              placeholder='Choose a coin'
            />
          </View>

          <CoinSwitch
            updateFormField={actions.updateFormField}
            onAmountPress={actions.toggleKeypad}
            amountUsd={formData.amountUsd}
            amountCrypto={formData.amountCrypto}
            isUsd={formData.isUsd}
            noUsdDecimals
            coin={selectedCoin}
            amountColor={
              keypadOpen ? STYLES.COLORS.CELSIUS_BLUE : STYLES.COLORS.DARK_GRAY
            }
          />
        </View>

        <CelText align={'center'} margin='20 0 16 0'>
          Choose the way of earning interest
        </CelText>

        <View style={{ flexDirection: 'row' }}>
          <Card
            noBorder
            styles={noCelCardStyle}
            margin='20 10 20 20'
            onPress={() => {
              this.setState({ earnInterestIn: false })
            }}
          >
            <CelText color={noCelTextColor} align={'center'} weight='bold'>
              {formatter.percentageDisplay(interestRateForCoin.rate)}
            </CelText>
            <CelText color={noCelTextColor} align={'center'}>
              Regular rates
            </CelText>
          </Card>
          <Card
            noBorder
            styles={celCardStyle}
            margin='20 20 20 10'
            onPress={() => {
              this.setState({ earnInterestIn: true })
            }}
          >
            <CelText color={celTextColor} align={'center'} weight='bold'>
              {formatter.percentageDisplay(interestRateForCoin.cel_rate)}
            </CelText>
            <CelText color={celTextColor} align={'center'}>
              Earn in CEL rates
            </CelText>
          </Card>
        </View>

        <Separator />

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Card
            styles={{ flex: 1 }}
            color={STYLES.COLORS.LIGHT_GRAY}
            margin='20 10 20 20'
          >
            <CelText align={'center'}>
              {formatter.usd(
                weeklyInterest * currencyRatesShort[selectedCoin.toLowerCase()]
              )}
            </CelText>
            <CelText align={'center'} weight='bold'>
              {formatter.crypto(weeklyInterest, selectedCoin, {
                precision: 2
              })}
            </CelText>
            <CelText type='H6' align={'center'}>
              Interest per week
            </CelText>
          </Card>
          <Card
            styles={{ flex: 1 }}
            color={STYLES.COLORS.LIGHT_GRAY}
            margin='20 20 20 10'
          >
            <CelText align={'center'}>
              {formatter.usd(
                yearlyInterest * currencyRatesShort[selectedCoin.toLowerCase()]
              )}
            </CelText>
            <CelText align={'center'} weight='bold'>
              {formatter.crypto(yearlyInterest, selectedCoin, {
                precision: 2
              })}
            </CelText>
            <CelText type='H6' align={'center'}>
              Interest for 1 year
            </CelText>
          </Card>
        </View>

        <CelButton
          onPress={() => {
            actions.navigateTo('Deposit')
            actions.closeModal()
          }}
          margin='15 0 15 0'
        >
          Deposit coins
        </CelButton>
        <CelNumpad
          field={formData.isUsd ? 'amountUsd' : 'amountCrypto'}
          value={formData.isUsd ? formData.amountUsd : formData.amountCrypto}
          updateFormField={actions.updateFormField}
          setKeypadInput={actions.setKeypadInput}
          toggleKeypad={actions.toggleKeypad}
          onPress={this.handleAmountChange}
          purpose={KEYPAD_PURPOSES.INTEREST_CALCULATOR}
        />
      </CelModal>
    )
  }
}

export default testUtil.hookComponent(InterestCalculatorModal)
