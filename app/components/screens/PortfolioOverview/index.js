import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {View, List, Body, ListItem, Content, Text} from 'native-base';
import {bindActionCreators} from "redux";
import {Grid, Row, Col} from "react-native-easy-grid";
import get from 'lodash/get';

import formatter from "../../../utils/formatter";
import PricingChangeIndicator from "../../molecules/PricingChangeIndicator/PricingChangeIndicator";
import {STYLES, FONT_SCALE} from "../../../config/constants/style";
import CoinCard from "../../molecules/CoinCard/CoinCard";
import CelButton from "../../atoms/CelButton/CelButton";
import * as actions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";


const styles = StyleSheet.create({
  totalValueContainer: {
    backgroundColor: 'white',
    display: 'flex',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    justifyContent: 'center',
    paddingLeft: 36,
    paddingRight: 20,
    paddingTop: 14,
    paddingBottom: 14,
    marginBottom: 16,
    width: '100%',
  },
  totalValueLabel: {
    fontSize: FONT_SCALE * 11,
    color: STYLES.GRAY_2,
    fontFamily: 'agile-book',
  },
  totalValue: {
    fontSize: FONT_SCALE * 36,
    fontFamily: 'agile-medium',
    color: STYLES.GRAY_2,
  }
});

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    portfolio: state.portfolio.portfolio,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class PortfolioScreen extends Component {


  render() {
    const {navigateTo, portfolio} = this.props;
    const animatedHeading = {
      text: 'Portfolio',
      subheading: "Track your coins",
    };

    const mainHeader = {
      backButton: false,
    };

    const totalValue = get(portfolio, 'meta.quotes.USD.total', 0);
    const percentChange24h = get(portfolio, 'meta.quotes.USD.percent_change_24h', 0);
    const isPercentChangeNegative = percentChange24h < 0;
    const portfolioData = get(portfolio, 'data', []);

    let letterSize;

    if(totalValue.toString().length >= 10) {
      letterSize = FONT_SCALE * 30
    } else {
      letterSize = FONT_SCALE * 36
    };

    return (
      <SimpleLayout animatedHeading={animatedHeading} mainHeader={mainHeader} contentSidePadding={0}>
        <Content bounces={false} style={{marginTop: -10}}>
          {totalValue !== 0 && <Grid>
            <Row>
              <Row style={styles.totalValueContainer}>
                <Col style={{width: '70%'}}>
                  <Text style={styles.totalValueLabel}>TOTAL VALUE</Text>
                  <Text style={[styles.totalValue, {fontSize: letterSize}]}>{formatter.usd(totalValue)}</Text>
                </Col>
                <Col style={{width: '30%', alignSelf: 'flex-end'}}>
                  <PricingChangeIndicator
                    isPercentChangeNegative={isPercentChangeNegative}
                    percentChange24h={percentChange24h}
                  />
                </Col>
              </Row>
            </Row>
          </Grid>}
          <View style={{paddingLeft: 36, paddingRight: 36}}>
            <View>
              <List
                dataArray={portfolioData}
                scrollEnabled={false}
                renderRow={(item) =>
                  <ListItem style={{marginLeft: 0, marginRight: 0, paddingRight: 0, borderBottomWidth: 0}}>
                    <Body>
                    <CoinCard {...item} />
                    </Body>
                  </ListItem>
                }/>
            </View>
            <View style={{marginTop: 30, marginBottom: 40}}>
              <CelButton
                onPress={() => navigateTo('ManagePortfolio')}
              >
                Manage your coins
              </CelButton>
            </View>
          </View>
        </Content>
      </SimpleLayout>
    );
  }
}

export default PortfolioScreen;
