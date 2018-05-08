import React, {Component} from 'react';
import {View, Text, Image, Linking, TouchableOpacity} from 'react-native';
import {Col, Grid} from "react-native-easy-grid";
// import { Text } from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import formatter from "../../../utils/formatter";
// import {STYLES} from "../../../config/constants/style";
import EstimatedLoanStyle from "./EstimatedLoan.styles";
import Icon from "../../atoms/Icon/Icon";
import CelButton from "../../atoms/CelButton/CelButton";
import Loader from "../../atoms/Loader/Loader";
import Accordion from '../../molecules/Accordion/Accordion';
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import {FONT_SCALE, GLOBAL_STYLE_DEFINITIONS, STYLES} from "../../../config/constants/style";
import LoanPreviewStyle from "../LoanPreview/LoanPreview.styles";

const PLACEHOLDER = 1000;

@connect(
  state => ({
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
    return estimatedLoan ? estimatedLoan.competition_rates.map(cr => (
      <View key={cr.name}>
        <View style={LoanPreviewStyle.separator}/>
        <View style={{paddingTop: 20, paddingBottom: 20}}>
          <Text style={[LoanPreviewStyle.description, {
            fontSize: FONT_SCALE * 16,
            textAlign: 'center',
            marginLeft: 30,
            marginRight: 30
          }]}>
            With a {cr.name} loan at a
            <Text style={GLOBAL_STYLE_DEFINITIONS.boldText}> {(cr.yearly_rate * 100).toFixed(2)}% </Text>
            APR you pay:
          </Text>
        </View>
        <TouchableOpacity onPress={() => Linking.openURL(cr.info_link)}>
          <View style={LoanPreviewStyle.pdfWrapper}>
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
    const { estimatedLoan } = this.props;

    const isLoading = false;

    if (!estimatedLoan) return <Loader />;

    return (
      <SimpleLayout
        animatedHeading={animatedHeading}
      >
        <View style={EstimatedLoanStyle.infoWrapper}>
          <Text style={EstimatedLoanStyle.infoText}>
            Coming soon: we plan to allow Celsius members to start borrowing dollars in a few months, for now, see how big a loan you'll be able to get.
          </Text>
        </View>

        <Text style={EstimatedLoanStyle.description}>
          Your estimated
          <Text style={[EstimatedLoanStyle.description, GLOBAL_STYLE_DEFINITIONS.boldText]}> coin value</Text>
          :
        </Text>
        <Accordion
          renderHeader={ (styles) =>
            <Text style={styles}>
              <Text style={[styles, { opacity: 0.5 }]}>$</Text>
              {formatter.usd(estimatedLoan.estimated_coin_value, {symbol: ''})}
            </Text>
          }
          renderContent={ (styles) =>
            <Text style={styles}>
              Your estimated yearly interested is based on your maximum loan amount of {formatter.usd(PLACEHOLDER, {symbol: '$'})} at
              <Text style={[styles, GLOBAL_STYLE_DEFINITIONS.boldText]}> 9% </Text>
              interest
            </Text>
          }
        />

        <Text style={EstimatedLoanStyle.description}>
          Your estimated
          <Text style={[EstimatedLoanStyle.description, GLOBAL_STYLE_DEFINITIONS.boldText]}> maximum loan amount</Text>
          :
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
              Your estimated yearly interested is based on your maximum loan amount of {formatter.usd(PLACEHOLDER, {symbol: '$'})} at
              <Text style={[styles, GLOBAL_STYLE_DEFINITIONS.boldText]}> 9% </Text>
              interest
            </Text>
          }
        />

        <Text style={EstimatedLoanStyle.description}>
          Your estimated
          <Text style={[EstimatedLoanStyle.description, GLOBAL_STYLE_DEFINITIONS.boldText]}> yearly interest</Text>
          :
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
              Your estimated yearly interested is based on your maximum loan amount of {formatter.usd(PLACEHOLDER, {symbol: '$'})} at
              <Text style={[styles, GLOBAL_STYLE_DEFINITIONS.boldText]}> 9% </Text>
              interest
            </Text>
          }
        />

        <View style={EstimatedLoanStyle.separator}/>

        { this.renderCompetitionRates() }

        <View style={EstimatedLoanStyle.separator}/>

        <View style={EstimatedLoanStyle.hippoSection}>
          <Text style={EstimatedLoanStyle.sectionText}>
            The 1% are able to get loans at as little as 2% interest because they're already rich, with lots of assets and great credit.
          </Text>

          <View style={EstimatedLoanStyle.hippoSectionBubble}>
            <Text style={[EstimatedLoanStyle.sectionText, { color: 'white' }]}>
              With Celsius
              <Text style={[EstimatedLoanStyle.sectionText, { color: 'white' }, GLOBAL_STYLE_DEFINITIONS.boldText]}> you would save </Text>
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

        </View>

        <View style={EstimatedLoanStyle.separator}/>

        <View style={{paddingTop: 20, paddingBottom: 20}}>
          <Text style={{
            marginBottom: 9,
            color: STYLES.PRIMARY_BLUE,
            fontSize: FONT_SCALE * 18,
            fontFamily: 'agile-book',
            textAlign: 'center'
          }}>
            Ready for a change?
          </Text>

          <Text style={EstimatedLoanStyle.sectionText}>
            Save your place in the queue to be one of the first to get a loan.
          </Text>
        </View>
        <View style={{paddingTop: 30, paddingBottom: 60}}>
          <CelButton
            fill={'#fff'}
            loading={isLoading}
            disabled={isLoading}
            customStyles={{backgroundColor: STYLES.PRIMARY_BLUE}}
            customTitleStyles={{color: 'white'}}
            onPress={console.log}
            title={'Verify Profile'}/>
        </View>

      </SimpleLayout>
    );
  }
}

export default EstimatedLoan;
