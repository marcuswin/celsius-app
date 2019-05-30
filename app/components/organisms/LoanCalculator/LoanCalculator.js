import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"

import testUtil from "../../../utils/test-util"
import * as appActions from "../../../redux/actions"
import LoanCalculatorStyle from "./LoanCalculator.styles"
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


@connect(
  state => ({
    ltv: state.loans.ltvs,
    formData: state.forms.formData,
    currencies: state.currencies.rates,
    loanCompliance: state.user.compliance.loan,
    kycStatus: state.user.profile.kyc
    ? state.user.profile.kyc.status
    : KYC_STATUSES.collecting
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class LoanCalculator extends Component {

  constructor(props) {
    super(props)

    const {
      currencies,
      loanCompliance
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
  }

  componentDidMount() {
    const { actions } = this.props
    actions.updateFormField('termOfLoan', 6)
  }

  changeSelectedLoan = (selectedStep) => {
    const { actions } = this.props;
    actions.updateFormField('termOfLoan', selectedStep)
  }

  pasteCodeHelperButton = () => (
    <CelText weight='500' type={'H3'} color={STYLES.COLORS.DARK_GRAY3}>USD</CelText>
  )

   render() {
    const style = LoanCalculatorStyle()
    const {
      coinSelectItems,
      rateFirst,
      rateSecond,
      rateThird
    } = this.state

    const {
      actions,
      formData,
      ltv,
      currencies,
      kycStatus
     } = this.props

     const sliderItems = [
      { value: 6, label: <CelText weight="bold" color={formData.termOfLoan === 6 ? STYLES.COLORS.CELSIUS_BLUE : 'black'}>6M</CelText> },
      { value: 12, label: <CelText weight="bold" color={formData.termOfLoan === 12 ? STYLES.COLORS.CELSIUS_BLUE : 'black'}>1Y</CelText> },
      { value: 24, label: <CelText weight="bold" color={formData.termOfLoan === 24 ? STYLES.COLORS.CELSIUS_BLUE : 'black'}>2Y</CelText> },
      { value: 48, label: <CelText weight="bold" color={formData.termOfLoan === 48 ? STYLES.COLORS.CELSIUS_BLUE : 'black'}>4Y</CelText> }
    ]

    const coin = formData.coin || 'BTC'
    const loanDuration = formData.termOfLoan || 6
    const dollarAmount = formData.amount || 0

    let interestPercentage = ltv[1].interest
    let collateralPercentage = ltv[1].percent

    if (rateFirst === true) {
      interestPercentage = ltv[0].interest
      collateralPercentage = ltv[0].percent
    } else if (rateSecond === true) {
      interestPercentage = ltv[1].interest
      collateralPercentage = ltv[1].percent
    } else if (rateThird === true) {
      interestPercentage = ltv[2].interest
      collateralPercentage = ltv[2].percent
    }


    const annualInterest = dollarAmount / (loanDuration / 12) * interestPercentage
    const monthlyInterest = annualInterest / 12
    const totalInterest = monthlyInterest * loanDuration

    const collateralNeeded = (dollarAmount / (currencies.find(c => c.short === coin).market_quotes_usd.price)) / collateralPercentage


    const cardStyle = style.cardStyle
    const selectedCardStyle = style.selectedCardStyle
    const selectedTextStyle = style.selectedTextStyle
    const percentageTextStyle = style.percentageTextStyle

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
          Calculate your interest before you verify your ID
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
          keyboardType={'phone-pad'}
          value={dollarAmount}>
          <CelText>USD</CelText>
        </CelInput>
        <Card >
          <CelText
            align={'center'}
            type={'H4'}
            margin={'4 0 20 0'}
            weight={'300'}>
            Choose your annual percentage rate
          </CelText>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Card
              size={'thirdExtra'}
              margin='20 5 20 5'
              noBorder
              styles={ rateFirst ? selectedCardStyle : cardStyle }
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
                style={ rateFirst ? selectedTextStyle : percentageTextStyle }>
                {formatter.percentageDisplay(ltv[0].interest)}
              </CelText>
            </Card>
            <Card
              size={'thirdExtra'}
              margin='20 5 20 5'
              noBorder
              styles={ rateSecond ? selectedCardStyle : cardStyle }
              onPress={() => {
                this.setState({
                  rateFirst: false,
                  rateSecond: true,
                  rateThird: false
                })
              }}>
              <CelText
                align={'center'}
                weight='bold'
                style={ rateSecond ? selectedTextStyle : percentageTextStyle }>
                {formatter.percentageDisplay(ltv[1].interest)}
              </CelText>
            </Card>
            <Card
              size={'thirdExtra'}
              margin='20 5 20 5'
              noBorder
              styles={ rateThird ? selectedCardStyle : cardStyle }
              onPress={() => {
                this.setState({
                  rateFirst: false,
                  rateSecond: false,
                  rateThird: true
                })
              }}>
              <CelText
                align={'center'}
                weight='bold'
                style={ rateThird ? selectedTextStyle : percentageTextStyle }>
                {formatter.percentageDisplay(ltv[2].interest)}
              </CelText>
            </Card>
          </View>
          <Separator />
          <CelText
            type={'H4'}
            margin={'20 10 20 10'}
            weight={'300'}>
            For how long would you like to borrow?
          </CelText>
          <HorizontalSlider
            items={sliderItems}
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
                {formatter.usd(monthlyInterest)}
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
                {formatter.usd(totalInterest)}
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
            name={`Icon${coin}`}
            width='40'
            height='40'
            color={STYLES.COLORS.WHITE}
          />
          <View style={style.selectWrapper}>
            <SimpleSelect
              items={coinSelectItems}
              field='coin'
              displayValue={coin}
              updateFormField={actions.updateFormField}
              onChange={this.handleLoanChange}
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
            {formatter.crypto(collateralNeeded, coin)}
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
        {
          kycStatus !== KYC_STATUSES.passed ?
            (
              <View>
                <CelText
                  weight="bold"
                  type="H2"
                  align="center"
                  margin={'20 0 20 0'}>
                  Borrow dollars for your crypto
                </CelText>
                <CelText
                  align={'center'}
                  type={'H4'}
                  margin={'4 0 20 0'}
                  weight={'300'}>
                  Verify your identity to start using your coins as collateral and get a dollar loan at just {formatter.percentageDisplay(ltv[0].interest)} APR
                </CelText>
                <CelButton
                  onPress={() => actions.navigateTo('KYCVerifyID')}
                  margin='20 0 20 0'>Verify Identity
                </CelButton>
              </View>
            ) :
            (
            <View>
              <CelText
                weight="bold"
                type="H2"
                align="center"
                margin={'20 0 20 0'}>
                Borrow dollars for your crypto
              </CelText>
              <CelText
                align={'center'}
                type={'H4'}
                margin={'4 0 20 0'}
                weight={'300'}>
                Verify your identity to start using your coins as collateral and get a dollar loan at just {formatter.percentageDisplay(ltv[0].interest)} APR
              </CelText>
              <CelButton
                onPress={() => actions.navigateTo('KYCVerifyID')}
                margin='20 0 20 0'>Verify Identity
              </CelButton>
            </View>
          )
        }
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(LoanCalculator);
