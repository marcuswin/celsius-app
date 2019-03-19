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

const progressSteps = ["Verify Identity", "Secured by PIN", "Account created"];

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class KYCLanding extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "KYC Landing",
    right: "profile"
  });

  renderProgressSteps = () => {
    const { actions } = this.props;
    const style = KYCLandingStyle();
    return (
      progressSteps.map(step =>
        <TouchableOpacity key={step} onPress={() => actions.navigateTo("KYCProfileDetails")} disabled={step !== "Verify Identity"}
                          style={{ flexDirection: step === "Verify Identity" ? "row" : "column" }}>
          <CelText weigtht={"500"} type={"H4"}
                   color={step === "Verify Identity" ? STYLES.COLORS.CELSIUS_BLUE : STYLES.COLORS.MEDIUM_GRAY}>{step}</CelText>
          {step === "Verify Identity" &&
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
    const style = KYCLandingStyle();

    return (
      <RegularLayout theme={THEMES.LIGHT}>
        <Image source={require("../../../../assets/images/emptyStates/KYC-Pending.png")} style={style.image}/>

        <CelText margin={"0 0 20 0"} align={"center"} type={"H2"} weight={"700"}>Here you will be able to
          add, send and receive coins</CelText>

        <CelText align={"center"} type={"H4"} weight={"300"}>In order to do that, please verify your ID. Verification
          usually takes less than 24h.</CelText>

        <View style={style.progressWrapper}>
          <Image style={style.progressImage}
                 source={require("../../../../assets/images/pendingStates/pendingState1.png")}/>
          <View style={style.stepsWrapper}>
            {this.renderProgressSteps()}
          </View>
        </View>

      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(KYCLanding);
