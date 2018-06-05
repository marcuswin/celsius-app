import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
// import {} from 'native-base';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
// import {STYLES} from "../../../config/constants/style";
import Icon from "../../atoms/Icon/Icon";
import AddCoinsStyle from "./AddCoins.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import {STYLES, GLOBAL_STYLE_DEFINITIONS as globalStyles} from "../../../config/constants/style";



@connect(
  state => ({
  // map state to props
    supportedCurrencies: state.generalData.supportedCurrencies,
    portfolio: state.portfolio.portfolio,
    portfolioFormData: state.ui.portfolioFormData,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class AddCoins extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
      animatedHeading: {
        text: 'Add another coin'
      },
    };

    // binders
     this.capitalize = this.capitalize.bind(this)
     this.renderCoin = this.renderCoin.bind(this)
  }

  // lifecycle methods
  // event hanlders
  // rendering methods



  onSelectCoin = (coin) => {
    const {navigateTo} = this.props;

      const coinData = [
          ...this.props.portfolioFormData,
          {
            amount: '',
            currency: {
              id: coin.id,
              image_url: coin.image_url,
              name: coin.name,
              short: coin.short,
            }
        }]
      this.props.updatePortfolioFormData(coinData)
      navigateTo('ManagePortfolio');
  }

  capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  renderCoin(coin) {
    let eligible = false;
    if(['BTC', 'ETH', "CEL"].indexOf(coin.short) !== -1) {
      eligible = true;
    }


    return (
      <View key={coin.id} style={AddCoinsStyle.coinWrapper}>
        <TouchableOpacity key={coin.id} style={AddCoinsStyle.button} onPress={() => this.onSelectCoin(coin)}>
          <Image key={coin.id} source={{ uri: coin.image_url }} style={AddCoinsStyle.coin}/>
        </TouchableOpacity>
        { eligible ? <Icon style={{position: 'absolute', top: 0, left: 55 }}
                           name={'EligibilityStar'}
                           height='22' width='22' fill={STYLES.PRIMARY_BLUE}
                           stroke={'white'}/> : null }
          <Text style={AddCoinsStyle.coinName}>{this.capitalize(coin.name)}</Text>
          <Text style={AddCoinsStyle.coinNameShort}>{coin.short}</Text>
      </View>
    )
  }

  render() {
    const {animatedHeading} = this.state;

    const filteredSupportedCurrencies = this.props.supportedCurrencies != null
     ? this.props.supportedCurrencies.filter(sc => !this.props.portfolioFormData.map(x => x.currency.id).includes(sc.id))
     : []

    return (
      <SimpleLayout
        animatedHeading={animatedHeading}
       >
        <Text style={AddCoinsStyle.text}>
          Select a coin to add to your portfolio,
          for now you can only add some of the coins listed below.
        </Text>
        <View style={AddCoinsStyle.coinContent}>
          {filteredSupportedCurrencies.map(this.renderCoin)}
        </View>
        <View style={AddCoinsStyle.explanation}>
          <Icon
            style={{ marginLeft: 13, marginTop: 13,}}
            name={'EligibilityStar'}
            height='26'
            width='26'
            fill={STYLES.PRIMARY_BLUE}
            stroke={'white'}
          />
          <Text style={AddCoinsStyle.explanationText}>Coins <Text style={[globalStyles.boldText]}>eligible </Text>for borrowing</Text>
        </View>
      </SimpleLayout>

    );
  }
}

export default AddCoins;
