import React, {Component} from 'react';
import {View, Text, Image, Linking, TouchableOpacity} from 'react-native';
import {Col, Grid} from "react-native-easy-grid";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import formatter from "../../../utils/formatter";
import EstimatedLoanStyle from "./EstimatedLoan.styles";
import Icon from "../../atoms/Icon/Icon";
import Loader from "../../atoms/Loader/Loader";
import Accordion from '../../molecules/Accordion/Accordion';
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import {FONT_SCALE, GLOBAL_STYLE_DEFINITIONS as globalStyles} from "../../../config/constants/style";
import InfoBubble from "../../atoms/InfoBubble/InfoBubble";
import Separator from "../../atoms/Separator/Separator";
import CoinValueAccordion from "../../molecules/CoinValueAccordion/CoinValueAccordion";

@connect(
  state => ({
    portfolio: state.portfolio.portfolio,
    estimatedLoan: state.portfolio.estimatedLoan,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class EstimatedLoan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animatedHeading: {
        text: 'Estimated loan',
        subheading: 'based on your portfolio',
      }
    };
    // binders
  }

  // lifecycle methods
  componentDidMount() {
    const { getEstimatedLoan } = this.props;
    getEstimatedLoan();
  }

  // event hanlders
  // rendering methods
  renderCompetitionRates() {
    const { estimatedLoan } = this.props;
    return estimatedLoan ? estimatedLoan.competition_rates.map((cr, i) => (
      <View key={cr.name}>
        { i !== 0 ? <Separator /> : null }
        <View style={{paddingTop: 20, paddingBottom: 20}}>
          <Text style={[globalStyles.normalText, {
            fontSize: FONT_SCALE * 16,
            textAlign: 'center',
            marginLeft: 30,
            marginRight: 30
          }]}>
            With a {cr.name} loan at a
            <Text style={globalStyles.bold}> {(cr.yearly_rate * 100).toFixed(2)}% </Text>
            APR you pay:
          </Text>
        </View>
        <TouchableOpacity onPress={() => Linking.openURL(cr.info_link)}>
          <View style={EstimatedLoanStyle.pdfWrapper}>
            <Grid>
              <Col>
                <Image style={{width: 100, height: 63, marginLeft: 12}} source={{uri: cr.image}}/>
              </Col>
              <Col>
                <Text style={{fontFamily: 'agile-medium', color: '#3D4853', fontSize: FONT_SCALE * 24}}>
                  {formatter.usd(cr.interest_usd)}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{
                    color: 'rgba(61,72,83,0.5)',
                    fontSize: FONT_SCALE * 16,
                    fontFamily: 'agile-light',
                    marginTop: 7
                  }}>
                    {cr.info_text}
                  </Text>
                  <Icon style={{marginLeft: 10}} name='IconBlank' width='14' height='14' viewBox="0 0 14 14"
                        fill='#C8C8C8'/>
                </View>
              </Col>
            </Grid>
          </View>
        </TouchableOpacity>
      </View>
    )) : null;
  }

  render() {
    const { animatedHeading } = this.state;
    const { estimatedLoan, portfolio } = this.props;

    if (!estimatedLoan) return <Loader />;

    return (
      <SimpleLayout
        animatedHeading={animatedHeading}
      >
        <InfoBubble
          renderContent={(textStyles) => (
            <Text style={textStyles}>
              <Text style={[textStyles, globalStyles.boldText]}>Coming soon: </Text>
              we plan to allow Celsius members to start borrowing dollars in a few months, for now, see how big a loan you'll be able to get. Initially based on your BTC and ETH deposits.
            </Text>
          )}
        />

        <Text style={globalStyles.normalText}>
          The estimated
          <Text style={[globalStyles.normalText, globalStyles.boldText]}> value of your coins </Text>
          eligible for a loan is:
        </Text>
        <CoinValueAccordion portfolio={portfolio} estimatedCoinValue={estimatedLoan.estimated_coin_value} />

        <Text style={globalStyles.normalText}>
          The biggest estimated loan you could get would be for:
        </Text>
        <Accordion
          renderHeader={ (styles) =>
            <Text style={styles}>
              <Text style={[styles, { opacity: 0.5 }]}>$</Text>
              {formatter.usd(estimatedLoan.max_loan_amount, {symbol: ''})}
            </Text>
          }
          renderContent={ (styles) =>
            <Text style={styles}>
              Your estimated loan amount is based on
              <Text style={[styles, globalStyles.boldText]}> 33.33% </Text>
              of your BTC and ETH value. Please note that during 2018 we will cap all loans at $10,000 in order to allow as many people as possible to receive loans.
            </Text>
          }
        />

        <Text style={globalStyles.normalText}>
          You'll pay about this much in yearly interest:
        </Text>
        <Accordion
          renderHeader={ (styles) =>
            <Text style={styles}>
              <Text style={[styles, { opacity: 0.5 }]}>$</Text>
              {formatter.usd(estimatedLoan.yearly_interest, {symbol: ''})}
            </Text>
          }
          renderContent={ (styles) =>
            <Text style={styles}>
              Your estimated yearly interested is based on your maximum loan amount of { formatter.usd(estimatedLoan.max_loan_amount) } at
              <Text style={[styles, globalStyles.boldText]}> 9% interest </Text>
              (which you can pay in CEL tokens or dollars).
            </Text>
          }
        />

        <Separator />

        <Text style={globalStyles.heading}>
          See How Celsius Compares to Other Credit Options Out There
        </Text>

        { this.renderCompetitionRates() }

        <Separator />

        <View style={EstimatedLoanStyle.hippoSection}>
          <Text style={globalStyles.heading}>
            It's Not About Profit, It's About Community
          </Text>

          <View style={EstimatedLoanStyle.hippoSectionBubble}>
            <Text style={[EstimatedLoanStyle.sectionText, { color: 'white' }]}>
              With Celsius
              <Text style={[EstimatedLoanStyle.sectionText, { color: 'white' }, globalStyles.boldText]}> you would save </Text>
              <Text style={[EstimatedLoanStyle.sectionText, { color: 'white' }]}> { formatter.usd(estimatedLoan.competition_rates[0].interest_usd - estimatedLoan.yearly_interest) } </Text>
              over your credit card and
              <Text style={[EstimatedLoanStyle.sectionText, { color: 'white' }]}> { formatter.usd(estimatedLoan.competition_rates[1].interest_usd - estimatedLoan.yearly_interest) } </Text>
              over a Payday loan.
            </Text>
          </View>
          <View stye={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../../../assets/images/bubble-pointer.png')} style={EstimatedLoanStyle.bubblePointer}/>
          </View>

          <View style={EstimatedLoanStyle.hippo}>
            <Image source={require('../../../../assets/images/two-thumbs-up.png')} style={EstimatedLoanStyle.hippoImage}/>

            <Text style={[EstimatedLoanStyle.sectionText, { width: 150 }]}>
              We want to provide our community with the lowest rates possible.
            </Text>
          </View>

          <Text style={[EstimatedLoanStyle.sectionText, { marginTop: 20 }]}>
            The 1% are able to get loans at as little as 2% interest because they're already rich, now it's your turn.
          </Text>
        </View>

        <Separator />

        <View style={EstimatedLoanStyle.bearWrapper}>
          <Image source={require('../../../../assets/images/polar-bear-hodl.png')} style={EstimatedLoanStyle.bearImage}/>
        </View>

        <Text style={[globalStyles.normalText, { textAlign: 'center', marginTop: 17, marginBottom: 30 }]}>
          You're
          <Text style={[globalStyles.normalText, globalStyles.boldText]}> { formatter.ordinalSuffixOf(estimatedLoan.position_in_line) } </Text>
          person in line to be eligible to borrow out your coins and earn interest (once when you transfer your coins and they are lent).
        </Text>

      </SimpleLayout>
    );
  }
}

export default EstimatedLoan;
