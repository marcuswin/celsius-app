import React, { Component } from "react";
import { View, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import testUtil from "../../../utils/test-util";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CommunityDashboard from "../../organisms/CommunityDashboard/CommunityDashboard";
import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import formatter from "../../../utils/formatter";
import Separator from "../../atoms/Separator/Separator";
import CommunityStyle from "./Community.styles";
import STYLES from "../../../constants/STYLES";


@connect(
  state => ({
    communityStats: state.community.stats
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Community extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Celsius Community",
    right: "profile"
  });

  render() {
    const { communityStats } = this.props;
    const style = CommunityStyle();

    const highestDeposit = communityStats.highest_deposit;
    const image = communityStats.interest_rates.filter(obj => obj.coin === highestDeposit.coin);

    return (
      <RegularLayout>

        <Card padding={"0 0 0 0"}>
          <View style={style.imageView}>
            <Image source={require("../../../../assets/images/community/dogIllustration.png")}
                   style={style.communityImage}/>
            <View>
              <CelText weight={"300"} align={"left"} type={"H6"}>Celsius Network counts</CelText>
              <CelText weight={"600"} align={"left"}
                       type={"H1"}>{formatter.round(communityStats.users_num, { noPrecision: true })}</CelText>
              <CelText weight={"300"} align={"left"} type={"H6"}>members</CelText>
            </View>
          </View>
        </Card>

        <CommunityDashboard name={"DEPOSITS"}>
          <View style={style.image}>
            <Image source={{ uri: image[0].currency.image_url }} style={style.coinImage}/>
          </View>
          <CelText margin={"10 0 0 0"} weight={"300"} align={"center"} type={"H6"}>Most deposited coin</CelText>
          <CelText weight={"600"} align={"center"} type={"H1"}
                   style={style.text}>{`${formatter.crypto(highestDeposit.total, "", { noPrecision: true })} ${highestDeposit.coin}`}</CelText>
          <CelText weight={"300"} align={"center"} type={"H5"}
                   style={style.secondText}>{formatter.usd(highestDeposit.total_usd)}</CelText>

          <Card margin={"20 0 0 0"}>
            <View style={style.amountsView}>
              <View>
                <CelText weight={"300"} align={"center"} type={"H6"}>Total coins deposited</CelText>
                <CelText weight={"600"} align={"center"}
                         type={"H3"}>{formatter.usd(communityStats.total_deposits_usd)}</CelText>
              </View>
              <Separator margin={"10 0 10 0"}/>
              <View>
                <CelText weight={"300"} align={"center"} type={"H6"}>Avg. deposit over time</CelText>
                <CelText weight={"600"} align={"center"}
                         type={"H3"}>{formatter.usd(communityStats.average_deposit_usd)}</CelText>
              </View>
            </View>
          </Card>

          <CelText weight={"600"} align={"center"} type={"H1"}
                   style={style.text}>{formatter.round(communityStats.total_depositors_num, { noPrecision: true })}</CelText>
          <CelText weight={"300"} align={"center"} type={"H6"} style={style.secondText}>Members are depositing</CelText>
        </CommunityDashboard>

        {/* <CommunityDashboard name={"BORROW"} info buttonTypes={["Loans", "Average", "Total"]}/>*/}

        <CommunityDashboard name={"CELPAY"} info buttonTypes={["Sent", "Transactions", "Total"]}/>

        <CommunityDashboard name={"INTEREST"} info buttonTypes={["Earned", "Average"]}/>

        {communityStats && communityStats.no_of_users_referred > 0 ?
          <CommunityDashboard name={"REFERRED"}>
            <Card padding={"0 0 0 0"}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ margin: 12 }}>
                  <CelText type={"H6"} weight={"300"}
                           align={"left"}>{`You and your ${communityStats.no_of_users_referred} referrals earned`}</CelText>
                  <CelText align={"left"} type={"H1"}
                           weight={"600"}>{`${communityStats.referrers_reward_amount_usd} CEL`}</CelText>
                </View>
                <Image style={style.bulldogImage} source={require("../../../../assets/images/community/frenchie.png")}/>
              </View>
            </Card>
          </CommunityDashboard> : null}

        {/* <CommunityDashboard name={"PRODUCT UPDATES"}/> */}

        {/* <CommunityDashboard name={"MEET US IN PERSON AT"}/> */}
        <Separator margin='20 0 20 0'/>
        <CelText align='center' type='H7' color={STYLES.COLORS.DARK_GRAY6}>
          The numbers are showing a dollar value of coins at this moment.
        </CelText>

      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(Community);
