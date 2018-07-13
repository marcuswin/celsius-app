import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import Icon from "../../atoms/Icon/Icon";
import CelButton from "../../atoms/CelButton/CelButton";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import {STYLES} from "../../../config/constants/style";
import SecureTransactionsStyle from "./SecureTransactions.styles";

@connect(
  state => ({
  // map state to props
    nav: state.nav
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class SecureTransactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
    // binders
  }

  // lifecycle methods
  // event hanlders
  // rendering methods
  render() {
    const {navigateTo} = this.props;

    return (

      <SimpleLayout
        background={STYLES.PRIMARY_BLUE}
        bottomNavigation={false}
      >
        <View style={SecureTransactionsStyle.content}>
        <Icon  name={ 'Shield' }
               width='65'
                 height='65'
               fill={ 'white'}
               stroke={'white'}
               style={{
                 marginBottom: 15,
                 opacity: 0.5,
               }}
        />
        <Text style={SecureTransactionsStyle.title}>Secure transactions</Text>
        <Text style={SecureTransactionsStyle.explanation}>Please keep in mind that you’ll only be able to withdraw ETH to the original wallet you sent us ETH from, but anyone can send ETH to the address you initially set.</Text>
        <View style={SecureTransactionsStyle.suggestionWrapper}>
          <Text style={SecureTransactionsStyle.suggestion}>For your security, if you would like to withdraw more than <Text style={{fontFamily: 'agile-bold'}}>$20.000</Text> worth of ETH you will be required to contact us at <Text style={{fontFamily: 'agile-bold'}}>app@celsius.network</Text> so that we can verify your identity prior to transferring your funds.</Text>
        </View>
          <CelButton
            onPress={() => navigateTo('AddFunds')}
            white
          >
            Add Funds
          </CelButton>

        </View>
      </SimpleLayout>

    );
  }
}

export default SecureTransactions;
