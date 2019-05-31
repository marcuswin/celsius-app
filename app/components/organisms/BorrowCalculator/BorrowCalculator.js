import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from "prop-types"
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"

import testUtil from "../../../utils/test-util"
import * as appActions from "../../../redux/actions"
import LoanCalculatorStyle from "./BorrowCalculator.styles"
import CelText from '../../atoms/CelText/CelText'
import RegularLayout from '../../layouts/RegularLayout/RegularLayout'
import formatter from "../../../utils/formatter"
import Separator from '../../atoms/Separator/Separator'
import CelInput from '../../atoms/CelInput/CelInput'
import Card from "../../atoms/Card/Card"
import HorizontalSlider from '../../atoms/HorizontalSlider/HorizontalSlider'
import STYLES from "../../../constants/STYLES"
import SimpleSelect from "../../molecules/SimpleSelect/SimpleSelect"
import CelButton from "../../atoms/CelButton/CelButton"
import Icon from "../../atoms/Icon/Icon"
import { KYC_STATUSES } from "../../../constants/DATA";
import { EMPTY_STATES } from "../../../constants/UI";



@connect(
  state => ({
    ltv: state.loans.ltvs,
    formData: state.forms.formData,
    currencies: state.currencies.rates,
    loanCompliance: state.user.compliance.loan,
    minimumLoanAmount: state.generalData.minimumLoanAmount,
    walletSummary: state.wallet.summary,
    kycStatus: state.user.profile.kyc
    ? state.user.profile.kyc.status
    : KYC_STATUSES.collecting
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BorrowCalculator extends Component {
  static propTypes = {
    purpose: PropTypes.string,
  }
  constructor(props) {
    super(props)

    const {
      currencies,
      loanCompliance,
      formData,
      ltv,
      walletSummary
    } = props

    const coinSelectItems = currencies
      .filter(c => loanCompliance.coins.includes(c.short))
      .map(c => ({
        label: `${c.displayName} - ${c.short}`,
        value: c.short
      }))

    this.state = {
      coinSelectItems,
      rateFirst: false,
      rateSecond: true,
      rateThird: false
    }

    this.sliderItems = [
      { value: 6, label: <CelText weight="bold" color={formData.termOfLoan === 6 ? STYLES.COLORS.CELSIUS_BLUE : 'black'}>6M</CelText> },
      { value: 12, label: <CelText weight="bold" color={formData.termOfLoan === 12 ? STYLES.COLORS.CELSIUS_BLUE : 'black'}>1Y</CelText> },
      { value: 24, label: <CelText weight="bold" color={formData.termOfLoan === 24 ? STYLES.COLORS.CELSIUS_BLUE : 'black'}>2Y</CelText> },
      { value: 48, label: <CelText weight="bold" color={formData.termOfLoan === 48 ? STYLES.COLORS.CELSIUS_BLUE : 'black'}>4Y</CelText> }
    ]

    this.style = LoanCalculatorStyle()

    this.coin = formData.coin || 'BTC'
    this.loanDuration = formData.termOfLoan || 6
    this.dollarAmount = formData.amount || 10000

    this.annualInterest = this.dollarAmount / (this.loanDuration / 12) * this.interestPercentage
    this.monthlyInterest = this.annualInterest / 12
    this.totalInterest = this.monthlyInterest * this.loanDuration

    this.collateralNeeded = (this.dollarAmount / (currencies.find(c => c.short === this.coin).market_quotes_usd.price)) / this.collateralPercentage


    this.cardStyle = this.style.cardStyle
    this.selectedCardStyle = this.style.selectedCardStyle
    this.selectedTextStyle = this.style.selectedTextStyle
    this.percentageTextStyle = this.style.percentageTextStyle

    this.interestPercentage = ltv[1].interest
    this.collateralPercentage = ltv[1].percent

    this.bestLtv =  Math.max(...ltv.map(x => x.percent))


    this.biggestAmountCryptoUsd = Math.max(...walletSummary.coins.map(a => a.amount_usd))
    this.arrayOfAmountUsd = walletSummary.coins.map(c => c.amount_usd)
    this.indexOfLargestAmount = this.arrayOfAmountUsd.indexOf(
      Math.max(...this.arrayOfAmountUsd)
    )

    // if (this.state.rateFirst === true) {
    //   this.interestPercentage = ltv[0].interest
    //   this.collateralPercentage = ltv[0].percent
    // } else if (this.state.rateSecond === true) {
    //   this.interestPercentage = ltv[1].interest
    //   this.collateralPercentage = ltv[1].percent
    // } else if (this.state.rateThird === true) {
    //   this.interestPercentage = ltv[2].interest
    //   this.collateralPercentage = ltv[2].percent
    // }
  }


  componentDidMount() {
    const { actions } = this.props
    actions.updateFormField('termOfLoan', 6)
  }

  // handleCoinChange = (field, value) => {
  //   const { onChange, actions, updateFormField } = this.props

  //   actions.updateFormField(field, value)

  //   if (onChange) {
  //     this.onChange(field, value)
  //   } else {
  //     this.updateFormField(field, value)
  //   }

  //   this.formData = value

  //   console.log('field: ',field);
  //   console.log('value: ', value);


  // }

  changeSelectedLoan = (selectedStep) => {
    const { updateFormField } = this.props;
    updateFormField('termOfLoan', selectedStep)
  }

  pasteCodeHelperButton = () => (
    <CelText weight='500' type={'H3'} color={STYLES.COLORS.DARK_GRAY3}>USD</CelText>
  )

  renderSubtitle = () => {
    const { purpose } = this.props


    switch (purpose) {

      case EMPTY_STATES.BORROW_NOT_ENOUGH_FUNDS:
        return 'Calculate your loan interest'

      case EMPTY_STATES.NON_VERIFIED_BORROW:
        return 'Calculate your interest before you verify your ID'

      case EMPTY_STATES.NON_MEMBER_CELPAY:
        return 'Calculate your loan interest'

      case EMPTY_STATES.COMPLIANCE:
        return 'You are not allowed to apply for a loan due compliance issues'

      default:
        return 'You are not allowed to apply for a loan, but you can try our loan calculator :)'
    }
  }

  renderBottomTitle = () => {

    const { purpose } = this.props

    switch (purpose) {

      case EMPTY_STATES.BORROW_NOT_ENOUGH_FUNDS:
        return 'To apply for a loan you need only XXX ETH to deposit'

      case EMPTY_STATES.NON_VERIFIED_BORROW:
        return 'Borrow dollars for your crypto'

      case EMPTY_STATES.NON_MEMBER_CELPAY:
        return 'Borrow dollars for your crypto'

      case EMPTY_STATES.COMPLIANCE:
        return ''

      default:
        return ''
    }
  }

  renderBottomCopy = () => {
    const { purpose }  = this.props

    switch (purpose) {

      case EMPTY_STATES.BORROW_NOT_ENOUGH_FUNDS:
        return 'Deposit more coins to start your first loan application'

      case EMPTY_STATES.NON_VERIFIED_BORROW:
        return 'Verify your identity yo start using your coins as collateral and get dollar loan at just XXX APR'

      case EMPTY_STATES.NON_MEMBER_CELPAY:
        return 'Calculate your loan interest before you deposit CEL'

      case EMPTY_STATES.COMPLIANCE:
        return ''

      default:
        return ''
    }
  }

  renderBottomButton = () => {

    const { purpose } = this.props

    switch (purpose) {

      case EMPTY_STATES.BORROW_NOT_ENOUGH_FUNDS:
        return 'Deposit coins'

      case EMPTY_STATES.NON_VERIFIED_BORROW:
        return 'Verify identity'

      case EMPTY_STATES.NON_MEMBER_CELPAY:
        return 'Deposit coins'

      case EMPTY_STATES.COMPLIANCE:
        return ''

      default:
        return ''
    }
  }

  renderNavigate = () => {

    const { purpose } = this.props

    switch (purpose) {

      case EMPTY_STATES.BORROW_NOT_ENOUGH_FUNDS:
        return 'Deposit'

      case EMPTY_STATES.NON_VERIFIED_BORROW:
        return 'KYCLanding'

      case EMPTY_STATES.NON_MEMBER_CELPAY:
        return `'Deposit', { coin: "CEL" }`

      case EMPTY_STATES.COMPLIANCE:
        return ''

      default:
        return ''
    }
  }

  render() {
    const style = LoanCalculatorStyle()
    const {
      coinSelectItems,
      rateFirst
    } = this.state

    const {
      actions,
      formData,
      ltv
     } = this.props


    return (
      <RegularLayout style={style.container}>
        <CelText
          weight="bold"
          type="H2"
          align="center">
          Loan Calculator
        </CelText>
        <CelText
          align={'center'}
          type={'H4'}
          margin={'4 0 20 0'}
          weight={'300'}>
          {this.renderSubtitle()}
        </CelText>
        <Separator />
        <CelText
          type={'H4'}
          margin={'20 auto 20 auto'}
          weight={'300'}>
          Enter loan amount in dollars
        </CelText>
        <CelInput
          helperButton={this.pasteCodeHelperButton}
          field={'amount'}
          type={'number'}
          placeholder={'10.000'}
          keyboardType={'numeric'}
          value={this.dollarAmount} />
        <Card>
          <CelText
            align={'center'}
            type={'H4'}
            margin={'4 0 20 0'}
            weight={'300'}>
            Choose your annual percentage rate
          </CelText>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            {ltv.map(c =>
              (
                <Card
                size={'thirdExtra'}
                margin='20 5 20 5'
                noBorder
                styles={ rateFirst ? this.selectedCardStyle : this.cardStyle }
                onPress={() => {
                  this.setState({
                    rateFirst: true,
                    rateSecond: false,
                    rateThird: false
                  })
                }}>
                <CelText
                  align={'center'}
                  weight='bold'
                  color={STYLES.COLORS.MEDIUM_GRAY}
                  style={ rateFirst ? this.selectedTextStyle : this.percentageTextStyle }>
                  {formatter.percentageDisplay(c.interest)}
                </CelText>
              </Card>
              ))
            }
          </View>
          <Separator />
          <CelText
            type={'H4'}
            margin={'20 10 20 10'}
            weight={'300'}>
            For how long would you like to borrow?
          </CelText>
          <HorizontalSlider
            items={this.sliderItems}
            field="termOfLoan"
            value={formData.termOfLoan}
            updateFormField={actions.updateFormField}/>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'  }}>
            <Card
              size={'halfExtra'}
              margin='20 10 20 5'
              padding='20 5 20 5'
              color={STYLES.COLORS.LIGHT_GRAY}>
              <CelText
                align={'center'}
                weight='bold'
                color={STYLES.COLORS.MEDIUM_GRAY}
                type={'H2'}>
                {formatter.usd(this.monthlyInterest)}
              </CelText>
              <CelText
                align={'center'}
                weight='300'
                color={STYLES.COLORS.MEDIUM_GRAY}
                type={'H6'}>
                Interest per month
              </CelText>
            </Card>
            <Card
              size={'halfExtra'}
              margin='20 5 20 5'
              padding='20 5 20 5'
              color={STYLES.COLORS.LIGHT_GRAY}>
              <CelText
                align={'center'}
                weight='bold'
                color={STYLES.COLORS.MEDIUM_GRAY}
                type={'H2'}>
                {formatter.usd(this.totalInterest)}
              </CelText>
              <CelText
                align={'center'}
                weight='300'
                color={STYLES.COLORS.MEDIUM_GRAY}
                type={'H6'}>
                Total interest
              </CelText>
            </Card>
          </View>
        </Card>
        <CelText
          align={'center'}
          type={'H4'}
          margin={'4 0 20 0'}
          weight={'300'}>
          Choose a coin to use as collateral
        </CelText>
        <View>
          <Icon
            name={`Icon${this.coin}`}
            width='40'
            height='40'
            color={STYLES.COLORS.WHITE}
          />
          <View style={style.selectWrapper}>
            <SimpleSelect
              items={coinSelectItems}
              field='coin'
              displayValue={this.coin}
              value={formData.termOfLoan}
              updateFormField={actions.updateFormField}
              onChange={this.handleCoinChange}
              placeholder='Choose a coin'
            />
          </View>
        </View>
        <Card
          size={'full'}
          margin='20 5 20 5'
          padding='20 5 20 5'
          color={STYLES.COLORS.WHITE}>
          <CelText
            align={'center'}
            weight='bold'
            color={STYLES.COLORS.MEDIUM_GRAY}
            type={'H2'}>
            {formatter.crypto(this.collateralNeeded, this.coin)}
          </CelText>
          <CelText
            align={'center'}
            weight='300'
            color={STYLES.COLORS.MEDIUM_GRAY}
            type={'H6'}>
            Collateral needed
          </CelText>
        </Card>
        <CelText
          align={'center'}
          type={'H4'}
          margin={'4 0 20 0'}
          weight={'300'}>
          The collateral needed is calculated based your annual percentage rate
        </CelText>
        <Separator />
          <View>
            <CelText
              weight="bold"
              type="H2"
              align="center"
              margin={'20 0 20 0'}>
              {this.renderBottomTitle()}
            </CelText>
            <CelText
              align={'center'}
              type={'H4'}
              margin={'4 0 20 0'}
              weight={'300'}>
              {this.renderBottomCopy()}
              {/* Verify your identity to start using your coins as collateral and get a dollar loan at just {formatter.percentageDisplay(ltv[0].interest)} APR */}
            </CelText>
            <CelButton
              onPress={() => actions.navigateTo(this.renderNavigate())}
              margin='20 0 20 0'>{this.renderBottomButton()}
            </CelButton>
          </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(BorrowCalculator);
