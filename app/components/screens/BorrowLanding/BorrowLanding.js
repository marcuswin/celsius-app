import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Animated, View, TouchableOpacity, Image } from "react-native";

import * as appActions from "../../../redux/actions";
import BorrowLandingStyle from "./BorrowLanding.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import { hasPassedKYC } from "../../../utils/user-util";
import { EMPTY_STATES, MODALS } from "../../../constants/UI";
import formatter from "../../../utils/formatter";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import BorrowCalculatorScreen from "../../organisms/BorrowCalculatorScreen/BorrowCalculatorScreen";
import { KYC_STATUSES } from "../../../constants/DATA";
import { widthPercentageToDP } from "../../../utils/styles-util";
import LoanOverviewCard from "../../organisms/LoanOverviewCard/LoanOverviewCard";
import BorrowCalculatorModal from "../../organisms/BorrowCalculatorModal/BorrowCalculatorModal";

import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import Separator from "../../atoms/Separator/Separator";

const cardWidth = widthPercentageToDP("70%");

@connect(
  state => ({
    user: state.user.profile,
    formData: state.forms.formData,
    currencies: state.currencies.rates,
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
    title: "Loan Overview",
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
    const { actions, loanCompliance } = this.props;

    if (loanCompliance.allowed) {
      await actions.getAllLoans();
    }

    this.setState({ isLoading: false });
  }

  getMinLtv = () => {

    const { ltv } = this.props;

    return Math.max(...ltv.map(x => x.percent));
  };

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

  // TODO (fj) move to loans util
  emitParams = () => {
    const { formData, currencies, walletSummary, ltv, minimumLoanAmount, loanCompliance } = this.props;
    const loanParams = {};

    if (formData && formData.ltv) {
      loanParams.annualInterestPct = formData.ltv.interest;
      loanParams.totalInterestPct = loanParams.annualInterestPct * (formData.termOfLoan / 12);
      loanParams.monthlyInterestPct = loanParams.totalInterestPct / formData.termOfLoan;

      loanParams.totalInterest = formatter.usd(Number(loanParams.totalInterestPct * formData.amount));
      loanParams.monthlyInterest = formatter.usd(Number(loanParams.totalInterestPct * formData.amount / formData.termOfLoan));

      loanParams.collateralNeeded = (Number(formData.amount) / (currencies.find(c => c.short === formData.coin).market_quotes_usd.price)) / formData.ltv.percent;
      loanParams.bestLtv = Math.max(...ltv.map(x => x.percent));


      const eligibleCoins = walletSummary.coins.filter(coinData => loanCompliance.collateral_coins.includes(coinData.short));
      const arrayOfAmountUsd = eligibleCoins.map(c => c.amount_usd);

      const indexOfLargestAmount = arrayOfAmountUsd.indexOf(Math.max(...arrayOfAmountUsd));

      loanParams.largestAmountCrypto = eligibleCoins[indexOfLargestAmount].amount;
      loanParams.largestShortCrypto = eligibleCoins[indexOfLargestAmount].short;
      loanParams.minimumLoanAmountCrypto = minimumLoanAmount / (currencies.find(c => c.short === eligibleCoins[indexOfLargestAmount].short)).market_quotes_usd.price;
      loanParams.missingCollateral = (loanParams.minimumLoanAmountCrypto - loanParams.largestAmountCrypto) / loanParams.bestLtv;

    }
    return loanParams;
  };

  renderCard = () => {
    const style = BorrowLandingStyle();
    const { actions } = this.props;
    return (
      <Card
        padding='12 12 12 12'
      >
        <View style={style.buttonsWrapper}>
          <View style={style.buttonIconText}>
            <TouchableOpacity
              style={{ marginLeft: widthPercentageToDP("3.3%"), marginRight: widthPercentageToDP("3.3%") }}
              onPress={() => actions.navigateTo("BorrowEnterAmount")}>
              <View style={style.buttonItself}>
                <Image
                  style={{
                    alignSelf: "center",
                    width: 25,
                    height: 29,
                    marginBottom: 5,
                    marginTop: 6
                  }}
                  source={require("../../../../assets/images/icon-apply-for-a-new-loan.png")}
                />
                <CelText align='center'>
                  Apply for
                </CelText>
                <CelText align='center'>
                  a loan
                </CelText>
              </View>
            </TouchableOpacity>
            <Separator
              vertical
              height={"35%"}
              top={50}
            />
            <TouchableOpacity
              style={{ marginLeft: widthPercentageToDP("3.3%"), marginRight: widthPercentageToDP("3.3%") }}
              onPress={() => {
                actions.openModal(MODALS.BORROW_CALCULATOR_MODAL);
              }}
            >
              <View style={style.buttonItself}>
                <Image
                  style={{
                    alignSelf: "center",
                    width: 25,
                    height: 25,
                    marginBottom: 18,
                    marginTop: 6
                  }}
                  source={require("../../../../assets/images/calculator.png")}
                />
                <CelText align='center'>
                  Calculator
                </CelText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    );
  };

  renderDefaultView() {
    const { xOffset } = this.state;
    const { actions, allLoans } = this.props;

    return (
      <RegularLayout padding={"20 0 100 0"}>
        <View>

          <View style={{ marginLeft: 20, marginRight: 20 }}>
            {this.renderCard()}
          </View>
          <Animated.ScrollView
            horizontal
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: xOffset } } }],
              { useNativeDriver: true }
            )}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            snapToInterval={cardWidth}
            snapToAlignment={"right"}
          >
            {
              allLoans && allLoans.map((loan, index) => {
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
                      loan={loan}
                      index={index}
                      length={allLoans.length - 1}
                      navigateTo={actions.navigateTo}
                    />
                  </Animated.View>
                );
              })
            }
          </Animated.ScrollView>
          <BorrowCalculatorModal emitParams={this.emitParams}/>
        </View>
      </RegularLayout>
    );
  }

  // slavija intersection
  renderIntersection() {
    const { maxAmount, isLoading } = this.state;
    const { user, kycStatus, loanCompliance, minimumLoanAmount } = this.props;
    const minLtv = this.getMinLtv();


    if (kycStatus && !hasPassedKYC()) return <BorrowCalculatorScreen emitParams={this.emitParams}
                                                                     purpose={EMPTY_STATES.NON_VERIFIED_BORROW}/>;
    if (!user.celsius_member) return <BorrowCalculatorScreen emitParams={this.emitParams}
                                                             purpose={EMPTY_STATES.NON_MEMBER_BORROW}/>;
    if (!loanCompliance.allowed) return <BorrowCalculatorScreen emitParams={this.emitParams}
                                                                purpose={EMPTY_STATES.COMPLIANCE}/>;

    if (isLoading) return <LoadingScreen/>;

    if (maxAmount < minimumLoanAmount / minLtv) return <BorrowCalculatorScreen emitParams={this.emitParams}
                                                                               purpose={EMPTY_STATES.BORROW_NOT_ENOUGH_FUNDS}/>;

    return this.renderDefaultView();
  }

  render() {
    const { walletSummary } = this.props;
    if (!walletSummary) return null;
    return this.renderIntersection();
  }
}

export default BorrowLanding;
