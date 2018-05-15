import React, {Component} from 'react';
import {Image} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Text, View} from 'native-base';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import {MainHeader} from '../../molecules/MainHeader/MainHeader';
import {AnimatedHeading} from '../../molecules/AnimatedHeading/AnimatedHeading';
import EarnInterestStyle from "./EarnInterest.styles";
import {STYLES} from "../../../config/constants/style";
import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  state => ({
    nav: state.nav,
    loanRequest: state.loanRequests.loanRequest,
    earnInterest: state.earnInterest,
    dimensions: state.ui.dimensions
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class EarnInterestScreen extends Component {
  constructor() {
    super();

    this.state = {};
  }


  onScroll = event => {
    this.heading.animateHeading(event);
  };

  handleAcceptedInterestRequest = async () => {
    const {navigateTo, acceptInterestRequest} = this.props;
    acceptInterestRequest();
    navigateTo('ThankYouLender', true);
  };

  renderCaret = (data) => {
    if (data) {
      return `${100 * (data.position - 1) / (data.total - 1)  }%`
    }

    return 0
  };


  render() {
    const interestData = this.props.earnInterest;

    return (
      <Container>
        <MainHeader {...this.props} backButton customStyle={{backgroundColor: STYLES.PRIMARY_GREEN}}/>
        <AnimatedHeading
          containerCustomStyles={{backgroundColor: STYLES.PRIMARY_GREEN}}
          subheading={'Earn interest'}
          ref={(heading) => {
            this.heading = heading;
          }}
          text={'Deposit coins'}/>


        <Content bounces={false} style={EarnInterestStyle.content} onScroll={this.onScroll}>
          <View style={EarnInterestStyle.wrapper}>
            <Text style={[EarnInterestStyle.description, {paddingTop: '15%'}]}>
              Unlike banks, we distribute most of the fees and interest from borrowers back to Celsius community.
            </Text>

            <View style={EarnInterestStyle.imageContainer}>
              <View style={EarnInterestStyle.caretWrapper}>
                <Image source={require('../../../../assets/images/caret.png')}
                       style={[EarnInterestStyle.caret, {left: this.renderCaret(interestData.interestData)}]}/>
              </View>

              <View style={[EarnInterestStyle.placeWrapper]}>
                <View style={EarnInterestStyle.hiddenElement}/>
                <Image source={require('../../../../assets/images/Your-Place.png')} style={[EarnInterestStyle.yourPlace]}/>
              </View>
            </View>

            <Text style={EarnInterestStyle.description}>
              You're <Text
              style={{fontWeight: 'bold'}}>{interestData.interestData ? interestData.interestData.position : 0}</Text> person
              in line to be eligible to lend out your coins and earn
              interest (once when your coins are lent).
            </Text>
          </View>

          <View style={EarnInterestStyle.submitButtonWrapper}>
            <CelButton
              fill={'#fff'}
              customStyles={{backgroundColor: STYLES.PRIMARY_GREEN}}
              customTitleStyles={{color: 'white'}}
              onPress={this.handleAcceptedInterestRequest}
              title={'Save my place'}/>
          </View>
        </Content>
      </Container>
    );
  }
}

export default EarnInterestScreen;
