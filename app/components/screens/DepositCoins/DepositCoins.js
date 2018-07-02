import React, {Component} from 'react';
import { Text, Image, View } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import get from "lodash/get";

import * as actions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import InfoBubble from "../../atoms/InfoBubble/InfoBubble";
import Loader from "../../atoms/Loader/Loader";
import CoinValueAccordion from "../../molecules/CoinValueAccordion/CoinValueAccordion";
import {GLOBAL_STYLE_DEFINITIONS as globalStyles} from "../../../config/constants/style";
import formatter from "../../../utils/formatter";
import Accordion from "../../molecules/Accordion/Accordion";
import Separator from "../../atoms/Separator/Separator";
import DepositCoinsStyle from "./DepositCoins.styles";
import PortfolioEmptyState from "../../atoms/PortfolioEmptyState/PortfolioEmptyState";

@connect(
  state => ({
    portfolio: state.portfolio.portfolio,
    estimatedInterest: state.portfolio.estimatedInterest,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class DepositCoins extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animatedHeading: {
        text: 'Deposit Coins',
        subheading: 'Earn interest',
      }
    };
    // binders
  }

  // lifecycle methods
  componentDidMount() {
    const { getEstimatedInterest, portfolio, getPortfolio } = this.props;
    getEstimatedInterest();
    if (!portfolio) getPortfolio();
  }

  componentWillReceiveProps(nextProps) {
    const { getEstimatedInterest, getPortfolio, activeScreen } = this.props;
    if (nextProps.activeScreen === 'DepositCoins' && activeScreen !== nextProps.activeScreen) {
      getEstimatedInterest();
      if (!nextProps.portfolio) getPortfolio();
    }
  }

  // event hanlders
  // rendering methods
  render() {
    const { animatedHeading } = this.state;
    const { estimatedInterest, portfolio, navigateTo } = this.props;

    if (!estimatedInterest || !portfolio) return <Loader text="Estimating Interest on Coins" />;

    const portfolioData = get(portfolio, 'data', [])

    if (!estimatedInterest.estimated_coin_value) return (
      <SimpleLayout
        animatedHeading={animatedHeading}
      >
        <PortfolioEmptyState onPress={() => navigateTo('ManagePortfolio')}/>
      </SimpleLayout>
    );

    return (
      <SimpleLayout animatedHeading={animatedHeading}>
        <InfoBubble
          renderContent={(textStyles) => (
            <Text style={textStyles}>
              <Text style={[textStyles, globalStyles.boldText]}>Coming soon: </Text>
              we plan to allow Celsius members to start earning interest later this year, for now, see how much interest you might be able to get.
            </Text>
          )}
        />

        <Text style={globalStyles.normalText}>
          Unlike banks, we distribute most of the fees and interest from borrowers back to the Celsius community.
        </Text>

        <Text style={[globalStyles.normalText, { marginTop: 25 }]}>
          Your estimated
          <Text style={[globalStyles.normalText, globalStyles.boldText]}> coin value: </Text>
        </Text>
        <CoinValueAccordion portfolio={portfolioData} estimatedCoinValue={estimatedInterest.estimated_coin_value} />

        <Text style={globalStyles.normalText}>
          At
          <Text style={[globalStyles.normalText, globalStyles.boldText]}> 4.89% interest a year</Text>
          , we estimate your interest would be:
        </Text>
        <Accordion
          renderHeader={ (styles) =>
            <Text style={styles}>
              <Text style={[styles, { opacity: 0.5 }]}>$</Text>
              {formatter.usd(estimatedInterest.lending_interest, {symbol: ''})}
            </Text>
          }
          renderContent={ () => <Image source={require('../../../../assets/images/lending-interest-chart.png')} style={DepositCoinsStyle.pieChart}/> }
        />

        <Text style={globalStyles.heading}>
          How do we calculate the interest you earn?
        </Text>

        <Text style={[globalStyles.normalText, { textAlign: 'center' }]}>
          We want to maximize the return for all HODLers and do what's in the best interest of all of our members.
        </Text>

        <Text style={[globalStyles.normalText, { textAlign: 'center', marginTop: 17 }]}>
          Our formula for CEL interest will be based on 3 factors which reward HODLing and discourage speculation:</Text>

        <Text style={[globalStyles.normalText, { textAlign: 'center' }]}>50% - the amount of BTC or ETH you've deposited.</Text>

        <Text style={[globalStyles.normalText, { textAlign: 'center' }]}>25% - the amount of time you've been part of the Celsius community vs. others without withdrawing your coins.</Text>

        <Text style={[globalStyles.normalText, { textAlign: 'center' }]}>25% - the amount of CEL tokens you've earned as a percentage of how many you've withdrawn.</Text>

        <Text style={[globalStyles.normalText, { textAlign: 'center', marginTop: 17, marginBottom: 33 }]}>
          We are working on distributing CEL interest to our community, so for now, we're using the interest earned from deposits to buy back CEL on the open market in order to reduce the number of CEL in circulation.
        </Text>

        <Separator margin='15 0 30 0'/>

        <View style={DepositCoinsStyle.hippoWrapper}>
          <Image source={require('../../../../assets/images/two-thumbs-up.png')} style={DepositCoinsStyle.hippoImage}/>
        </View>

        <Text style={[globalStyles.normalText, { textAlign: 'center', marginTop: 17, marginBottom: 40 }]}>
          You're the
          <Text style={[globalStyles.normalText, globalStyles.boldText]}> { formatter.ordinalSuffixOf(estimatedInterest.position_in_line) } </Text>
          person in line eligible to lend out your coins and earn interest (once when you transfer your coins and they are lent).
        </Text>
      </SimpleLayout>
    );
  }
}

export default DepositCoins;
