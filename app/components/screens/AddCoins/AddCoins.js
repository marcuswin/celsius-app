import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import Icon from "../../atoms/Icon/Icon";
import AddCoinsStyle from "./AddCoins.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import {STYLES} from "../../../config/constants/style";
import {ELIGIBLE_COINS} from "../../../config/constants/common";
import { mixpanelEvents } from "../../../services/mixpanel";

@connect(
  state => ({
  // map state to props
    supportedCurrencies: state.generalData.supportedCurrencies,
    portfolio: state.portfolio.portfolio,
    portfolioFormData: state.ui.portfolioFormData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
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

  }

  // lifecycle methods
  // event hanlders
  onSelectCoin = (coin) => {
    const {portfolioFormData, actions} = this.props;

    const coinData = [
      ...portfolioFormData,
      {
        amount: '',
        currency: {
          id: coin.id,
          image_url: coin.image_url,
          name: coin.name,
          short: coin.short,
        },
      }
    ];
    mixpanelEvents.addCoinToTracker(coin.short);
    actions.updatePortfolioFormData(coinData);
    actions.navigateTo('ManagePortfolio');
  }

  capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // rendering methods
  renderCoin = (coin) => {
    let eligible = false;
    if(ELIGIBLE_COINS.indexOf(coin.short) !== -1) {
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
    const {portfolioFormData, supportedCurrencies} = this.props;

    const filteredSupportedCurrencies = supportedCurrencies != null
     ? supportedCurrencies.filter(sc => !portfolioFormData.map(x => x.currency.id).includes(sc.id))
     : [];

    if ( Object.keys(portfolioFormData).length === 0 ) {
      animatedHeading.text = 'Add your first coin'
    }

    return (
      <SimpleLayout
        animatedHeading={animatedHeading}
       >
        <Text style={AddCoinsStyle.text}>
          Select a coin to add to your portfolio.
        </Text>
        <View style={AddCoinsStyle.explanation}>
          <Icon
            name={'EligibilityStar'}
            height='26'
            width='26'
            fill={STYLES.PRIMARY_BLUE}
            stroke={'white'}
          />
          <Text style={AddCoinsStyle.explanationText}>Coins <Text style={{fontFamily: 'agile-bold',}}>eligible </Text>to earn up to 5% interest later this year.</Text>
        </View>
        <View style={AddCoinsStyle.coinContent}>
          {filteredSupportedCurrencies.map(this.renderCoin)}
        </View>
      </SimpleLayout>

    );
  }
}

export default AddCoins;
