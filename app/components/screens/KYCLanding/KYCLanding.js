import React, { Component } from "react";
import { Image, View, TouchableOpacity } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import KYCLandingStyle from "./KYCLanding.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import { THEMES } from "../../../constants/UI";
import Icon from "../../atoms/Icon/Icon";
import { heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";
import StaticScreen from "../StaticScreen/StaticScreen";

const progressSteps = ["Verify Identity", "Secured by PIN", "Account created"];

@connect(
  state => ({
    kycStatus: state.user.profile.kyc.status
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class KYCLanding extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "KYC Landing",
    right: "profile"
  });

  componentDidMount() {
    const { actions } = this.props;

    actions.getKYCStatus();
  }

  renderKycStatus = (kycStatus) => {
    const style = KYCLandingStyle();
    let status;

    if (kycStatus === "collecting") {
      status = {
        title: "Here you will be able to add, send and receive coins",
        explanation: "In order to do that, please verify your ID. Verification usually takes less than 24h.",
        image: require("../../../../assets/images/emptyStates/KYC-Pending.png"),
        imageState: require("../../../../assets/images/pendingStates/pendingState1.png")
      };
    }

    if (kycStatus === "pending" || kycStatus === "sending" || kycStatus === "sent") {
      status = {
        title: "Your identity verification is in progress",
        explanation: "It usually finishes within 24 hours. If it takes longer, get in touch with our support.",
        image: require("../../../../assets/images/emptyStates/KYC-Pending.png"),
        imageState: require("../../../../assets/images/pendingStates/pendingState2.png")
      };
    }

    if (kycStatus === "rejected") {
      status = {
        title: "Profile verification failed",
        explanation: "Document photo is in a low-resolution and not readable enough. Please, go through the KYC process again, or contact Celsius support.",
        image: require("../../../../assets/images/emptyStates/KYC-Failed.png"),
        imageState: require("../../../../assets/images/pendingStates/pendingState3.png")
      };
    }

    return (
      <RegularLayout theme={THEMES.LIGHT}>
        <Image source={status.image} style={style.image}/>

        <CelText margin={"0 0 20 0"} align={"center"} type={"H2"} weight={"700"}>{status.title}</CelText>

        <CelText align={"center"} type={"H4"} weight={"300"}>{status.explanation}</CelText>

        <View style={style.progressWrapper}>
          <Image style={style.progressImage}
                 source={status.imageState}/>
          <View style={style.stepsWrapper}>
            {this.renderProgressSteps(kycStatus)}
          </View>
        </View>
      </RegularLayout>
    );
  };

  renderProgressSteps = (kycStatus) => {
    const { actions } = this.props;
    const style = KYCLandingStyle();
    let color;

    if (kycStatus === "collecting") {
      color = STYLES.COLORS.CELSIUS_BLUE;
    }
    if (kycStatus === "pending" || kycStatus === "sending" || kycStatus === "sent") {
      color = STYLES.COLORS.ORANGE;
    }
    if (kycStatus === "rejected") {
      color = STYLES.COLORS.RED;
    }

    return (
      progressSteps.map(step =>
        <TouchableOpacity key={step} onPress={() => actions.navigateTo("KYCProfileDetails")}
                          disabled={!(step === "Verify Identity" && kycStatus === "collecting")}
                          style={{ flexDirection: step === "Verify Identity" ? "row" : "column" }}>
          <CelText weigtht={"500"} type={"H4"}
                   color={step === "Verify Identity" ? color : STYLES.COLORS.MEDIUM_GRAY}>{step}</CelText>
          {(step === "Verify Identity" && kycStatus === "collecting") &&
          <View style={style.icon}>
            <Icon
              name={"IconChevronRight"}
              height={heightPercentageToDP("1.7%")}
              width={widthPercentageToDP("1.7%")}
              fill={STYLES.COLORS.CELSIUS_BLUE}
            />
          </View>
          }
        </TouchableOpacity>
      )
    );
  };

  render() {
    const { kycStatus, actions } = this.props;

    if (kycStatus === "passed") {
        return (
          <StaticScreen
            emptyState={{
              heading: 'KYC Landing screen coming soon',
              button: 'Add profile details',
              onPress: () => actions.navigateTo('KYCProfileDetails'),
            }}
          />
        )
    }

    return this.renderKycStatus(kycStatus);
  }
}

export default testUtil.hookComponent(KYCLanding);
