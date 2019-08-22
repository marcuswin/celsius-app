import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from "prop-types"
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import _ from "lodash";
import * as appActions from "../../../redux/actions"
import BorrowCalculatorStyle from "./BorrowCalculator.styles"
import CelText from '../../atoms/CelText/CelText'
import formatter from "../../../utils/formatter"
import Separator from '../../atoms/Separator/Separator'
import CelInput from '../../atoms/CelInput/CelInput'
import Card from "../../atoms/Card/Card"
import HorizontalSlider from '../../atoms/HorizontalSlider/HorizontalSlider'
import STYLES from "../../../constants/STYLES"
import SimpleSelect from "../../molecules/SimpleSelect/SimpleSelect"
import Icon from "../../atoms/Icon/Icon"
import { KYC_STATUSES } from "../../../constants/DATA";
import { THEMES } from "../../../constants/UI";


@connect(
  state => ({
    ltv: state.loans.ltvs,
    theme: state.user.appSettings.theme,
    formData: state.forms.formData,
    currencies: state.currencies.rates,
    loanCompliance: state.compliance.loan,
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
      ltv
    } = props



    const coinSelectItems = currencies
      .filter(c => loanCompliance.collateral_coins.includes(c.short))
      .map(c => ({
        label: `${c.displayName}  (${c.short})`,
        value: c.short
      }))

    this.state = {
      coinSelectItems,
      loanParams: {},
      loanParamsProps: this.props.loanParams,
    }

    this.sliderItems = [
      { value: 6, label: <CelText>6M</CelText> },
      { value: 12, label: <CelText>1Y</CelText> },
      { value: 24, label: <CelText>2Y</CelText> },
      { value: 48, label: <CelText>4Y</CelText> }
    ]

    props.actions.initForm({
      coin: "BTC",
      termOfLoan: 6,
      amount: 0,
      ltv: ltv[0],
    })

    this.style = BorrowCalculatorStyle()
  }

  componentDidMount() {
    this.updateSliderItems()
  }

  componentDidUpdate(prevProps) {
    const { formData } = this.props;

    if (!_.isEqual(formData, prevProps.formData)) {
      this.updateSliderItems()
    }
  }

  getThemeColors = () => {
    const { theme, themeModal } = this.props;

    return {
      loanCard: themeModal || (theme !== THEMES.DARK) ? STYLES.COLORS.LIGHT_GRAY : STYLES.COLORS.SEMI_GRAY,
      amountCard: themeModal || (theme  !== THEMES.DARK) ? STYLES.COLORS.WHITE : STYLES.COLORS.DARK_HEADER,
      iconColor: themeModal || (theme !== THEMES.DARK) ? STYLES.COLORS.LIGHT_GRAY : STYLES.COLORS.DARK_HEADER
    }
  }

  updateSliderItems = () => {
    const { formData, themeModal } = this.props
    this.calculateLoanParams()
    this.sliderItems = [
      { value: 6, label: <CelText theme={ themeModal } weight={formData.termOfLoan === 6 ? 'bold' : '300'} color={formData.termOfLoan === 6 ? STYLES.COLORS.CELSIUS_BLUE : null}>6M</CelText> },
      { value: 12, label: <CelText theme={ themeModal } weight={formData.termOfLoan === 12 ? 'bold' : '300'} color={formData.termOfLoan === 12 ? STYLES.COLORS.CELSIUS_BLUE : null}>1Y</CelText> },
      { value: 24, label: <CelText theme={ themeModal } weight={formData.termOfLoan === 24 ? 'bold' : '300'} color={formData.termOfLoan === 24 ? STYLES.COLORS.CELSIUS_BLUE : null}>2Y</CelText> },
      { value: 48, label: <CelText theme={ themeModal } weight={formData.termOfLoan === 48 ? 'bold' : '300'} color={formData.termOfLoan === 48 ? STYLES.COLORS.CELSIUS_BLUE : null}>4Y</CelText> }
    ]
  }
  calculateLoanParams = () => {

    const { emitParams } = this.props
    const loanParams = emitParams()
    this.setState({ loanParams })
  }

  changeAmount = (field, value) => {
    const { actions, minimumLoanAmount } = this.props

    if (Number(value) < minimumLoanAmount) {
      actions.showMessage('warning', `Minimum amount for a loan is ${formatter.usd(minimumLoanAmount)}`)
    }

    actions.updateFormField(field, value)
  }

  render() {

    const {
      coinSelectItems,
      loanParams,
    } = this.state

    const {
      actions,
      formData,
      ltv,
      theme,
      themeModal,
      minimumLoanAmount
    } = this.props


    const style = BorrowCalculatorStyle(themeModal || theme)
    if (!formData.ltv) return null;
    const numberOfDigits = Math.max(formatter.usd(loanParams.monthlyInterest).length, formatter.usd(loanParams.totalInterest).length)
    const textType = numberOfDigits > 8 ? "H3" : "H2"
    const themeColors = this.getThemeColors()

    return (
      <View style={style.container}>
        <CelInput
          rightText="USD"
          field={'amount'}
          type={'number'}
          placeholder={`${formatter.usd(minimumLoanAmount, { precision: 0 })} min`}
          keyboardType={'numeric'}
          value={0}
          onChange={this.changeAmount}
          theme={ themeModal }
        />
        <Card theme={ themeModal }>
          <CelText
            align={'center'}
            type={'H4'}
            margin={'4 0 20 0'}
            weight={'300'}
            theme={ themeModal }
          >
            Choose your annual interest rate.
          </CelText>
          <View style={style.ltvWrapper}>
            {themeModal && ltv && ltv.map(c =>
              (
                <Card
                  size={'thirdExtra'}
                  margin='20 5 20 5'
                  noBorder
                  theme={ themeModal }
                  key={c.interest}
                  styles={formData.ltv.interest === c.interest ? style.selectedCardStyle : style.cardStyle}
                  onPress={() => {
                    actions.updateFormField('ltv', c)
                  }}
                >
                  <CelText
                    align={'center'}
                    weight='bold'
                    type={'H6'}
                    style={formData.ltv.interest === c.interest ? style.selectedTextStyle : style.percentageTextStyle}
                    >
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
            weight={'300'}
            theme={ themeModal }
          >
            For how long would you like to borrow?
          </CelText>
          <HorizontalSlider
            items={this.sliderItems}
            field="termOfLoan"
            value={formData.termOfLoan}
            updateFormField={actions.updateFormField}
          />
          <View style={style.annualPercentage}>
            <Card
              size={'halfExtra'}
              margin='20 10 20 5'
              padding='20 5 20 5'
              color={themeColors.loanCard}
              style={style.interestCard}
              theme={ themeModal }
            >
              <CelText
                align={'center'}
                weight='bold'
                style={ !themeModal ? style.interestCardText : { color: STYLES.COLORS.DARK_GRAY }}
                type={textType}
              >
                {loanParams.monthlyInterest}
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
              color={themeColors.loanCard}
            >
              <CelText
                align={'center'}
                weight='bold'
                style={ !themeModal ? style.interestCardText : { color: STYLES.COLORS.DARK_GRAY }}
                type={textType}>
                {loanParams.totalInterest}
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
          weight={'300'}
          theme={ themeModal }>
          Choose a coin to use as collateral
        </CelText>
        <View>
          <Icon
            name={`Icon${formData.coin}`}
            width='40'
            height='40'
            fill={ themeModal || (theme !== THEMES.DARK) ? STYLES.COLORS.DARK_GRAY : STYLES.COLORS.WHITE }
          />
          <View style={style.selectWrapper}>
            <SimpleSelect
              items={coinSelectItems}
              field='coin'
              displayValue={formData.coin}
              value={formData.coin}
              updateFormField={actions.updateFormField}
              placeholder='Choose a coin'
              theme={ themeModal }
            />
          </View>
        </View>
        <Card
          size={'full'}
          margin='20 0 20 0'
          padding='20 0 20 0'
          color={themeColors.amountCard}
        >
          <CelText
            align={'center'}
            weight='bold'
            style={ !themeModal ? style.interestCardText : { color: STYLES.COLORS.DARK_GRAY }}
            type={'H2'}>
            {formatter.crypto(loanParams.collateralNeeded, formData.coin)}
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
          type={'H5'}
          margin={'4 0 20 0'}
          weight={'300'}
          color={STYLES.COLORS.MEDIUM_GRAY}
        >
          The amount of collateral needed is based on your annual interest rate.
        </CelText>
        <Separator />
        <View>
          {!!purposeProps.bottomHeading && (
            <CelText
              weight="bold"
              type="H2"
              align="center"
              margin={'20 0 20 0'}
            >
              {purposeProps.bottomHeading}
            </CelText>
          )}
          {!!purposeProps.bottomParagraph && (
            <CelText
              align={'center'}
              type={'H5'}
              margin={'4 0 20 0'}
              weight={'300'}
            >
              {purposeProps.bottomParagraph}
            </CelText>
          )}

          <CelButton
            onPress={purposeProps.onPress}
            margin='20 0 20 0'
          >
            {purposeProps.buttonCopy}
          </CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default BorrowCalculator
