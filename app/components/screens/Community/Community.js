import React, { Component } from "react";
import { View, Image } from "react-native";

import testUtil from "../../../utils/test-util";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CommunityDashboard from "../../organisms/CommunityDashboard/CommunityDashboard";
import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import { heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";
import formatter from "../../../utils/formatter";
import Separator from "../../atoms/Separator/Separator";
import Icon from "../../atoms/Icon/Icon";


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
    return (
      <RegularLayout>

        <Card>
          <View style={{flexDirection: "row", justifyContent: "space-around"}}>
            <Image style={{ resizeMode: "cover", height: widthPercentageToDP("30%"),
              width: widthPercentageToDP("30%"), overflow: "visible" }}
                   source={require("../../../../assets/images/diane-sad.png")}/>
            <View>
              <CelText weight={"300"} align={"left"} type={"H6"}>Celsius Network counts</CelText>
              <CelText weight={"600"} align={"left"} type={"H1"}>4.564</CelText>
              <CelText weight={"300"} align={"left"} type={"H6"}>members</CelText>
            </View>
          </View>
        </Card>

        <CommunityDashboard name={"DEPOSITS"}>
          <Icon
            width={44}
            height={44}
            name={"IconETH"}
          />
          <CelText margin={"10 0 0 0"} weight={"300"} align={"center"} type={"H6"}>Most deposited coin</CelText>
          <CelText weight={"600"} align={"center"} type={"H1"}
                   style={{marginTop: heightPercentageToDP("1.25%")}}>TRT</CelText>
          <CelText weight={"300"} align={"center"} type={"H5"} style={{marginTop: heightPercentageToDP("0.5%")}}>HALO</CelText>

          <Card style={{marginTop: heightPercentageToDP("0.8%")}}>
            <View style={{flexDirection: "row", justifyContent: "space-around"}}>
              <View style={{flexDirection: "column"}}>
                <CelText weight={"300"} align={"center"} type={"H6"}>Total coins deposited</CelText>
                <CelText weight={"600"} align={"center"} type={"H3"}>{formatter.usd(3000000)}</CelText>
              </View>
              <Separator vertical/>
              <View style={{flexDirection: "column"}}>
                <CelText weight={"300"} align={"center"} type={"H6"}>Avg. deposit over time</CelText>
                <CelText weight={"600"} align={"center"} type={"H3"}>{formatter.usd(20000)}</CelText>
              </View>
            </View>
          </Card>

          <CelText weight={"600"} align={"center"} type={"H1"}
                   style={{marginTop: heightPercentageToDP("1.25%")}}>PRP</CelText>
          <CelText weight={"300"} align={"center"} type={"H6"} style={{marginTop: heightPercentageToDP("0.5%")}}>HOLA</CelText>
        </CommunityDashboard>

        <CommunityDashboard name={"BORROW"} info buttonTypes={["loans", "average", "total"]}/>

        <CommunityDashboard name={"CELPAY"} info buttonTypes={["sent", "transactions", "total"]}/>

        <CommunityDashboard name={"INTEREST"} info buttonTypes={["earned", "average", "rates"]}/>

        <CommunityDashboard name={"REFERRED"}>
          <Card>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <View>
                <CelText type={"H6"} weight={"300"} align={"left"}>You and your 23 refferals earned</CelText>
                <CelText align={"left"} type={"H1"} weight={"600"}>1,345 CEL</CelText>
              </View>
              <Image style={{ resizeMode: "cover", width: widthPercentageToDP("20%"),
                height: widthPercentageToDP("20%"), overflow: "visible" }}
                     source={require("../../../../assets/images/diane-sad.png")}/>
            </View>
          </Card>
        </CommunityDashboard>

        <CommunityDashboard name={"PRODUCT UPDATES"}/>

        <CommunityDashboard name={"MEET US IN PERSON AT"}/>

      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(Community);
