import React, {Component} from 'react';
import {Image, Linking, StatusBar, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Text, View} from 'native-base';
import {bindActionCreators} from "redux";
import {Col, Grid} from "react-native-easy-grid";
import formatter from '../../utils/formatter';

import * as actions from "../../redux/actions";
import API from "../../config/constants/API";
import Accordion from '../../components/Accordion/Accordion';
import {MainHeader} from '../../components/Headers/MainHeader/MainHeader';
import {AnimatedHeading} from '../../components/Headings/AnimatedHeading/AnimatedHeading';
import LoanPreviewStyle from "./styles";
import {PrimaryButton} from "../../components/Buttons/Button/Button";
import {FONT_SCALE, GLOBAL_STYLE_DEFINITIONS, STYLES} from "../../config/constants/style";
import Icon from "../../components/Icons/Icon";
import apiUtil from "../../utils/api-util";

@connect(
  state => ({
    nav: state.nav,
    loanRequest: state.loanRequests.loanRequest,
    competitionRates: state.loanRequests.competitionRates,
    lastCompletedCall: state.api.lastCompletedCall,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class LoanPreviewScreen extends Component {
  constructor() {
    super();

    this.state = {};

    this.handleAcceptLoanRequest = this.handleAcceptLoanRequest.bind(this);
    this.renderCollateralsText = this.renderCollateralsText.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { lastCompletedCall } = nextProps;
    const { navigateTo } = this.props;

    if (this.props.lastCompletedCall !== lastCompletedCall && lastCompletedCall === API.ACCEPT_LOAN_REQUEST) {
      navigateTo('PersonalInfo', true);
    }
  }

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  handleAcceptLoanRequest() {
    const {navigateTo, acceptLoanRequest, loanRequest} = this.props;
    if (loanRequest.status !== 'accepted') {
      acceptLoanRequest();
    } else {
      navigateTo('PersonalInfo', true);
    }

  }

  renderCollateralsText(styles) {
    const { loanRequest } = this.props;
    const collateralValues = loanRequest.loan_collaterals.map(lc => <Text style={[styles, GLOBAL_STYLE_DEFINITIONS.boldText]}>{formatter.crypto(lc.amount, lc.cryptocurrency.short)}</Text>);
    const collateralRates = loanRequest.loan_collaterals.map(lc => <Text style={[styles, GLOBAL_STYLE_DEFINITIONS.boldText]}>{formatter.usd(lc.rate_usd)}</Text>);

    const collaterals = collateralValues.map((cv, i) => <Text style={styles} key={ loanRequest.loan_collaterals[i].id }>{ i !== 0 ? ', and ' : '' }{ cv } at a rate of { collateralRates[i] }</Text>);

    return (
      <Text style={styles}>
        Your total coin value is calculated based on { collaterals } according to the latest rates on
        <Text style={[styles, { color: '#88A2C7' }]} onPress={() => Linking.openURL('https://coinmarketcap.com/')}> coinmarketcap.com</Text>
      </Text>
    )
  }

  render() {
    const {loanRequest, competitionRates, callsInProgress} = this.props;

    const isLoading = apiUtil.areCallsInProgress([API.ACCEPT_LOAN_REQUEST], callsInProgress);

    return (
      <Container>
        <StatusBar barStyle="dark-content"/>
        <MainHeader {...this.props} backButton customStyle={{backgroundColor: STYLES.PRIMARY_BLUE}}/>
        <AnimatedHeading
          containerCustomStyles={{backgroundColor: STYLES.PRIMARY_BLUE}}
          ref={(heading) => {
            this.heading = heading;
          }}
          text={'Estimated Loan'}
          subheading={'Amount you can borrow'}/>

        <Image style={{height: 10, width: '100%', backgroundColor: STYLES.PRIMARY_BLUE, resizeMode: 'contain'}}
               source={require('../../../assets/images/progress-2.png')}/>

        <Content bounces={false} style={LoanPreviewStyle.content} onScroll={this.onScroll}>
          <View style={LoanPreviewStyle.wrapper}>

            <Text style={LoanPreviewStyle.description}>
              Your estimated
              <Text style={[LoanPreviewStyle.description, GLOBAL_STYLE_DEFINITIONS.boldText]}> coin value</Text>
              :
            </Text>
            <Accordion
              renderHeader={ (styles) =>
                <Text style={styles}>
                  <Text style={[styles, { opacity: 0.5 }]}>$</Text>
                  {formatter.usd(loanRequest.totalCoinValue, {symbol: ''})}
                </Text>
              }
              renderContent={this.renderCollateralsText}
            />

            <Text style={LoanPreviewStyle.description}>
              Your estimated
              <Text style={[LoanPreviewStyle.description, GLOBAL_STYLE_DEFINITIONS.boldText]}> maximum loan amount</Text>
              :
            </Text>
            <Accordion
              renderHeader={ (styles) =>
                <Text style={styles}>
                  <Text style={[styles, { opacity: 0.5 }]}>$</Text>
                  {formatter.usd(loanRequest.amount_to_borrow_usd, {symbol: ''})}
                </Text>
              }
              renderContent={ (styles) =>
                <Text style={styles}>
                  Your estimated loan amount is based on
                  <Text style={[styles, GLOBAL_STYLE_DEFINITIONS.boldText]}> 30% </Text>
                  of your estimated coin value
                </Text>
              }
            />

            <Text style={LoanPreviewStyle.description}>
              Your estimated
              <Text style={[LoanPreviewStyle.description, GLOBAL_STYLE_DEFINITIONS.boldText]}> yearly interest</Text>
              :
            </Text>
            <Accordion
              renderHeader={ (styles) =>
                <Text style={styles}>
                  <Text style={[styles, { opacity: 0.5 }]}>$</Text>
                  {formatter.usd(loanRequest.interest_usd, {symbol: ''})}
                </Text>
              }
              renderContent={ (styles) =>
                <Text style={styles}>
                  Your estimated yearly interested is based on your maximum loan amount of {formatter.usd(loanRequest.amount_to_borrow_usd, {symbol: '$'})} at
                  <Text style={[styles, GLOBAL_STYLE_DEFINITIONS.boldText]}> 9% </Text>
                  interest
                </Text>
              }
            />

            {competitionRates.map(cr => (
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
            ))}


            <View style={LoanPreviewStyle.separator}/>

            <View style={LoanPreviewStyle.hippoSection}>
              <Text style={LoanPreviewStyle.sectionText}>
                The 1% are able to get loans at as little as 2% interest because they're already rich, with lots of assets and great credit.
              </Text>

              <View style={LoanPreviewStyle.hippoSectionBubble}>
                <Text style={[LoanPreviewStyle.sectionText, { color: 'white' }]}>
                  With Celsius
                  <Text style={[LoanPreviewStyle.sectionText, { color: 'white' }, GLOBAL_STYLE_DEFINITIONS.boldText]}> you would save </Text>
                  <Text style={[LoanPreviewStyle.sectionText, { color: 'white' }]}> { formatter.usd(competitionRates[0].interest_usd - loanRequest.interest_usd) } </Text>
                  over your credit card and
                  <Text style={[LoanPreviewStyle.sectionText, { color: 'white' }]}> { formatter.usd(competitionRates[1].interest_usd - loanRequest.interest_usd) } </Text>
                  over a Payday loan.
                </Text>
              </View>
              <View stye={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../../assets/images/bubble-pointer.png')} style={LoanPreviewStyle.bubblePointer}/>
              </View>

              <View style={LoanPreviewStyle.hippo}>
                <Image source={require('../../../assets/images/two-thumbs-up.png')} style={LoanPreviewStyle.hippoImage}/>

                <Text style={[LoanPreviewStyle.sectionText, { width: 150 }]}>
                  We want to provide our community with the lowest rates possible.
                </Text>
              </View>

            </View>

            <View style={LoanPreviewStyle.separator}/>

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

              <Text style={LoanPreviewStyle.sectionText}>
                Save your place in the queue to be one of the first to get a loan.
              </Text>
            </View>
            <View style={{paddingTop: 30, paddingBottom: 60}}>
              <PrimaryButton
                fill={'#fff'}
                loading={isLoading}
                disabled={isLoading}
                customStyles={{backgroundColor: STYLES.PRIMARY_BLUE}}
                customTitleStyles={{color: 'white'}}
                onPress={this.handleAcceptLoanRequest}
                title={'Verify Profile'}/>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default LoanPreviewScreen;
