import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Animated, View } from "react-native";

import * as appActions from "../../../redux/actions";
// import BorrowLandingStyle from "./BorrowLanding.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import { hasPassedKYC } from "../../../utils/user-util";

import { EMPTY_STATES } from "../../../constants/UI";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import BorrowCalculator from "../../organisms/BorrowCalculator/BorrowCalculator";
import { KYC_STATUSES } from "../../../constants/DATA";
import { widthPercentageToDP } from "../../../utils/styles-util";
import LoanOverviewCard from "../../organisms/LoanOverviewCard/LoanOverviewCard";
import CelButton from "../../atoms/CelButton/CelButton";
import { getLoanStatusDetails } from "../../../utils/loan-util";

const cardWidth = widthPercentageToDP("70%");

@connect(
  state => ({
    user: state.user.profile,
    loanCompliance: state.compliance.loan,
    walletSummary: state.wallet.summary,
    allLoans: state.loans.allLoans,
    minimumLoanAmount: state.generalData.minimumLoanAmount,
    ltv: state.loans.ltvs,
    loan: state.compliance.loan,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BorrowLanding extends Component {

  static navigationOptions = () => ({
    title: "Borrow",
    right: "profile"
  });

  constructor(props) {
    super(props);
    const { walletSummary, loanCompliance, ltv } = this.props;

    const eligibleCoins = walletSummary.coins.filter(coinData => loanCompliance.collateral_coins.includes(coinData.short));

    this.state = {
      eligibleCoins,
      maxAmount: eligibleCoins.reduce((max, element) => element.amount_usd > max ? element.amount_usd : max, 0),
      isLoading: true,
      xOffset: new Animated.Value(0)
    };

    this.bestLtv = Math.max(...ltv.map(x => x.percent));
  }

  async componentDidMount() {
    const { actions, loanCompliance, minimumLoanAmount } = this.props;

    if (loanCompliance.allowed) {
      await actions.getAllLoans();
    }

    const { allLoans, user } = this.props;
    const { maxAmount } = this.state;

    this.setState({ isLoading: false });
    // If user has enough money for loan, and doesn't have any previous loans
    // and has passed kyc and is celsius member
    // redirect to BorrowEnterAmount screen
    if (
      maxAmount > minimumLoanAmount / this.bestLtv && (!allLoans || !allLoans.length) &&
      hasPassedKYC() && user.celsius_member
    ) {
      actions.navigateTo("BorrowEnterAmount");
    }
  }

  applyForAnother = () => {
    const { maxAmount } = this.state;
    const { actions, minimumLoanAmount } = this.props;

    if (maxAmount < minimumLoanAmount / this.bestLtv) {
      actions.showMessage("warning", "Insufficient funds!");
    } else {
      actions.navigateTo("BorrowEnterAmount");
    }
  };

  transitionAnimation = (index) => ({
    transform: [
      { perspective: 800 },
      {
        scale: this.state.xOffset.interpolate({
          inputRange: [
            (index - 1) * cardWidth,
            index * cardWidth,
            (index + 1) * cardWidth
          ],
          outputRange: [0.9, 1, 0.9],
          extrapolate: "clamp"
        })
      }
    ]
  });

  render() {
    const { maxAmount, isLoading, xOffset } = this.state;
    const { actions, user, kycStatus, loanCompliance, allLoans, minimumLoanAmount, ltv } = this.props;
    // const style = BorrowLandingStyle();

    if (kycStatus && !hasPassedKYC()) return <BorrowCalculator
      purpose={EMPTY_STATES.NON_VERIFIED_BORROW}/>;
    if (!user.celsius_member) return <BorrowCalculator purpose={EMPTY_STATES.NON_MEMBER_BORROW}/>;
    if (!loanCompliance.allowed) return <BorrowCalculator purpose={EMPTY_STATES.COMPLIANCE}/>;

    if (isLoading) return <LoadingScreen/>;

    const minLtv = Math.max(...ltv.map(x => x.percent));

    if (maxAmount < minimumLoanAmount / minLtv) return <BorrowCalculator
      purpose={EMPTY_STATES.BORROW_NOT_ENOUGH_FUNDS}/>;

    return (
      <RegularLayout padding={"20 0 100 0"}>
        <View>
          <CelButton margin='10 0 25 0' onPress={() => actions.navigateTo("BorrowEnterAmount")}>Apply for another loan</CelButton>
          <Animated.ScrollView
            horizontal
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: xOffset } } }],
              { useNativeDriver: true }
            )}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            snapToInterval={cardWidth + widthPercentageToDP("4%")}
            snapToAlignment={"center"}
          >
            <View style={{ width: widthPercentageToDP("15%") }}/>
            {
              allLoans && allLoans.map((loan, index) => {
                const loanStatusDetails = getLoanStatusDetails(loan.status);
                const opacity = xOffset.interpolate({
                  inputRange: [
                    (index - 1) * cardWidth,
                    index * cardWidth,
                    (index + 1) * cardWidth
                  ],
                  outputRange: [0.3, 1, 0.15],
                  extrapolate: "clamp"
                });
                return (
                  <Animated.View key={loan.id} style={[this.transitionAnimation(index), { opacity }]}>
                    <LoanOverviewCard
                      loan={{
                        ...loan,
                        ...loanStatusDetails,
                      }}
                      onPressDetails={() => actions.navigateTo("LoanRequestDetails", { id: loan.transaction_id, loan })}
                    />
                  </Animated.View>
                );
              })
            }
            <View style={{ width: widthPercentageToDP("15%") }}/>
          </Animated.ScrollView>
        </View>
      </RegularLayout>
    );
  }
}

export default BorrowLanding;
