import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from "prop-types"
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import _ from "lodash";

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
    } = props

    const coinSelectItems = currencies
      .filter(c => loanCompliance.coins.includes(c.short))
      .map(c => ({
        label: `${c.displayName} - ${c.short}`,
        value: c.short
      }))


    this.state = {
      coinSelectItems,
    }

    this.sliderItems = [
      { value: 6, label: <CelText weight="bold" color={formData.termOfLoan === 6 ? STYLES.COLORS.CELSIUS_BLUE : 'black'}>6M</CelText> },
      { value: 12, label: <CelText weight="bold" color={formData.termOfLoan === 12 ? STYLES.COLORS.CELSIUS_BLUE : 'black'}>1Y</CelText> },
      { value: 24, label: <CelText weight="bold" color={formData.termOfLoan === 24 ? STYLES.COLORS.CELSIUS_BLUE : 'black'}>2Y</CelText> },
      { value: 48, label: <CelText weight="bold" color={formData.termOfLoan === 48 ? STYLES.COLORS.CELSIUS_BLUE : 'black'}>4Y</CelText> }
    ]

    this.style = LoanCalculatorStyle()

    props.actions.initForm({
      coin: "BTC",
      termOfLoan: 6,
      amount: 10000,
      ltv: ltv[0],
    })

    // this.calculateLoanParams()
  }

  componentDidUpdate(prevProps) {
    const { formData } = this.props;

    if (!_.isEqual(formData, prevProps.formData)) {
      // this.calculateLoanParams()
    }
  }

  getPurposeSpecificProps = () => {
    const { purpose, actions } = this.props;

    const defaultProps = {
      subtitle: 'You are not allowed to apply for a loan, but you can try our loan calculator.',
      bottomHeading: 'Borrow dollars for your crypto',
      bottomParagraph: 'Calculate your loan interest before you deposit coins',
      buttonCopy: 'Deposit',
      onPress: () => actions.navigateTo("Deposit", { coin: "CEL" }),
    }

    switch (purpose) {
      case EMPTY_STATES.BORROW_NOT_ENOUGH_FUNDS:
        return {
          ...defaultProps,
          subtitle: 'Calculate your loan interest',
          bottomHeading: 'To apply for a loan you need only XXX ETH to deposit',
          bottomParagraph: 'Deposit more coins to start your first loan application',
          buttonCopy: 'Deposit coins',
          onPress: '',
        }

      case EMPTY_STATES.NON_VERIFIED_BORROW:
        return {
          ...defaultProps,
          subtitle: 'Calculate your interest before you verify your ID',
          bottomHeading: 'Borrow dollars for your crypto',
          bottomParagraph: 'Verify your identity yo start using your coins as collateral and get dollar loan at just XXX APR',
          buttonCopy: 'Verify identity',
          onPress: () => actions.navigateTo("KYCProfileDetails"),
        }

      case EMPTY_STATES.NON_MEMBER_CELPAY:
        return {
          ...defaultProps,
          subtitle: 'Calculate your loan interest',
          bottomHeading: 'Borrow dollars for your crypto',
          bottomParagraph: 'Calculate your loan interest before you deposit coins',
          buttonCopy: 'Deposit coins',
          // onPress: '',
        }

      case EMPTY_STATES.COMPLIANCE:
        return {
          ...defaultProps,
          subtitle: 'You are not allowed to apply for a loan because of local laws and regulations',
          // bottomHeading: '',
          // bottomParagraph: '',
          buttonCopy: 'Go to Wallet',
          onPress: 'WalletLanding',
        }

      default:
        return defaultProps
    }
  }

  calculateLoanParams = () => {
    const { formData, currencies, walletSummary, ltv, purpose } = this.props

    this.annualInterest = Number(formData.amount) / (formData.termOfLoan / 12) * formData.ltv.interest
    this.monthlyInterest = this.annualInterest / 12
    this.totalInterest = this.monthlyInterest * formData.termOfLoan

    this.collateralNeeded = (Number(formData.amount) / (currencies.find(c => c.short === formData.coin).market_quotes_usd.price)) / formData.ltv.percent

    if (purpose === EMPTY_STATES.BORROW_NOT_ENOUGH_FUNDS) {
      this.bestLtv =  Math.max(ltv.map(x => x.percent))

      this.biggestAmountCryptoUsd = Math.max(walletSummary.coins.map(a => a.amount_usd))
      this.arrayOfAmountUsd = walletSummary.coins.map(c => c.amount_usd)
      this.indexOfLargestAmount = this.arrayOfAmountUsd.indexOf(
        Math.max(this.arrayOfAmountUsd)
      )
    }
  }

  render() {
    const style = LoanCalculatorStyle()
    const {
      coinSelectItems,
    } = this.state

    const {
      actions,
      formData,
      ltv
     } = this.props

    const purposeProps = this.getPurposeSpecificProps()

    if (!formData.ltv) return null

    // console.log({ formData })

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
          { purposeProps.subtitle }
        </CelText>
        <Separator />
        <CelText
          type={'H4'}
          margin={'20 auto 20 auto'}
          weight={'300'}>
          Enter loan amount in dollars
        </CelText>
        <CelInput
          rightText="USD"
          field={'amount'}
          type={'number'}
          placeholder={'10.000'}
          keyboardType={'numeric'}
          value={formData.amount}
        />
        <Card>
          <CelText
            align={'center'}
            type={'H4'}
            margin={'4 0 20 0'}
            weight={'300'}>
            Choose your annual percentage rate
          </CelText>
          <View style={LoanCalculatorStyle.ltvWrapper}>
            {ltv.map(c =>
              (
                <Card
                  size={'thirdExtra'}
                  margin='20 5 20 5'
                  noBorder
                  key={c.interest}
                  styles={ formData.ltv.interest === c.interest ? this.selectedCardStyle : this.cardStyle }
                  onPress={() => {
                    actions.updateFormField('ltv', c)
                  }}
                >
                  <CelText
                    align={'center'}
                    weight='bold'
                    color={STYLES.COLORS.MEDIUM_GRAY}
                    style={ formData.ltv.interest === c.interest ? this.selectedTextStyle : this.percentageTextStyle }>
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
            updateFormField={actions.updateFormField}
          />
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'  }}>
            <Card
              size={'halfExtra'}
              margin='20 10 20 5'
              padding='20 5 20 5'
              color={STYLES.COLORS.LIGHT_GRAY}
            >
              <CelText
                align={'center'}
                weight='bold'
                color={STYLES.COLORS.MEDIUM_GRAY}
                type={'H2'}
              >
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
            name={`Icon${formData.coin}`}
            width='40'
            height='40'
            color={STYLES.COLORS.WHITE}
          />
          <View style={style.selectWrapper}>
            <SimpleSelect
              items={coinSelectItems}
              field='coin'
              displayValue={formData.coin}
              value={formData.coin}
              updateFormField={actions.updateFormField}
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
            {formatter.crypto(this.collateralNeeded, formData.coin)}
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
              margin={'20 0 20 0'}
            >
              { purposeProps.bottomHeading }
            </CelText>
            <CelText
              align={'center'}
              type={'H4'}
              margin={'4 0 20 0'}
              weight={'300'}
            >
              { purposeProps.bottomParagraph }
            </CelText>
            <CelButton
              onPress={purposeProps.onPress}
              margin='20 0 20 0'
            >
              { purposeProps.buttonCopy }
            </CelButton>
          </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(BorrowCalculator);
