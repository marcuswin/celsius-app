import React, { Component } from 'react';
import { Text, TouchableOpacity } from "react-native";

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";
// import {STYLES} from "../../../config/constants/style";
// import SettingsStyle from "./Settings.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import { FONT_SCALE, STYLES, GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import Separator from "../../atoms/Separator/Separator";
import CelCustomButton from "../../atoms/CelCustomButton/CelCustomButton";
import { View } from 'native-base';
import CelButton from '../../atoms/CelButton/CelButton';


@connect(
  state => ({
    user: state.users.user,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class ApiAuthorization extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
  }

  render() {
    const { actions, user } = this.props;

    const logoutButton = () => (

      <TouchableOpacity onPress={actions.logoutUser}>
        <Text style={[{
          color: 'white',
          paddingLeft: 5,
          textAlign: 'right',
          opacity: 0.8,
          marginTop: 2,
          fontSize: FONT_SCALE * 18,
          fontFamily: 'agile-medium',
        }]}>Log out</Text>
      </TouchableOpacity>
    )

    return (
      <SimpleLayout
        mainHeader={{ backButton: true, right: logoutButton() }}
        animatedHeading={{ text: 'Api Auth' }}
        background={STYLES.GRAY_1}
        bottomNavigation
      >
        <Text style={[globalStyles.normalText, { marginTop: 30 }]}>
          Generate a secure API key that enables external services to read some of the Celsius data.
        </Text>
        <View style={{ marginTop: 30 }}>
          <CelButton
            onPress={() => actions.navigateTo('ApiKeyGenerate')}
            color="blue"
          >Generate API key</CelButton>
        </View>
      </SimpleLayout >
    );
  }
}

export default ApiAuthorization;
