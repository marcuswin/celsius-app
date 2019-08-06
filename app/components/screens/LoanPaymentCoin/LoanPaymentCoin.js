import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
import LoanPaymentCoinStyle from "./LoanPaymentCoin.styles";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import PaymentCard from "../../molecules/PaymentCard/PaymentCard";
import Icon from "../../atoms/Icon/Icon";
import Card from "../../atoms/Card/Card";

@connect(
  state => ({
    currenciesRates: state.currencies.rates,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class LoanPaymentCoin extends Component {
  static propTypes = {};
  static defaultProps = {}

  static navigationOptions = () => ({
    title: "Pay with Crypto",
    right: "profile"
  });

  render() {
    const {currenciesRates, actions} = this.props;
    const style = LoanPaymentCoinStyle();

    return (
      <RegularLayout>
        <CelText margin={"0 0 10 0"} align={"center"} weight={"300"}>Choose a coin from your wallet to complete your loan interest payment</CelText>
        { currenciesRates.map(c => (
            <PaymentCard key={c.short} name={c.name} coinShort={c.short} image={c.image_url}/>
          ))}

        <TouchableOpacity
          style={style.addMoreCoinsList}
          onPress={() => actions.navigateTo('Deposit')}
        >
          <Icon fill={'gray'} width='17' height='17' name='CirclePlus' />
          <CelText type='H5' margin={"0 0 0 5"}>
            Deposit coins
          </CelText>
        </TouchableOpacity>

        <Card close>
          <CelText weight={"500"} type={"H5"}>Make sure you have enough coins</CelText>
          <CelText margin={"10 0 5 0"} weight={"300"} type={"H5"}>Add more coins to make sure you have enough in your wallet for your monthly interest payment.</CelText>
        </Card>
      </RegularLayout>
    );
  }
}

export default LoanPaymentCoin
