import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, List, Body, ListItem, Content} from 'native-base';
import {bindActionCreators} from "redux";

import CoinCard from "../../molecules/CoinCard/CoinCard";
import CelButton from "../../atoms/CelButton/CelButton";
import * as actions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    portfolio: state.portfolio.portfolio,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class PortfolioScreen extends Component {

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  render() {
    const {navigateTo, portfolio} = this.props;
    const animatedHeading = {
          text: 'Portfolio',
          subheading:"Track your coins",
      }

    const mainHeader = {
      backButton: false,
      text: 'Portfolio',
      subheading:"Track your coins",
    }

    return (
      <SimpleLayout animatedHeading={animatedHeading} mainHeader={mainHeader}>
        <Content bounces={false} onScroll={this.onScroll}>
        <View style={{paddingTop: 10}}>
          <List
            dataArray={portfolio}
            bounces={false}
            renderRow={(item) =>
                <ListItem style={{marginLeft: 0, marginRight: 0, paddingRight: 0, borderBottomWidth: 0}}>
                  <Body>
                    <CoinCard {...item} />
                  </Body>
                </ListItem>
            }/>
          </View>
          <View style={{marginTop: 30, marginBottom: 130}}>
            <CelButton
              onPress={() => navigateTo('ManagePortfolio')}
            >
              Manage your coins
            </CelButton>
            </View>
        </Content>
      </SimpleLayout>
    );
  }
}

export default PortfolioScreen;
