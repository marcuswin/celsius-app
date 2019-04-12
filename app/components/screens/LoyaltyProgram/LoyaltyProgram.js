import React, { Component } from "react";
import { View, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import LoyaltyProgramStyle from "./LoyaltyProgram.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Card from "../../atoms/Card/Card";
import PieProgressBar from "../../graphs/PieProgressBar/PieProgressBar";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import CelInterestCard from "../../molecules/CelInterestCard/CelInterestCard";
import { heightPercentageToDP } from "../../../utils/styles-util";

@connect(
  state => ({
    loyaltyInfo: state.user.loyaltyInfo,
    appSettings: state.user.appSettings,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class LoyaltyProgram extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Loyalty Program",
    right: "profile"
  });

  componentDidMount() {
    const { actions } = this.props;
    actions.getLoyaltyInfo();
    actions.getUserAppSettings();
  }

  render() {
    const { loyaltyInfo, appSettings, actions } = this.props;
    const style = LoyaltyProgramStyle();
    let status;

    if (!loyaltyInfo || !appSettings) return <LoadingScreen/>
    const hasTier = loyaltyInfo.tier.title !== "NONE";

    if (loyaltyInfo.tier.title === "SILVER") {
      status = "GOLD"
    } else {
      status = "PLATINUM"
    }

    return (
      <RegularLayout padding={"0 0 100 0"}>
          <View>
            { hasTier && (
              <View>
                <View style={style.progressView}>
                  <View style={style.arcChart}>
                    <PieProgressBar amount={loyaltyInfo.cel_amount} max={loyaltyInfo.max_for_tier}
                                    min={loyaltyInfo.min_for_tier}
                    />
                  </View>
                  <View>
                    <CelText color={"white"} type={"H5"} weight={"300"}>
                      CEL coins
                    </CelText>
                    <CelText color={"white"} type={"H3"} weight={"700"}>
                      {`${loyaltyInfo.tier.title} (Lvl.${loyaltyInfo.tier_level})`}
                    </CelText>
                    <CelText color={"white"} type={"H5"} weight={"300"}>
                      {`${loyaltyInfo.hodl_ratio} HODL ratio`}
                    </CelText>
                  </View>
                </View>
                <View style={{backgroundColor: "rgba(65,86,166, 0.7)", height: heightPercentageToDP("6%"), justifyContent: "center"}}>
                  <CelText align={"center"} type={"H6"} weight={"300"} color={"white"}>{`You only need ${loyaltyInfo.max_for_tier - Number(loyaltyInfo.cel_amount)}  more CEL to reach ${status}`}</CelText>
                </View>
              </View>
            )}
            <View style={style.contentWrapper}>
              { hasTier && (
                <Card style={style.bonusCard}>
                  <View style={style.interestCard}>
                    <View>
                      <CelText align={"center"} type={"H4"} weight={"300"}>Bonus for earning</CelText>
                      <CelText align={"center"} type={"H4"} weight={"300"}>interest in CEL</CelText>
                      <CelText margin={"10 0 0 0"} align={"center"} type={"H2"} weight={"700"}>{`${loyaltyInfo.earn_interest_bonus}%`}</CelText>
                    </View>
                  </View>
                </Card>
              )}

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={style.circle}>
                  <Image style={style.image}
                         source={require("../../../../assets/images/loyaltyIcons/membershipx.png")}/>
                </View>
                <CelText style={style.title} type={"H3"} weight={"600"}>Celsius Membership</CelText>
                <CelText style={style.explanation} align={"center"} type={"H4"} weight={"300"}>
                  Users must have at least one CEL token in their Celsius wallet to be a member. Members can earn interest, take out loans, and use CelPay.
                </CelText>

                <View style={style.circle}>
                  <Image style={style.image}
                         source={require("../../../../assets/images/loyaltyIcons/hodl-ratiox.png")}/>
                </View>
                <CelText style={style.title} type={"H3"} weight={"600"}>HODL RATIO</CelText>
                <Image style={style.hodlImage} source={require("../../../../assets/images/HODL-loyalty3x.png")}/>
                <Card>
                  <CelText type="H4" weight="300">Interest payments on loans do not affect your HOLD ratio</CelText>
                </Card>

                <View style={style.circle}>
                  <Image style={style.image} source={require("../../../../assets/images/loyaltyIcons/level-upx.png")}/>
                </View>
                <CelText style={style.title} type={"H3"} weight={"600"}>HODL CEL to level up!</CelText>
                <CelText style={style.explanation} align={"center"} type={"H4"} weight={"300"}>
                  HODL more CEL to achieve a higher loyalty level. You only need 2,955 more CEL for the GOLD level.
                </CelText>

                <View style={style.circle}>
                  <Image style={style.image} source={require("../../../../assets/images/loyaltyIcons/withdrawx.png")}/>
                </View>
                <CelText style={style.title} type={"H3"} weight={"600"}>Withdrawing CEL</CelText>
                <CelText style={style.explanation} align={"center"} type={"H4"} weight={"300"}>
                  Withdrawal will affect your HODL ratio and loyalty level, so make sure to HODL to keep the numbers
                  going!
                </CelText>
              </View>

              <CelInterestCard
                tier={loyaltyInfo.tier.title}
                interestBonus={loyaltyInfo.earn_interest_bonus}
                interestInCel={appSettings.interest_in_cel}
                setUserAppSettings={actions.setUserAppSettings}
              />
            </View>
          </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(LoyaltyProgram);
