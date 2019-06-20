import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import testUtil from '../../../utils/test-util'
import * as appActions from '../../../redux/actions'
import WithdrawEnterAmountStyle from './WithdrawEnterAmount.styles'
import CelButton from '../../atoms/CelButton/CelButton'
import RegularLayout from '../../layouts/RegularLayout/RegularLayout'
import formatter from '../../../utils/formatter'
import CelNumpad from '../../molecules/CelNumpad/CelNumpad'
import { EMPTY_STATES, KEYPAD_PURPOSES, MODALS } from '../../../constants/UI'
import CoinSwitch from '../../atoms/CoinSwitch/CoinSwitch'
import SimpleSelect from '../../molecules/SimpleSelect/SimpleSelect'
import WithdrawInfoModal from '../../organisms/WithdrawInfoModal/WithdrawInfoModal'
import { KYC_STATUSES, PREDIFINED_AMOUNTS } from '../../../constants/DATA'
import PredefinedAmounts from '../../organisms/PredefinedAmounts/PredefinedAmounts'
import { openModal } from '../../../redux/ui/uiActions'
import store from '../../../redux/store'
import StaticScreen from '../StaticScreen/StaticScreen'
import BalanceView from '../../atoms/BalanceView/BalanceView'
import STYLES from '../../../constants/STYLES'
import cryptoUtil from '../../../utils/crypto-util'

