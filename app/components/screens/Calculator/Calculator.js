import React, {Component} from 'react';
import {Image, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Body, Button, Container, Content, List, ListItem, Text, View} from 'native-base';
import {bindActionCreators} from "redux";
import {Grid, Col} from "react-native-easy-grid";
import Swipeable from 'react-native-swipeable';

import API from '../../../config/constants/API';
import {Message} from '../../atoms/Message/Message';
import Icon from "../../atoms/Icon/Icon";
import {KEYBOARD_TYPE} from "../../../config/constants/common";
import SelectCoinModal from "../../organisms/SelectCoinModal/SelectCoinModal";
import * as actions from "../../../redux/actions";

import CalculatorStyle from "./Calculator.styles";

@connect(
  state => ({
    nav: state.nav,
    loanRequest: state.loanRequests.loanRequest,
    supportedCurrencies: state.loanRequests.supportedCurrencies,
    error: state.api.error,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class ManagePortfolio extends Component {
  constructor(props) {
    super(props);

    const selectedCoins = props.supportedCurrencies ? [props.supportedCurrencies[0]] : [];

    this.state = {
      modalVisible: false,
      selectedCoins,
    };

    if (!props.supportedCurrencies) {
      props.getSupportedCurrencies()
    }
  }

  componentWillReceiveProps(newProps) {
    const {supportedCurrencies, callsInProgress, navigateTo} = this.props;

    if (!supportedCurrencies && newProps.supportedCurrencies) {
      // preselect ETH
      this.setState({
        selectedCoins: [newProps.supportedCurrencies[1]],
      })
    }

    if (callsInProgress.indexOf(API.CREATE_LOAN_REQUEST) !== -1 && newProps.callsInProgress.indexOf(API.CREATE_LOAN_REQUEST) === -1 && !newProps.error) {
      navigateTo('LoanPreview');
    }
  }

  onPressSubmit = () => {
    const {selectedCoins} = this.state;

    const collaterals = selectedCoins
      .filter(sc => sc.amount)
      .map(sc => ({currency: sc.short, amount: sc.amount}));

    this.props.createLoanRequest(collaterals);
  };

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  onChangeText = (amount, coin) => {
    const {selectedCoins} = this.state;
    const formattedAmount = amount.replace(',', '.');

    this.setState({
      selectedCoins: selectedCoins.map(oc => ({
        ...oc,
        amount: oc.short === coin.short ? Number(formattedAmount) : oc.amount
      })),
    });
  };

  closeModal = (data) => {
    if (data) {
      if (this.state.selectedCoins.indexOf(data) === -1) {
        this.setState({modalVisible: false, selectedCoins: [...this.state.selectedCoins, data]});
      }
      this.setState({modalVisible: false});
    }
    this.setState({modalVisible: false});
  };

  removeItem = item => {
    const {selectedCoins} = this.state;
    if (selectedCoins.length > 1) {
      const filtered = selectedCoins.filter((el) => el.short !== item.short);
      this.setState({selectedCoins: filtered})
    } else {
      this.props.showMessage('warning', 'You cannot remove last item.')
    }
  };

  renderRemoveButton = item => [
    <View style={{marginTop: 15, height: 80, justifyContent: 'center'}}>
      <Button title='Back' transparent onPress={() => this.removeItem(item)}>
        <Icon name='TrashIcon' height='36' width='30' viewBox="0 0 36 36" fill={'#EF461A'} style={{marginLeft: 25}}/>
      </Button>
    </View>
  ];

  render() {
    console.log(this.props.supportedCurrencies)
    const filteredSupportedCurrencies = this.props.supportedCurrencies != null && this.props.supportedCurrencies.filter((supportedCurrencie) => !this.state.selectedCoins.includes(supportedCurrencie));
    return (
      <Container>
        <Message/>
        <Content bounces={false} onScroll={this.onScroll}>
          <View style={CalculatorStyle.container}>
            <List bounces={false} dataArray={this.state.selectedCoins}
                  renderRow={(item) =>
                    <Swipeable rightButtons={this.renderRemoveButton(item)}>
                      <ListItem style={CalculatorStyle.listItem}>
                        <Body>
                        <View style={CalculatorStyle.item}>
                          <Grid>
                            <Col style={{width: '70%', justifyContent: 'center'}}>
                              <View style={{marginLeft: 17}}>
                                <Text style={CalculatorStyle.itemLabel}>{item.short} COLLATERAL</Text>
                                <TextInput
                                  keyboardType={KEYBOARD_TYPE.NUMERIC}
                                  style={[CalculatorStyle.input]}
                                  onChangeText={(amount) => this.onChangeText(amount, item)}
                                  maxLength={7}
                                  placeholder={'0.00'}
                                  placeholderTextColor={'#3D4853'}
                                />
                              </View>
                            </Col>
                            <Col style={{width: '30%', justifyContent: 'center'}}>
                              <Image
                                source={{uri: item.image_url}}
                                style={{marginLeft: 23, width: 48, height: 48}}/>
                            </Col>
                          </Grid>
                        </View>
                        </Body>
                      </ListItem>
                    </Swipeable>
                  }/>

            <TouchableOpacity style={CalculatorStyle.addButton} onPress={() => this.setState({modalVisible: true})}>
              <Grid>
                <Col style={{width: '70%', justifyContent: 'center'}}>
                  <Text style={CalculatorStyle.addButtonText}>Add another coin</Text>
                </Col>
                <Col style={{width: '30%', justifyContent: 'center'}}>
                  <Icon name='AddButtonIcon' height='36' width='36' viewBox="0 0 40 40" fill={'#3D4853'}
                        style={{marginLeft: 30, opacity: 0.5}}/>
                </Col>
              </Grid>
            </TouchableOpacity>

            <SelectCoinModal visible={this.state.modalVisible} supportedCurrencies={filteredSupportedCurrencies} onClose={(data) => this.closeModal(data)}/>

            <View style={CalculatorStyle.submitButtonWrapper}>
              <TouchableOpacity style={CalculatorStyle.submitButton} onPress={this.onPressSubmit}>
                <Text style={CalculatorStyle.submitButtonTitle}>Save coins</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default ManagePortfolio;
