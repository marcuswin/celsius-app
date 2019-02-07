import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import formatter from "../../../utils/formatter";
import * as appActions from "../../../redux/actions";
import CoinDetailsStyle from "./CoinDetails.styles";
import CelText from '../../atoms/CelText/CelText';
import Card from "../../atoms/Card/Card";
import CelButton from "../../atoms/CelButton/CelButton"
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';

@connect(
  state => ({
    style: CoinDetailsStyle(state.ui.theme),
    currencies: state.generalData.supportedCurrencies,
    walletSummary: state.wallet.summary,
    transactions: state.transactions,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CoinDetails extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    const { navigation } = props
    const coin = navigation.getParam("coin");

    this.state = {
      header: {
        title: `${coin.name}-${coin}`,
        left: "back",
        right: "profile"
      }
    };
  }

  componentDidMount() {
    this.props.actions.getAllTransactions({ limit: 5 })
  }

  renderCard = (coin) => {
    const { actions } = this.props;
    // TODO(nk): create molecule component

    return (
      <View key={coin.name} size="half" onPress={() => actions.navigateTo(coin)}>
        <CelText>{coin.name}</CelText>
        <CelText bold>{formatter.usd(coin.amount_usd)}</CelText>
        <CelText>{formatter.crypto(coin.amount, coin.short)}</CelText>
      </View>
    )
  }

  render() {
    const { header } = this.state
    const { walletSummary } = this.props

    return (
      <RegularLayout header={header}>
        <View >
          <Card style={{ flexDirection: 'colum' }}>
            <View style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignItems: 'flex-start'
            }}>
              {walletSummary.coins.map(this.renderCard)}
            </View>
            <View>
              <TouchableOpacity style={{ flexDirection: "row" }}>
                <CelText> Send </CelText>
              </TouchableOpacity>
              <View style={{
                borderBottomWidth: 1,
                borderLeftColor: 'gray',
                borderRadius: 10,
              }} />
              <TouchableOpacity>
                <CelText> Deposit </CelText>
              </TouchableOpacity>
            </View>
          </Card>
          <View>
            <CelButton>
              Withdraw
            </CelButton>
          </View>
        </View>
      </RegularLayout >
    );
  }
}

export default testUtil.hookComponent(CoinDetails);
