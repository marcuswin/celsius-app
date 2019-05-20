import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TouchableOpacity, View } from "react-native";
import moment from "moment";

import formatter from "../../../utils/formatter";
import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import BorrowLandingStyle from "./BorrowLanding.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import STYLES from "../../../constants/STYLES";

import { EMPTY_STATES } from "../../../constants/UI";
import StaticScreen from "../StaticScreen/StaticScreen";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import CelButton from "../../atoms/CelButton/CelButton";
import Card from "../../atoms/Card/Card";
import Icon from "../../atoms/Icon/Icon";
import { KYC_STATUSES, LOAN_STATUS } from "../../../constants/DATA";

@connect(
  state => ({
    user: state.user.profile,
    loanCompliance: state.user.compliance.loan,
    walletSummary: state.wallet.summary,
    allLoans: state.loans.allLoans,
    minimumLoanAmount: state.generalData.minimumLoanAmount,
    ltv: state.loans.ltvs,
    loan: state.user.compliance.loan,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BorrowLanding extends Component {

  static navigationOptions = () => ({
    title: "Borrows",
    right: "profile"
  });

  constructor(props) {
    super(props);
    const { walletSummary, loanCompliance } = this.props;

    const eligibleCoins = walletSummary.coins.filter(coinData => loanCompliance.coins.includes(coinData.short));

    this.state = {
      eligibleCoins,
      maxAmount: eligibleCoins.reduce((max, element) => element.amount_usd > max ? element.amount_usd : max, 0),
      isLoading: true
    };
  }

  async componentDidMount() {
    const { actions, loanCompliance, minimumLoanAmount } = this.props;

    if (loanCompliance.allowed) {
      await actions.getAllLoans();
    }

    const { allLoans, user, kycStatus } = this.props;
    const { maxAmount, minLtv } = this.state;

    this.setState({ isLoading: false });
    // If user has enough money for loan, and doesn't have any previous loans
    // and has passed kyc and is celsius member
    // redirect to BorrowEnterAmount screen
    if (
      maxAmount > minimumLoanAmount / minLtv && (!allLoans || !allLoans.length) &&
      kycStatus === KYC_STATUSES.passed && user.celsius_member
    ) {
      actions.navigateTo("BorrowEnterAmount");
    }
  }

  getLoanStatusDetails = (status) => {
    switch (status) {
      case LOAN_STATUS.ACTIVE:
      case LOAN_STATUS.APPROVED:
        return {
          color: STYLES.COLORS.CELSIUS_BLUE,
          displayText: "Loan active"
        };

      case LOAN_STATUS.PENDING:
        return {
          color: STYLES.COLORS.ORANGE,
          displayText: "Loan pending"
        };

      case LOAN_STATUS.COMPLETED:
        return {
          color: STYLES.COLORS.GREEN,
          displayText: "Loan payout"
        };

      case LOAN_STATUS.REJECTED:
        return {
          color: STYLES.COLORS.RED,
          displayText: "Loan rejected"
        };

      default:
        return {
          color: STYLES.COLORS.CELSIUS_BLUE,
          displayText: "Loan active"
        };
    }
  };

  applyForAnother = () => {
    const { maxAmount, minLtv } = this.state;
    const { actions, minimumLoanAmount } = this.props;

    if (maxAmount < minimumLoanAmount / minLtv) {
      actions.showMessage("warning", "Insufficient funds!");
    } else {
      actions.navigateTo("BorrowEnterAmount");
    }
  };

  render() {
    const { maxAmount, isLoading } = this.state;
    const { actions, user, kycStatus, loanCompliance, allLoans, minimumLoanAmount, walletSummary, ltv } = this.props;
    const style = BorrowLandingStyle();

    if (kycStatus && kycStatus !== KYC_STATUSES.passed) return <StaticScreen
      emptyState={{ purpose: EMPTY_STATES.NON_VERIFIED_BORROW }} />;
    if (!user.celsius_member) return <StaticScreen emptyState={{ purpose: EMPTY_STATES.NON_MEMBER_BORROW }} />;
    if (!loanCompliance.allowed) return <StaticScreen emptyState={{ purpose: EMPTY_STATES.COMPLIANCE }} />;

    /* Calculating difference between largest coin amount and
    minimum amount needed for loan based on current LTV.
    */
   if (!walletSummary) {
    return null
  }
  let walletCoins = walletSummary && walletSummary.coins ? walletSummary.coins : []
  walletCoins = walletCoins
                      .filter(allowedCoin => loanCompliance.coins.includes(allowedCoin.short))
  const arrayOfAmountUsd = walletCoins
                      .map(amount => amount.amount_usd)
  const indexOfLargestAmount = arrayOfAmountUsd
                      .indexOf(Math.max(...arrayOfAmountUsd))
  const largestAmountUsd = walletCoins[indexOfLargestAmount].amount_usd
  const largestAmount = walletCoins[indexOfLargestAmount].amount
  const largestAmountCoin = walletCoins[indexOfLargestAmount].short || 1
  const coinUsdRatio = largestAmountUsd  / largestAmount
  const minimumAmountInCoin = minimumLoanAmount / coinUsdRatio
  const minLtv = Math.max(...ltv.map(x => x.percent))

    if (maxAmount < minimumLoanAmount / minLtv) {
      return (
        <StaticScreen
        emptyState={{
          image: require("../../../../assets/images/diane-sad3x.png"),
          heading: Number(largestAmount) !== 0 ?`To apply for a loan you just need ${ Number(largestAmount) !== 0 ? formatter.crypto((minimumAmountInCoin / minLtv) - largestAmount, largestAmountCoin, {symbol:''}) : minimumLoanAmount} more ${ Number(largestAmount) !== 0 ? largestAmountCoin : 'USD' }` : `To apply for a loan you just need $10.000 in BTC`,

          paragraphs: [`The current loan minimum is ${ formatter.usd(minimumLoanAmount) }. We are working hard on enabling smaller loans. Until we make it happen, you may want to deposit more coins and enable this service immediately.`],
          onPress: () => kycStatus === KYC_STATUSES.passed ? actions.navigateTo('Deposit') : actions.navigateTo("KYCLanding"),
          button: 'Deposit Coins'
        }}
      />
      )
    }
    if (isLoading) return <LoadingScreen />;

    if (allLoans.length > 0) {
      return (
        <RegularLayout>
          <View>
            <CelButton margin='10 0 25 0' onPress={() => actions.navigateTo("BorrowEnterAmount")}>Apply for another loan</CelButton>
            {allLoans && allLoans.map(loan => {
              const loanStatusDetails = this.getLoanStatusDetails(loan.status);
              return (
                <Card key={loan.id}>
                  <CelText type='H6' weight='500' margin={"0 0 0 0"}>Your loans</CelText>
                  <TouchableOpacity style={{ alignItems: "center", flexDirection: "row", flex: 1 }}
                    onPress={() => actions.navigateTo("TransactionDetails", { id: loan.transaction_id })}>
                    <View style={[style.iconWrapper, { backgroundColor: loanStatusDetails.color }]}>
                      <Icon name='TransactionLoan' height={25} width={25} fill={"#FFFFFF"} />
                    </View>
                    <View style={style.info}>
                      <View>
                        <CelText type='H3' weight='600'>${loan.loan_amount}</CelText>
                        <CelText type='H6'
                          weight='300'>{formatter.crypto(loan.amount_collateral_crypto, loan.coin, { precision: 2 })} LOCKED</CelText>
                      </View>
                      <View>
                        <CelText type='H6'
                          weight='300'>{moment(loan.created_at).format("MMM DD, YYYY").toUpperCase()}</CelText>
                        <CelText color={loanStatusDetails.color}>{loanStatusDetails.displayText}</CelText>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Card>
              );
            })}
          </View>
        </RegularLayout>
      )
    } return (
      <RegularLayout>
          <StaticScreen emptyState={{ purpose: EMPTY_STATES.NO_LOANS }} />
      </RegularLayout>
    )
  }
}



export default testUtil.hookComponent(BorrowLanding);
