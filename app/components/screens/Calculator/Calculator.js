import React, {Component} from 'react';
import {Image, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Body, Button, List, ListItem, Text, View} from 'native-base';
import {bindActionCreators} from "redux";
import {Grid, Col} from "react-native-easy-grid";
import Swipeable from 'react-native-swipeable';
import isEmpty from 'lodash/isEmpty';



import CelButton from '../../atoms/CelButton/CelButton';
import API from '../../../config/constants/API';
import Icon from "../../atoms/Icon/Icon";
import {KEYBOARD_TYPE} from "../../../config/constants/common";
import * as actions from "../../../redux/actions";
import { actions as mixpanelActions } from '../../../services/mixpanel'

import CalculatorStyle from "./Calculator.styles";
import apiUtil from "../../../utils/api-util";

@connect(
  state => ({
    nav: state.nav,
    supportedCurrencies: state.generalData.supportedCurrencies,
    error: state.api.error,
    callsInProgress: state.api.callsInProgress,
    portfolio: state.portfolio.portfolio,
    portfolioFormData: state.ui.portfolioFormData,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class Calculator extends Component {
  constructor(props) {
    super(props);

    if (!props.supportedCurrencies) {
      props.getSupportedCurrencies();
    }

    if (!props.portfolioFormData) {
      props.updatePortfolioFormData(props.portfolio);
    }

    this.state = {
      newCoinAdded: false
    }
  }

  componentWillReceiveProps(newProps) {
    const {callsInProgress, navigateTo} = this.props;
    if (callsInProgress.indexOf(API.CREATE_PORTFOLIO_REQUEST) !== -1 && newProps.callsInProgress.indexOf(API.CREATE_PORTFOLIO_REQUEST) === -1 && !newProps.error) {
      navigateTo('Portfolio');
    }

    const newPortfolioFormData = newProps.portfolioFormData;
    const lastItem = newPortfolioFormData[newPortfolioFormData.length - 1];
    if (this.props.nav.routes[this.props.nav.routes.length - 1].routeName === 'AddCoins') {
      this.setState({
        newCoinAdded: true,
      })
    }

    if (this.state.newCoinAdded) {
      this.setState({
        newCoinAdded: false
      });

      if (lastItem && this[lastItem.currency.short]) {
        this[lastItem.currency.short].focus();
      }
    }
  }


  onPressSubmit = () => {
    const data = this.props.portfolioFormData
      .filter(sc => sc.amount != null && sc.amount > 0)
      .map(sc => ({id: sc.currency.id, amount: Number(sc.amount)}));

    this.props.updatePortfolio(data);
    this.props.updatePortfolioFormData(this.props.portfolioFormData);
  };

  onChangeText = (amount, coin) => {
    const formattedAmount = amount.replace(',', '.');

    const portfolioFormData =
      this.props.portfolioFormData.map(selectedCoin => ({
        ...selectedCoin,
        amount: selectedCoin.currency.short === coin.currency.short && !isNaN(formattedAmount) ? formattedAmount : selectedCoin.amount
      }),
    );

    this.props.updatePortfolioFormData(portfolioFormData);
  };

  removeItem = item => {
    const filtered = this.props.portfolioFormData.filter((el) => el.currency.short !== item.currency.short);
    this.props.updatePortfolioFormData(filtered);
  };

  renderRemoveButton = item => [
    <View style={{marginTop: 15, height: 80, justifyContent: 'center'}}>
      <Button title='Back' transparent onPress={() => this.removeItem(item)}>
        <Icon name='TrashIcon' height='36' width='30' viewBox="0 0 36 36" fill={'#EF461A'} style={{marginLeft: 25}}/>
      </Button>
    </View>
  ]

  render() {

    const { navigateTo, portfolioFormData, supportedCurrencies } = this.props;

    const filteredSupportedCurrencies = supportedCurrencies != null
      ? supportedCurrencies.filter(sc => !portfolioFormData.map(x => x.currency.id).includes(sc.id))
      : []

    let portfolioHasZero = false;
    if (portfolioFormData) {
      portfolioFormData.forEach(coin => {
        if ((!coin.amount || !Number(coin.amount)) && !portfolioHasZero) {
          portfolioHasZero = true;
        }
      });
    }

    const isFormDisabled = isEmpty(this.props.portfolioFormData);
    const selectedAllCoins = isEmpty(filteredSupportedCurrencies);
    const isLoading = apiUtil.areCallsInProgress([API.CREATE_PORTFOLIO_REQUEST], this.props.callsInProgress);

    return (
      <View style={{flex: 1}}>

          <View style={CalculatorStyle.container}>
            <List
              dataArray={this.props.portfolioFormData}
              scrollEnabled={false}
              renderRow={(item) =>
              <Swipeable rightButtons={this.renderRemoveButton(item)}>
                  <ListItem style={CalculatorStyle.listItem}>
                    <Body>
                    <View style={CalculatorStyle.item}>
                      <Grid>
                        <Col style={{width: '70%', justifyContent: 'center'}}>
                          <View style={{marginLeft: 17}}>
                            <Text style={CalculatorStyle.itemLabel}>{item.currency.short} - {item.currency.name.toUpperCase()}</Text>
                            <TextInput
                              ref={comp => { this[item.currency.short] = comp }}
                              keyboardType={KEYBOARD_TYPE.NUMERIC}
                              style={[CalculatorStyle.input]}
                              onChangeText={(amount) => this.onChangeText(amount, item)}
                              maxLength={7}
                              value={`${item.amount}` || ''}
                              placeholder='0.00'
                              placeholderTextColor='#3D4853'
                            />
                          </View>
                        </Col>
                        <Col style={CalculatorStyle.coinImageWrapper}>
                          <Image
                            source={{uri: item.currency.image_url}}
                            style={{width: 48, height: 48}}/>
                        </Col>
                      </Grid>
                    </View>
                    </Body>
                  </ListItem>
                </Swipeable>
              }/>
            <TouchableOpacity
              style={selectedAllCoins ? CalculatorStyle.disabledAddButton : CalculatorStyle.addButton}
              onPress={() => {
                mixpanelActions.addCoinButton();
                navigateTo('AddCoins');
              }}
              disabled={selectedAllCoins}
            >
              <Grid>
                <Col style={{width: '70%', justifyContent: 'center'}}>
                  <Text style={selectedAllCoins ? CalculatorStyle.disabledAddButtonText : CalculatorStyle.addButtonText}>Add another coin</Text>
                </Col>
                <Col style={{width: '30%', justifyContent: 'center'}}>
                  <Icon name='AddButtonIcon' height='36' width='36' viewBox="0 0 40 40" fill={selectedAllCoins ? '#CED1D4' : '#3D4853'}
                        style={{marginLeft: 30, opacity: 0.5}}/>
                </Col>
              </Grid>
            </TouchableOpacity>
            {selectedAllCoins &&
              <Text style={CalculatorStyle.selectedAllCoinsMessage} >
                You have added all the coins you can track. Keep an eye on this list, since we'll expand it in the future.
              </Text>
            }
            <View style={CalculatorStyle.submitButtonWrapper}>
              <CelButton
                onPress={this.onPressSubmit}
                loading={isLoading}
                disabled={isFormDisabled || portfolioHasZero}
              >
                {this.props.userHasPortfolio ? "Save changes" : "Save coins"}
              </CelButton>
            </View>
          </View>
      </View>);
  }
}

export default Calculator;
