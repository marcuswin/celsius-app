import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Image } from "react-native";
import * as appActions from "../../../redux/actions";
import { KYC_STATUSES } from "../../../constants/DATA";
import Loader from "../../atoms/Loader/Loader";
import { heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";
import CelText from "../../atoms/CelText/CelText";

const apiCalls = [];
const randomMessages = ["Simply go to your settings and change the way you receive interest"];

@connect(
  state => ({
    appInitialized: state.app.appInitialized,
    user: state.user.profile,
    callsInProgress: state.api.callsInProgress
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Home extends Component {

  static getDerivedStateFromProps(nextProps, prevState) {
    const { callsInProgress } = nextProps;

    if (callsInProgress[0] && apiCalls.indexOf(callsInProgress[0]) === -1) {
      apiCalls.push(callsInProgress[0]);
      return { progress: prevState.progress + (1 / 6) };
      // six is current number of calls being called while loading app
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      progress: 0
    };
  }

  async componentDidMount() {
    const { actions, appInitialized } = this.props;
    if (!appInitialized) await actions.initCelsiusApp();
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (prevProps.appInitialized === false && this.props.appInitialized === true) {
      if (user.id) {
        if (user.kyc && user.kyc.status === KYC_STATUSES.passed) {
          return prevProps.actions.navigateTo("WalletFab");
        }
        if (!user.has_pin) {
          return prevProps.actions.navigateTo("RegisterSetPin");
        }
        return prevProps.actions.navigateTo("KYC");
      }
      return prevProps.actions.navigateTo("WelcomeScreen");
    }
  }

  render() {
    const randomMsg = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    return (
      <View
        style={{ justifyContent: "center", alignItems: "center", padding: 40, marginTop: heightPercentageToDP("25%") }}>
        <Image source={require("../../../../assets/images/splashScreen-celsius.png")}
               style={{
                 resizeMode: "contain",
                 width: widthPercentageToDP("33%"),
                 height: widthPercentageToDP("33%")
               }}/>
        <CelText align={"center"} margin={"20 0 20 0"} weight={"600"} type={"H2"}>Earn interest in CEL!</CelText>
        <CelText align={"center"} margin={"0 0 20 0"} type={"H4"} weight={"300"}>{randomMsg}</CelText>
        <Loader progress={this.state.progress}/>
      </View>
    );
  }
}

export default Home;