@connect(
  state => ({
    walletSummary: state.wallet.summary,
    withdrawCompliance: state.user.compliance.withdraw,
    currencyRatesShort: state.currencies.currencyRatesShort,
    currencies: state.currencies.rates,
    formData: state.forms.formData,
    withdrawalAddresses: state.wallet.withdrawalAddresses,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
    keypadOpen: state.ui.isKeypadOpen,
    withdrawalSettings: state.generalData.withdrawalSettings
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WithdrawEnterAmount extends Component {
  static navigationOptions = () => ({
    title: 'Withdraw',
    right: 'info',
    onInfo: () => {
      store.dispatch(openModal(MODALS.WITHDRAW_INFO_MODAL))
    }
  })

  constructor (props) {
    super(props)

    const {
      navigation,
      currencies,
      withdrawCompliance,
      walletSummary
    } = this.props

    const coinSelectItems = currencies
      .filter(c => withdrawCompliance.coins.includes(c.short))
      .filter(c => {
        const balanceUsd = walletSummary.coins.filter(
          wCoin => wCoin.short === c.short.toUpperCase()
        )[0].amount_usd
        return balanceUsd > 0
      })
      .map(c => ({ label: `${c.displayName} - ${c.short}`, value: c.short }))

    this.state = {
      coinSelectItems,
      activePeriod: { label: '', value: '' }
    }

    const coin = navigation.getParam(
      'coin',
      (coinSelectItems &&
        coinSelectItems.length > 0 &&
        coinSelectItems[0].value) ||
        ''
    )
    if (coin) {
      props.actions.getCoinWithdrawalAddress(coin)
      props.actions.initForm({ coin })
      props.actions.openModal(MODALS.WITHDRAW_INFO_MODAL)
    }
  }

  onPressPredefinedAmount = ({ label, value }) => {
    const { formData, walletSummary, currencyRatesShort, actions } = this.props
    let amount

    const coinRate = currencyRatesShort[formData.coin.toLowerCase()]
    const walletSummaryObj = walletSummary.coins.find(
      c => c.short === formData.coin.toUpperCase()
    )

    if (label === 'ALL') {
      amount = formData.isUsd
        ? walletSummaryObj.amount_usd.toString()
        : walletSummaryObj.amount
    } else {
      amount = formData.isUsd ? value : (Number(value) / coinRate).toString()
    }
    this.handleAmountChange(amount, { label, value })
    actions.toggleKeypad(false)
  }

  getUsdValue = amountUsd =>
    formatter.removeDecimalZeros(formatter.floor10(amountUsd, -2) || '')

  handleAmountChange = (newValue, predefined = { label: '' }) => {
    const { formData, currencyRatesShort, actions, walletSummary } = this.props
    const coinRate = currencyRatesShort[formData.coin.toLowerCase()]

    const splitedValue = newValue.toString().split('.')

    if (splitedValue && splitedValue.length > 2) return

    const {
      amount_usd: balanceUsd,
      amount: balanceCrypto
    } = walletSummary.coins.find(c => c.short === formData.coin.toUpperCase())

    let amountCrypto
    let amountUsd

    if (formData.isUsd) {
      // if no predefined label is forwarded and the value is in usd
      if (predefined.label.length === 0) {
        amountUsd = formatter.setCurrencyDecimals(newValue, 'USD')
        amountCrypto = amountUsd / coinRate
      } else {
        amountUsd = predefined.label === 'ALL' ? balanceUsd : newValue
        amountUsd = this.getUsdValue(amountUsd)
        amountCrypto =
          predefined.label === 'ALL' ? balanceCrypto : amountUsd / coinRate
        amountCrypto = formatter.removeDecimalZeros(amountCrypto)
      }
      // if no predefined label is forwarded and the value is no in usd (crypto)
    } else if (predefined.label.length === 0) {
      amountCrypto = formatter.setCurrencyDecimals(newValue)
      amountUsd = amountCrypto * coinRate
      amountUsd = this.getUsdValue(amountUsd)
      if (amountUsd === '0') amountUsd = ''
    } else {
      amountCrypto = predefined.label === 'ALL' ? balanceCrypto : newValue
      amountCrypto = formatter.removeDecimalZeros(amountCrypto)
      amountUsd = predefined.label === 'ALL' ? balanceUsd : predefined.value
      amountUsd = this.getUsdValue(amountUsd)
    }

    // Change value '.' to '0.'
    if (amountUsd[0] === '.') amountUsd = `0${amountUsd}`
    // if the crypto amount is eg. 01 the value will be 1, 00 -> 0
    if (amountUsd.length > 1 && amountUsd[0] === '0' && amountUsd[1] !== '.') {
      amountUsd = amountUsd[1]
    }

    // if crypto amount is undefined, set it to empty string
    if (!amountCrypto) amountCrypto = ''
    // Change value '.' to '0.'
    if (amountCrypto[0] === '.') amountCrypto = `0${amountCrypto}`
    // if the crypto amount is eg. 01 the value will be 1, 00 -> 0
    if (
      amountCrypto.length > 1 &&
      amountCrypto[0] === '0' &&
      amountCrypto[1] !== '.'
    ) {
      amountCrypto = amountCrypto[1]
    }

    if (cryptoUtil.isGreaterThan(amountCrypto, balanceCrypto)) {
      return actions.showMessage('warning', 'Insufficient funds!')
    }

    this.setState({ activePeriod: predefined })

    actions.updateFormFields({
      amountCrypto: amountCrypto.toString(),
      amountUsd
    })
  }

  handleCoinChange = (field, value) => {
    const { actions, withdrawalAddresses } = this.props

    actions.updateFormFields({
      [field]: value,
      amountUsd: undefined,
      amountCrypto: undefined
    })

    if (!withdrawalAddresses[value.toUpperCase()]) {
      actions.getCoinWithdrawalAddress(value)
    }
  }

  handleNextStep = () => {
    const { actions, formData, withdrawalAddresses } = this.props
    const coinAddress = withdrawalAddresses[formData.coin.toUpperCase()] && withdrawalAddresses[formData.coin.toUpperCase()].address

    if (coinAddress) {
      actions.navigateTo('WithdrawConfirmAddress')
    } else {
      actions.navigateTo('WithdrawCreateAddress')
    }
  };

  render () {
    const { coinSelectItems, activePeriod } = this.state
    const {
      formData,
      actions,
      walletSummary,
      navigation,
      kycStatus,
      keypadOpen,
      withdrawalSettings
    } = this.props
    const style = WithdrawEnterAmountStyle()
    if (kycStatus !== KYC_STATUSES.passed) {
      return (
        <StaticScreen
          emptyState={{ purpose: EMPTY_STATES.NON_VERIFIED_WITHDRAW }}
        />
      )
    }
    if (!cryptoUtil.isGreaterThan(walletSummary.total_amount_usd, 0)) {
      return (
        <StaticScreen
          emptyState={{ purpose: EMPTY_STATES.INSUFFICIENT_FUNDS }}
        />
      )
    }
    if (!formData.coin) return null

    const coinData = walletSummary.coins.find(
      c => c.short === formData.coin.toUpperCase()
    )

    const coin = navigation.getParam('coin')
    return (
      <RegularLayout padding='20 0 0 0'>
        <View style={style.container}>
          <View style={style.wrapper}>
            <BalanceView
              opacity={0.65}
              coin={formData.coin}
              crypto={coinData.amount}
              usd={coinData.amount_usd}
            />

            <View>
              <View style={style.selectWrapper}>
                <SimpleSelect
                  items={coinSelectItems}
                  field='coin'
                  displayValue={formData.coin}
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
                coin={formData.coin}
                amountColor={
                  keypadOpen
                    ? STYLES.COLORS.CELSIUS_BLUE
                    : STYLES.COLORS.DARK_GRAY
                }
              />
            </View>

            <PredefinedAmounts
              data={PREDIFINED_AMOUNTS}
              onSelect={this.onPressPredefinedAmount}
              activePeriod={activePeriod}
            />

            <CelButton
              margin='40 0 0 0'
              disabled={!(formData.amountUsd && Number(formData.amountUsd) > 0)}
              onPress={this.handleNextStep}
              iconRight='IconArrowRight'
            >
              {formData.amountUsd && Number(formData.amountUsd) > 0
                ? 'Check wallet address'
                : 'Enter amount above'}
            </CelButton>
          </View>
        </View>

        <CelNumpad
          field={formData.isUsd ? 'amountUsd' : 'amountCrypto'}
          value={
            formData.isUsd ? formData.amountUsd : formData.amountCrypto || ''
          }
          updateFormField={actions.updateFormField}
          setKeypadInput={actions.setKeypadInput}
          toggleKeypad={actions.toggleKeypad}
          onPress={this.handleAmountChange}
          purpose={KEYPAD_PURPOSES.WITHDRAW}
          autofocus={false}
        />
        <WithdrawInfoModal
          type={coin === 'CEL'}
          closeModal={actions.closeModal}
          toggleKeypad={actions.toggleKeypad}
          withdrawalSettings={withdrawalSettings}
        />
      </RegularLayout>
    )
  }
}

export default testUtil.hookComponent(WithdrawEnterAmount)
