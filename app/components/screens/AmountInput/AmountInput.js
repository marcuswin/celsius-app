import React, { Component } from "react";
import { Text, View, TouchableOpacity} from "react-native";
import {Content} from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../../redux/actions";
// import {STYLES} from "../../../config/constants/style";
import AmountInputStyle from "./AmountInput.styles";
import CelButton from "../../../components/atoms/CelButton/CelButton";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import {MainHeader} from "../../molecules/MainHeader/MainHeader";
import CelHeading from "../../atoms/CelHeading/CelHeading";
import Icon from "../../atoms/Icon/Icon";


const numPad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "\u2190"];

@connect(
  () => ({
    // map state to props
  }),
  dispatch => bindActionCreators(actions, dispatch)
)
class AmountInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
      animatedHeading: {
        text: "Withdraw ETH"
      }
    };
    // binders
  }

  // lifecycle methods
  // event hanlders
  // rendering methods

  // renderNumber(index) {
  //   return (
  //     );
  // };


  render() {

    return (
      <BasicLayout
        bottomNavigation={false}
      >
        <MainHeader backButton/>
        <CelHeading text="Withdraw ETH" />
        <Content>
        <View style={AmountInputStyle.inputWrapper}>
            <Text
              style={AmountInputStyle.fiatAmount}
            >
              $ 0.00
            </Text>
          <Text style={AmountInputStyle.cryptoAmount}>1.56997ETH</Text>
          <View style={AmountInputStyle.separator}/>
          <View style={AmountInputStyle.newBalance}>
          <Text style={AmountInputStyle.newBalanceText}> New balance:</Text>
            <Text style={AmountInputStyle.newBalanceText}> 96.5599 ETH =</Text>
            <Text style={AmountInputStyle.newBalanceText}> $ 60.829,00</Text>
          </View>
          <TouchableOpacity style={AmountInputStyle.switchIcon}>
          <Icon name='SwitchIcon'
                width='36' height='36'
                fill='rgba(61,72,83,0.3)'
                stroke='white'

          />
          </TouchableOpacity>
        </View>
        <View style={AmountInputStyle.numberContent}>

            {numPad.map((item) => (
              <TouchableOpacity>
                <View style={AmountInputStyle.button}>
                  <Text
                    key={item}
                    style={AmountInputStyle.text}
                  >
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
              )
            )}
        </View>
        <CelButton
          onPress={() => (console.log())}
          margin='10 36 45 36'
        >
          Withdraw
        </CelButton>
        </Content>
      </BasicLayout>
    );
  }
}

export default AmountInput;
