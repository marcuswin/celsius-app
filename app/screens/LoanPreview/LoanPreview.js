import React, {Component} from 'react';
import {Image, Linking, StatusBar, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Text, View} from 'native-base';
import {bindActionCreators} from "redux";
import {Col, Grid} from "react-native-easy-grid";
import formatter from '../../utils/formatter';

import * as actions from "../../redux/actions";
import {MainHeader} from '../../components/Headers/MainHeader/MainHeader';
import {AnimatedHeading} from '../../components/Headings/AnimatedHeading/AnimatedHeading';
import LoanPreviewStyle from "./styles";
import {PrimaryButton} from "../../components/Buttons/Button/Button";
import {FONT_SCALE, GLOBAL_STYLE_DEFINITIONS, STYLES} from "../../config/constants/style";
import Icon from "../../components/Icons/Icon";

@connect(
  state => ({
    nav: state.nav,
    loanRequest: state.loanRequests.loanRequest,
    competitionRates: state.loanRequests.competitionRates,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class LoanPreviewScreen extends Component {
  constructor() {
    super();

    this.state = {};

    this.handleAcceptLoanRequest = this.handleAcceptLoanRequest.bind(this);
  }


  onScroll = event => {
    this.heading.animateHeading(event);
  };

  handleAcceptLoanRequest() {
    const {navigateTo, acceptLoanRequest, loanRequest} = this.props;
    acceptLoanRequest(loanRequest.id);

    navigateTo('ThankYou', true);
  }

  render() {
    const {loanRequest, competitionRates} = this.props;
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
            <Text style={LoanPreviewStyle.description}>Your estimated max loan amount:</Text>

            <View style={LoanPreviewStyle.amountWrapper}>
              <Text style={LoanPreviewStyle.amount}>
                <Text style={LoanPreviewStyle.dollarSign}>$</Text>
                {formatter.usd(loanRequest.amount_to_borrow_usd, {symbol: ''})}
              </Text>
            </View>

            <View style={LoanPreviewStyle.amountReportWrapper}>
              <View style={LoanPreviewStyle.amountReportContent}>
                <View style={{paddingTop: 20, paddingBottom: 20, alignItems: 'center'}}>
                  <Text style={[LoanPreviewStyle.amountText]}>Estimated yearly interest in USD</Text>
                  <Text style={[LoanPreviewStyle.amountNumber, GLOBAL_STYLE_DEFINITIONS.boldText]}>
                    {formatter.usd(loanRequest.interest_usd)}
                    <Text
                      style={LoanPreviewStyle.amountTextPercent}> (9%)</Text>
                  </Text>
                </View>
                <View style={{
                  backgroundColor: '#9EA5AE',
                  opacity: 0.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 1,
                  width: '95%'
                }}>
                  <View style={{
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#9EA5AE',
                    backgroundColor: '#fff',
                    height: 26,
                    width: 26,
                    borderRadius: 13,
                    position: 'absolute'
                  }}>
                    <Text style={{color: 'black', fontSize: FONT_SCALE * 10, opacity: 1}}>OR</Text>
                  </View>
                </View>
                <View style={{paddingTop: 20, paddingBottom: 20, alignItems: 'center'}}>
                  <Text style={[LoanPreviewStyle.amountText]}>Estimated yearly interest in CEL</Text>
                  <Text style={[LoanPreviewStyle.amountNumber, GLOBAL_STYLE_DEFINITIONS.boldText]}>
                    {formatter.cel(loanRequest.interest_deg)}
                    <Text
                      style={LoanPreviewStyle.amountTextPercent}> (9%)</Text>
                  </Text>
                </View>
              </View>
            </View>

            <View style={{paddingTop: 20, paddingBottom: 20}}>
              <Grid>
                <Col style={GLOBAL_STYLE_DEFINITIONS.centeredColumn}>
                  <View style={LoanPreviewStyle.iconWrapper}>
                    <Icon name='ApplicationIcon' width='40' height='32' viewBox="0 0 38 38" fill={STYLES.PRIMARY_BLUE}/>
                  </View>
                  <Text style={LoanPreviewStyle.iconDescription}><Text
                    style={GLOBAL_STYLE_DEFINITIONS.boldText}>{'Zero'}</Text> loan{'\n'}application <Text
                    style={GLOBAL_STYLE_DEFINITIONS.boldText}>{'\nfees'}</Text></Text>
                </Col>
                <Col style={GLOBAL_STYLE_DEFINITIONS.centeredColumn}>
                  <View style={LoanPreviewStyle.iconWrapper}>
                    <Icon name='IconCalendar' width='40' height='32' viewBox="0 0 38 38" fill={STYLES.PRIMARY_BLUE}/>
                  </View>
                  <Text style={LoanPreviewStyle.iconDescription}><Text
                    style={GLOBAL_STYLE_DEFINITIONS.boldText}>{'Zero'}</Text> monthly{'\n'}service <Text
                    style={GLOBAL_STYLE_DEFINITIONS.boldText}>{'\nfees'}</Text></Text>
                </Col>
                <Col style={GLOBAL_STYLE_DEFINITIONS.centeredColumn}>
                  <View style={LoanPreviewStyle.iconWrapper}>
                    <Icon name='IconReplay' width='40' height='32' viewBox="0 0 38 38" fill={STYLES.PRIMARY_BLUE}/>
                  </View>
                  <Text style={LoanPreviewStyle.iconDescription}><Text
                    style={GLOBAL_STYLE_DEFINITIONS.boldText}>{'Zero'}</Text> early{'\n'}repayment <Text
                    style={GLOBAL_STYLE_DEFINITIONS.boldText}>{'\nfees'}</Text></Text>
                </Col>
              </Grid>
            </View>

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

              <Text style={{
                color: '#3D4853',
                fontSize: FONT_SCALE * 18,
                fontFamily: 'agile-extra-light',
                textAlign: 'center'
              }}>
                Save your place in the queue to be one of the first to get a loan.
              </Text>
            </View>
            <View style={{paddingTop: 30, paddingBottom: 60}}>
              <PrimaryButton
                fill={'#fff'}
                customStyles={{backgroundColor: STYLES.PRIMARY_BLUE}}
                customTitleStyles={{color: 'white'}}
                onPress={this.handleAcceptLoanRequest}
                title={'Sign up now'}/>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default LoanPreviewScreen;
