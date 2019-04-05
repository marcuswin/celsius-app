import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import LoyaltyProgramStyle from "./LoyaltyProgram.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Card from "../../atoms/Card/Card";
import Separator from "../../atoms/Separator/Separator";
import STYLES from "../../../constants/STYLES";
import PieProgressBar from "../../graphs/PieProgressBar/PieProgressBar";
import Spinner from "../../atoms/Spinner/Spinner";
import { heightPercentageToDP } from "../../../utils/styles-util";


@connect(
  state => ({
    loyaltyInfo: state.user.loyaltyInfo
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
  }

  render() {
    const { loyaltyInfo, actions } = this.props;
    const style = LoyaltyProgramStyle();

    return (
      <RegularLayout padding={"0 0 100 0"}>
        {loyaltyInfo ?
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
                  {`${loyaltyInfo.tier} (Lvl.${loyaltyInfo.tier_level})`}
                </CelText>
                <CelText color={"white"} type={"H5"} weight={"300"}>
                  {`${loyaltyInfo.hodl_ratio} HODL ratio`}
                </CelText>
              </View>
            </View>
            <View style={style.contentWrapper}>
              <Card style={style.bonusCard}>
                <View style={style.interestCard}>
                  <View>
                    <CelText align={"center"} type={"H4"} weight={"300"}>Your earn</CelText>
                    <CelText align={"center"} type={"H4"} weight={"300"}>interest bonus</CelText>
                    <CelText margin={"10 0 0 0"} align={"center"} type={"H2"} weight={"700"}>{`${loyaltyInfo.earn_interest_bonus}%`}</CelText>
                  </View>
                  <Separator vertical margin={"0 20 0 20"}/>
                  <View>
                    <CelText align={"center"} type={"H4"} weight={"300"}>Your paid</CelText>
                    <CelText align={"center"} type={"H4"} weight={"300"}>interest bonus</CelText>
                    <CelText margin={"10 0 0 0"} align={"center"} type={"H2"} weight={"700"}>0%</CelText>
                  </View>
                </View>
                <TouchableOpacity>
                  <CelText margin={"10 0 10 0"} align={"center"} weight={"300"}
                           color={STYLES.COLORS.CELSIUS_BLUE} type={"H4"}>Learn how we calculate bonuses</CelText>
                </TouchableOpacity>
              </Card>

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={style.circle}>
                  <Image style={style.image}
                         source={require("../../../../assets/images/loyaltyIcons/membershipx.png")}/>
                </View>
                <CelText style={style.title} type={"H3"} weight={"600"}>Celsius Membership</CelText>
                <CelText style={style.explanation} align={"center"} type={"H4"} weight={"300"}>
                  Only 1 CEL token gives you a privilege of being a Celsius member (earn interest, apply for a loan and
                  utilize CelPay).
                </CelText>

                <View style={style.circle}>
                  <Image style={style.image}
                         source={require("../../../../assets/images/loyaltyIcons/hodl-ratiox.png")}/>
                </View>
                <CelText style={style.title} type={"H3"} weight={"600"}>HODL RATIO</CelText>
                <Image style={style.hodlImage} source={require("../../../../assets/images/HODL-ratio.png")}/>

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

              <Card close margin={"30 0 0 0"}>
                <CelText type={"H4"} weight={"500"}>Want to earn better interest?</CelText>
                <CelText type={"H4"} weight={"300"} margin={"15 0 15 0"}>Switch to earning interest in CEL, and earn
                  X.XX%
                  better rates.</CelText>
                <TouchableOpacity>
                  <CelText onPress={() => actions.navigateTo("WalletSettings")} color={STYLES.COLORS.CELSIUS_BLUE} type={"H4"} weight={"300"}>Change settings</CelText>
                </TouchableOpacity>
              </Card>
            </View>
          </View>
          :
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: heightPercentageToDP("40%")}}>
            <Spinner />
          </View> }
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(LoyaltyProgram);
