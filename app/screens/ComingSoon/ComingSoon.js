import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Text, View} from 'native-base';
import {bindActionCreators} from "redux";
import {Col, Grid} from "react-native-easy-grid";

import {MainHeader} from '../../components/Headers/MainHeader/MainHeader';
import {AnimatedHeading} from '../../components/Headings/AnimatedHeading/AnimatedHeading';
import ComingSoonStyle from "./styles";
import * as NavigateActions from "../../redux/actions/navigate";
import Icon from "../../components/Icons/Icon";
import {GLOBAL_STYLE_DEFINITIONS} from "../../config/constants/style";

@connect(
  state => ({nav: state.nav}),
  dispatch => bindActionCreators(NavigateActions, dispatch),
)

class ComingSoonScreen extends Component {
  constructor() {
    super();

    this.state = {};
  }

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  render() {
    return (
      <Container>
        <StatusBar barStyle="dark-content"/>
        <MainHeader {...this.props} backButton customStyle={{backgroundColor: '#A866AA'}}/>
        <AnimatedHeading
          containerCustomStyles={{backgroundColor: '#A866AA'}}
          subheading={'What’s coming soon…'}
          ref={(heading) => {
            this.heading = heading;
          }}
          text={'Our roadmap'}/>
        <Content bounces={false} style={ComingSoonStyle.content} onScroll={this.onScroll}>
          <View style={ComingSoonStyle.row}>
            <Grid>
              <Col style={GLOBAL_STYLE_DEFINITIONS.centeredColumn}>
                <View style={ComingSoonStyle.item}>
                  <Icon name='IconLoanRequest' width='64' height='64' viewBox="0 0 64 64"/>
                </View>
                <Text style={[ComingSoonStyle.heading]}>Loan Requests</Text>
                <Text style={ComingSoonStyle.description}>Members will be able to join the queue for a loan</Text>
              </Col>
              <Col style={GLOBAL_STYLE_DEFINITIONS.centeredColumn}>
                <View style={ComingSoonStyle.item}>
                  <Icon name='IconDollar' width='64' height='64' viewBox="0 0 64 64"/>
                </View>
                <Text style={[ComingSoonStyle.heading]}>Dollar Loans</Text>
                <Text style={ComingSoonStyle.description}>The first $ loans against crypto will be available</Text>
              </Col>
            </Grid>
          </View>

          <View style={[ComingSoonStyle.row, {paddingBottom: 60}]}>
            <Grid>
              <Col style={GLOBAL_STYLE_DEFINITIONS.centeredColumn}>
                <View style={ComingSoonStyle.item}>
                  <Icon name='AltIcon' width='64' height='64' viewBox="0 0 64 64"/>
                </View>
                <Text style={[ComingSoonStyle.heading]}>Altcoins</Text>
                <Text style={ComingSoonStyle.description}>We plan to add more of the top 20 coins over time</Text>
              </Col>
              <Col style={GLOBAL_STYLE_DEFINITIONS.centeredColumn}>
                <View style={ComingSoonStyle.item}>
                  <Icon name='IconCelsiusApp' width='64' height='64' viewBox="0 0 64 64"/>
                </View>
                <Text style={[ComingSoonStyle.heading]}>Full release</Text>
                <Text style={ComingSoonStyle.description}>We aim to have a full release before the end of the
                  year</Text>
              </Col>
            </Grid>
          </View>
        </Content>
      </Container>
    );
  }
}

export default ComingSoonScreen;
