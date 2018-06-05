import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, List, Body, ListItem, Content } from 'native-base';
import { bindActionCreators } from "redux";
import get from 'lodash/get';

import TotalCoinsHeader from '../../molecules/TotalCoinsHeader/TotalCoinsHeader';
import CoinCard from "../../molecules/CoinCard/CoinCard";
import CelButton from "../../atoms/CelButton/CelButton";
import * as actions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";


@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    portfolio: state.portfolio.portfolio, // wallet 
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class Wallet extends Component {

  render() {
    const { portfolio } = this.props;

    const animatedHeading = {
      text: 'Wallet',
      subheading: "Your deposited coins",
    };

    const mainHeader = {
      backButton: false,
    };

    const totalValue = get(portfolio, 'meta.quotes.USD.total', 0);
    const portfolioData = get(portfolio, 'data', []);

    return (
      <SimpleLayout animatedHeading={animatedHeading} mainHeader={mainHeader} contentSidePadding={0}>
        <Content bounces={false} style={{marginTop: -10}}>
          {totalValue !== 0 && 
            <TotalCoinsHeader totalValue={totalValue}>
              <CelButton type="mini" color="green">
                Add funds
              </CelButton>
            </TotalCoinsHeader>
          }
          <View style={{paddingLeft: 36, paddingRight: 36}}>
            <View>
              <List
                dataArray={portfolioData}
                bounces={false}
                renderRow={(item) =>
                  <ListItem style={{marginLeft: 0, marginRight: 0, paddingRight: 0, borderBottomWidth: 0}}>
                    <Body>
                    <CoinCard {...item} />
                    </Body>
                  </ListItem>
                }/>
            </View>
          </View>
        </Content>
      </SimpleLayout>
    );
  }
}

export default Wallet;
