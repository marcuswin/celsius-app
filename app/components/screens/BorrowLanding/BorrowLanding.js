import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Constants } from 'expo';
import { TouchableOpacity, View } from 'react-native'
import moment from 'moment';

import formatter from "../../../utils/formatter";
import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import BorrowLandingStyle from "./BorrowLanding.styles";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import STYLES from '../../../constants/STYLES';

import { EMPTY_STATES } from "../../../constants/UI";
import StaticScreen from "../StaticScreen/StaticScreen";
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import CelButton from '../../atoms/CelButton/CelButton'
import Card from '../../atoms/Card/Card'
import Icon from '../../atoms/Icon/Icon'
import { LOAN_STATUS } from '../../../constants/DATA'

const { MIN_LOAN_AMOUNT } = Constants.manifest.extra;

@connect(
  state => ({
    loanCompliance: state.user.compliance.loan,
    walletSummary: state.wallet.summary,
    allLoans: state.loans.allLoans
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BorrowLanding extends Component {

  static navigationOptions = () => ({
    title: "Borrows",
    right: "profile"
  });

  constructor(props) {
    super(props);
    const {walletSummary, loanCompliance} = this.props;

    const eligibleCoins = walletSummary.coins.filter(coinData => loanCompliance.coins.includes(coinData.short))

    this.state = {
      maxAmount: eligibleCoins.reduce((max, element) => element.amount_usd > max ? element.amount_usd : max, 0) / 2,
      isLoading: true
    };
  }

  async componentDidMount() {
    const { actions, loanCompliance } = this.props

    if (loanCompliance.allowed) {
      await actions.getAllLoans()
    }

    const { allLoans } = this.props
    const { maxAmount } = this.state

    this.setState({isLoading: false})
    // If user has enough money for loan, and doesn't have any previous loans
    // redirect to BorrowEnterAmount screen
    if (maxAmount > MIN_LOAN_AMOUNT && (!allLoans || !allLoans.length)) {
      actions.navigateTo('BorrowEnterAmount')
    }
  }

  getLoanStatusDetails = (status) => {
    switch (status) {
      case LOAN_STATUS.ACTIVE:
      case LOAN_STATUS.APPROVED:
        return {
          color: STYLES.COLORS.CELSIUS_BLUE,
          displayText: 'Loan active'
        }

      case LOAN_STATUS.PENDING:
        return {
          color: STYLES.COLORS.ORANGE,
          displayText: 'Loan pending'
        }

      case LOAN_STATUS.COMPLETED:
        return {
          color: STYLES.COLORS.GREEN,
          displayText: 'Loan payout'
        }

      case LOAN_STATUS.REJECTED:
        return {
          color: STYLES.COLORS.RED,
          displayText: 'Loan rejected'
        }

      default:
        return {
          color: STYLES.COLORS.CELSIUS_BLUE,
          displayText: 'Loan active'
        }
    }
  }

  applyForAnother = () => {
    const { maxAmount } = this.state;
    const { actions } = this.props

    if (maxAmount < MIN_LOAN_AMOUNT) {
      actions.showMessage('warning', 'Insufficient funds!')
    } else {
      actions.navigateTo('BorrowEnterAmount')
    }
  }

  render() {
    const { maxAmount, isLoading } = this.state;
    const { actions, loanCompliance, allLoans } = this.props;
    const style = BorrowLandingStyle();

    if (isLoading) return <LoadingScreen/>

    if (!loanCompliance.allowed) {
      return (
        <StaticScreen
          emptyState={{ purpose: EMPTY_STATES.COMPLIANCE }}
        />
      )
    }

    if (maxAmount < MIN_LOAN_AMOUNT) {
      return (
        <StaticScreen
          emptyState={{ purpose: EMPTY_STATES.INSUFFICIENT_FUNDS }}
        />
      )
    }

    return (
      <RegularLayout>
        {maxAmount < MIN_LOAN_AMOUNT
          ?
            <Fragment>
              <CelText type='H3' margin={'0 0 20 0'} color={STYLES.COLORS.RED}>Insufficient funds!</CelText>
              <CelButton onPress={() => actions.navigateTo('Deposit')}>Deposit more coins</CelButton>
            </Fragment>
          :
            <CelButton onPress={() => actions.navigateTo('BorrowEnterAmount')}>Apply for another loan</CelButton>
        }

        <View>
          <CelText type='H6' weight='500' margin={'20 0 0 0'}>Your loans</CelText>
          {allLoans.map(loan => {
            const loanStatusDetails = this.getLoanStatusDetails(loan.status)

            return (
              <Card key={loan.id}>
                <TouchableOpacity style={{alignItems: 'center', flexDirection: 'row', flex: 1}} onPress={() => actions.navigateTo('TransactionDetails', {id: loan.id})}>
                  <View style={[style.iconWrapper, {backgroundColor: loanStatusDetails.color}]}>
                    <Icon name='TransactionLoan' height={25} width={25} fill={'#FFFFFF'}/>
                  </View>
                  <View style={style.info}>
                    <View>
                      <CelText type='H3' weight='600'>${loan.loan_amount}</CelText>
                      <CelText type='H6' weight='300'>{formatter.crypto(loan.amount_collateral_crypto, loan.coin, {precision: 2})} LOCKED</CelText>
                    </View>

                    <View>
                      <CelText type='H6' weight='300'>{moment(loan.created_at).format('MMM DD, YYYY').toUpperCase()}</CelText>
                      <CelText color={loanStatusDetails.color}>{loanStatusDetails.displayText}</CelText>
                    </View>
                  </View>
                </TouchableOpacity>
              </Card>
            )
          })}
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(BorrowLanding);
