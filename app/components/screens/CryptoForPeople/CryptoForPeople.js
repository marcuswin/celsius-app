import React, { Component } from "react";
import { Text, WebView, View, Linking } from "react-native";
import {Content} from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import { STYLES } from "../../../config/constants/style";
import CryptoForPeopleStyle from "./CryptoForPeople.styles";
import CelButton from "../../atoms/CelButton/CelButton";
import BasicLayout from "../../layouts/BasicLayout/BasicLayout";
import {MainHeader} from "../../molecules/MainHeader/MainHeader";
import CelHeading from "../../atoms/CelHeading/CelHeading";

@connect(
  () => ({
    // map state to props
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CryptoForPeople extends Component {
  // lifecycle methods
  // event hanlders
  // rendering methods
  render() {
    return (
      <BasicLayout
        bottomNavigation
      >
        <MainHeader backButton/>
        <CelHeading text="Crypto for the people" />
        <Content>
        <View style={CryptoForPeopleStyle.video}>
          <WebView
            style={CryptoForPeopleStyle.WebViewContainer}
            source={{ uri: "https://www.youtube.com/embed/PAIuNOQciI8" }}
          />
        </View>

        <Text style={CryptoForPeopleStyle.titleText}>
          For crypto to continue to spread and gain traction we’ve got <Text style={{ color: STYLES.PRIMARY_BLUE }}>to
          bring the next 100m</Text> people into the crypto community.
        </Text>

        <Text style={CryptoForPeopleStyle.explanationText}>
          In order to do that, real products built by real teams have to provide real utility to the public.
        </Text>
        <Text style={CryptoForPeopleStyle.explanationText}>
          We’re building Celsius to bring a new wave of financial products to the market designed, for the first time,
          to always do what’s in the best interest of its members instead of trying to make as much profit as possible.
        </Text>
        <Text style={CryptoForPeopleStyle.explanationText}>
          We believe this will be crypto’s first ‘killer app.’
        </Text>
        <CelButton
          onPress={() => Linking.openURL('https://celsius.network/')}
          margin='20 36 50 36'
        >
          Visit celsius.network
        </CelButton>
        </Content>
      </BasicLayout>
    );
  }
}

export default CryptoForPeople;
