import React, { Component } from "react";
import { Text, Image } from "react-native";
import { View } from "native-base";
import CodeInput from 'react-native-confirmation-code-input';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import get from 'lodash/get';

import CatImage from '../../../../assets/images/avatar-cat-2.png'
import * as actions from "../../../redux/actions";

import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import PasscodeStyle from "./Passcode.styles";
import { STYLES } from "../../../config/constants/style";

import CelButton from "../../atoms/CelButton/CelButton";


const types = {
    createPasscode: {
      title: `Create a${'\n'} passcode`,
      text: `Please create a 4-digit passcode${'\n'}to make your transactions even${'\n'} more secure.`,
      buttonText: 'Confirm',
      nextScreen: 'RepeatPasscode',
    },
    repeatPasscode: {
      title: `Repeat your${'\n'} passcode`,
      text: `Please create a 4-digit passcode${'\n'} to make your transactions even more secure.`,
      buttonText: 'Repeat passcode',
      nextScreen: 'Wallet',
    },
    enterPasscode: {
      title: `Enter your${'\n'} passcode`,
      text: `To continue with your withdrawal${'\n'} please enter your 4-digit passcode.`,
      buttonText: 'Confirm',
      nextScreen: '',
    },
};

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class Passcode extends Component {

  static propTypes = {
    type: PropTypes.oneOf(['enterPasscode', 'repeatPasscode', 'createPasscode']).isRequired,
    nextScreen: PropTypes.string,
  };

  render() {
    const pinCode = get(this.pinInput, 'state.codeArr', null)

    return <SimpleLayout bottomNavigation={false} background={STYLES.PRIMARY_BLUE}>
      <View style={PasscodeStyle.root}>
        <Text style={PasscodeStyle.title}>{types[this.props.type].title}</Text>
        <Image style={PasscodeStyle.image} source={CatImage} />
        <Text style={PasscodeStyle.text}>{types[this.props.type].text}</Text>
        <CodeInput
          ref={ref => {
            this.pinInput = ref;
          }}
          codeLength={4}
          space={19}
          size={60}
          inputPosition='center'
          onFulfill={() => {
            
          }}
          cellBorderWidth={0}
          codeInputStyle={{fontSize: 45, fontFamily: 'agile-medium', borderRadius: 10, backgroundColor: '#5C6FB1'}}
          containerStyle={{marginBottom: 30}}
        />
        <CelButton
          white
          disabled={!pinCode}
          onPress={() => {
            if (this.props.nextScreen) {
              this.props.navigateTo(this.props.nextScreen)
            } else {
              this.props.navigateTo(types[this.props.type].nextScreen)
            }
          }
        }>
          {types[this.props.type].buttonText}
        </CelButton>
      </View>
    </SimpleLayout>
  }
}

export default Passcode;