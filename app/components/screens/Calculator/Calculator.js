import React, {Component} from 'react';
import {Image, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Body, Button, List, ListItem, Text, View} from 'native-base';
import {bindActionCreators} from "redux";
import get from 'lodash/get';
import {Grid, Col} from "react-native-easy-grid";
import Swipeable from 'react-native-swipeable';
import isEmpty from 'lodash/isEmpty';



import CelButton from '../../atoms/CelButton/CelButton';
import API from '../../../config/constants/API';
import Icon from "../../atoms/Icon/Icon";
import {KEYBOARD_TYPE} from "../../../config/constants/common";
import SelectCoinModal from "../../organisms/SelectCoinModal/SelectCoinModal";
import * as actions from "../../../redux/actions";
import { actions as mixpanelActions } from '../../../services/mixpanel'

import CalculatorStyle from "./Calculator.styles";
import apiUtil from "../../../utils/api-util";

@connect(
  state => ({
    nav: state.nav,
    loanRequest: state.loanRequests.loanRequest,
    supportedCurrencies: state.loanRequests.supportedCurrencies,
    error: state.api.error,
    callsInProgress: state.api.callsInProgress,
    portfolio: state.portfolio.portfolio,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      selectedCoins: get(props.portfolio, 'data', []),
    };

    if (!props.supportedCurrencies) {
      props.getSupportedCurrencies()
    }
  }

  componentWillReceiveProps(newProps) {
    const {callsInProgress, navigateTo} = this.props;
    if (callsInProgress.indexOf(API.CREATE_PORTFOLIO_REQUEST) !== -1 && newProps.callsInProgress.indexOf(API.CREATE_PORTFOLIO_REQUEST) === -1 && !newProps.error) {
      navigateTo('Home');
    }
  }

  onPressSubmit = () => {
    const {selectedCoins} = this.state;

    const data = selectedCoins
      .filter(sc => sc.amount != null && sc.amount > 0)
      .map(sc => ({id: sc.currency.id, amount: Number(sc.amount)}));

    this.props.updatePortfolio(data);
  };

  onChangeText = (amount, coin) => {
    const {selectedCoins} = this.state;
    const formattedAmount = amount.replace(',', '.');

    console.log({ amount, coin, formattedAmount, number: Number(formattedAmount) });

    this.setState({
      selectedCoins: selectedCoins.map(oc => ({
        ...oc,
        amount: oc.currency.short === coin.currency.short && !isNaN(formattedAmount) ? formattedAmount : oc.amount
      })),
    });
  };

  closeModal = (data) => {
    if (data) {
      if (this.state.selectedCoins) {
        this.setState({modalVisible: false,
          selectedCoins:
          [
            ...this.state.selectedCoins,
            ...[{
              amount: '',
              currency: {
                id: data.id,
                image_url: data.image_url,
                name: data.name,
                short: data.short,
              }
            }]
          ]
        });
      }
      this.setState({modalVisible: false});
    }
    this.setState({modalVisible: false});
  };

  removeItem = item => {
    const {selectedCoins} = this.state;
    const filtered = selectedCoins.filter((el) => el.currency.short !== item.currency.short);
    this.setState({selectedCoins: filtered})
  };

  renderRemoveButton = item => [
    <View style={{marginTop: 15, height: 80, justifyContent: 'center'}}>
      <Button title='Back' transparent onPress={() => this.removeItem(item)}>
        <Icon name='TrashIcon' height='36' width='30' viewBox="0 0 36 36" fill={'#EF461A'} style={{marginLeft: 25}}/>
      </Button>
    </View>
  ];

  render() {
    const filteredSupportedCurrencies = this.props.supportedCurrencies != null
      ? this.props.supportedCurrencies.filter(sc => !this.state.selectedCoins.map(x => x.currency.id).includes(sc.id))
      : []
    const isFormDisabled = isEmpty(this.state.selectedCoins)
    const selectedAllCoins = isEmpty(filteredSupportedCurrencies);

    const isLoading = apiUtil.areCallsInProgress([API.CREATE_PORTFOLIO_REQUEST], this.props.callsInProgress);
    return (
      <View style={{flex: 1}}>
          <View style={CalculatorStyle.container}>
            <List
              dataArray={this.state.selectedCoins}
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
                              keyboardType={KEYBOARD_TYPE.NUMERIC}
                              style={[CalculatorStyle.input]}
                              onChangeText={(amount) => this.onChangeText(amount, item)}
                              maxLength={7}
                              value={`${item.amount}` || ''}
                              placeholder='0.00'
                              placeholderTextColor={'#3D4853'}
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
                this.setState({modalVisible: true})}
              }
              disabled={selectedAllCoins}
            >
              <Grid>
                <Col style={{width: '70%', justifyContent: 'center'}}>
                  <Text style={selectedAllCoins ? CalculatorStyle.disabledAddButtonText : CalculatorStyle.addButtonText}>Add another coin</Text>
                </Col>
                <Col style={{width: '30%', justifyContent: 'center'}}>
                  <Icon name='AddButtonIcon' height='36' width='36' viewBox="0 0 40 40" fill={selectedAllCoins ? 'white' : '#3D4853'}
                        style={{marginLeft: 30, opacity: 0.5}}/>
                </Col>
              </Grid>
            </TouchableOpacity>
            <SelectCoinModal visible={this.state.modalVisible} supportedCurrencies={filteredSupportedCurrencies} onClose={(data) => this.closeModal(data)}/>
            <View style={CalculatorStyle.submitButtonWrapper}>
              <CelButton
                onPress={this.onPressSubmit}
                loading={isLoading}
                disabled={isFormDisabled}
              >
                {this.props.userHasPortfolio ? "Save changes" : "Save coins"}
              </CelButton>
            </View>
          </View>
      </View>);
  }
}

export default Calculator;
