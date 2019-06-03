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
import { widthPercentageToDP } from "../../../utils/styles-util";
import CelButton from "../../atoms/CelButton/CelButton";
import STYLES from "../../../constants/STYLES";
import formatter from "../../../utils/formatter";
import Separator from "../../atoms/Separator/Separator";

@connect(
  state => ({
    currencies: state.currencies.rates,
    loyaltyInfo: state.user.loyaltyInfo,
    appSettings: state.user.appSettings,
    walletSummary: state.wallet.summary,
    email: state.user.profile.email,
    celUtilityTiers: state.generalData.celUtilityTiers
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
    const { loyaltyInfo, appSettings, actions, walletSummary, celUtilityTiers } = this.props;
    const style = LoyaltyProgramStyle();
    let color;
    // let percent;
    if (!loyaltyInfo || !appSettings) return <LoadingScreen />;
    const hasTier = loyaltyInfo.tier.title !== "NONE";
    const celAmount = walletSummary.coins.filter(coin => coin.short === "CEL")[0];
    // const celPrice = currencies.filter(c => c.short === "CEL").map(m => m.market_quotes_usd)[0];
    if (loyaltyInfo.tier_level === 1) color = STYLES.COLORS.GRAY;
    if (loyaltyInfo.tier_level === 2) color = STYLES.COLORS.ORANGE;
    if (loyaltyInfo.tier_level === 3) color = STYLES.COLORS.CELSIUS_BLUE;

    // if (loyaltyInfo.tier_level === 1) {percent = 0.05}
    // if (loyaltyInfo.tier_level === 2) {percent = 0.1}
    //
    // const celToDepositInUsd = (walletSummary.total_amount_usd - celAmount.amount_usd) * percent - celAmount.amount_usd;
    // const celToDeposit = celToDepositInUsd / celPrice.price;


    // const notDisabled = !!email.includes("@celsius.network") || !!email.includes("@mvpworkshop.co");

    // Todo(ns) make text below(and calculation) PieProgressBar visible and useful

    return (
      <RegularLayout padding={"0 0 100 0"}>

        <View>
          {hasTier && (
            <View>
              <View style={[style.progressView, { backgroundColor: color }]}>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <CelText color={"white"} type={"H4"} weight={"700"}>
                    {formatter.usd(celAmount.amount_usd)}
                  </CelText>
                  <CelText color={"white"} type={"H5"} weight={"300"}>
                    CEL coins
                  </CelText>
                </View>
                <View style={style.arcChart}>
                  <PieProgressBar color={color} level={loyaltyInfo.tier_level} tier={loyaltyInfo.tier.title} />
                </View>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <CelText color={"white"} type={"H4"} weight={"700"}>
                    {formatter.usd(walletSummary.total_amount_usd - celAmount.amount_usd, { precision: 0 })}
                  </CelText>
                  <CelText color={"white"} type={"H5"} weight={"300"}>
                    Other coins
                  </CelText>
                </View>
              </View>
              {/* <View style={{*/}
              {/* backgroundColor: color,*/}
              {/* justifyContent: "center",*/}
              {/* paddingHorizontal: 20*/}
              {/* }}>*/}
              {/* <CelText align={"center"} type={"H6"} weight={"300"} margin={"0 0 20 0"}*/}
              {/* color={"white"}>{`To achieve the next level deposit ${formatter.crypto(celToDeposit, "", {precision: 2})} CEL (${formatter.usd(celToDepositInUsd)})`}</CelText>*/}
              {/* </View>*/}
            </View>
          )}
          <View style={style.contentWrapper}>
            <View style={{ flexDirection: "row" }}>
              <CelText type={"H6"} weight={"300"} style={{ marginTop: widthPercentageToDP("23.3") / 3 }}>CEL
                balance is</CelText>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image style={{ width: widthPercentageToDP("23.3%"), height: widthPercentageToDP("23.3%") }}
                  source={require("../../../../assets/images/loyaltyIcons/star-bg3x.png")} />
                <CelText type={"H3"} weight={"700"} style={{
                  position: "absolute",
                  top: widthPercentageToDP("23.3%") / 3.5
                }}>{`${Math.round(formatter.percentage(loyaltyInfo.cel_ratio))}%`}</CelText>
              </View>
              <CelText type={"H6"} weight={"300"} style={{ marginTop: widthPercentageToDP("23.3") / 3 }}>of
                wallet balance</CelText>
            </View>
            {hasTier && (
              <Card style={style.bonusCard}>
                <View style={style.interestCard}>
                  <View>
                    <CelText margin={"0 0 10 0"} align={"center"} type={"H2"}
                      weight={"700"}>{`${loyaltyInfo.tier.loanInterestBonus * 100}%`}</CelText>
                    <CelText align={"center"} type={"H5"} weight={"300"}>Bonus for earning</CelText>
                    <CelText margin={"0 0 10 0"} align={"center"} type={"H5"} weight={"300"}>interest in CEL</CelText>
                  </View>
                  <Separator vertical />
                  <View>
                    <CelText margin={"0 0 10 0"} align={"center"} type={"H2"}
                      weight={"700"}>{`${loyaltyInfo.tier.interestBonus * 100}%`}</CelText>
                    <CelText align={"center"} type={"H5"} weight={"300"}>Discount for paying</CelText>
                    <CelText margin={"0 0 10 0"} align={"center"} type={"H5"} weight={"300"}>interest in CEL</CelText>
                  </View>
                </View>
              </Card>
            )}

            <View style={{ alignItems: "center" }}>

              <Image style={style.starIcon}
                source={require("../../../../assets/images/loyaltyIcons/star-icon3x.png")} />
              <CelText style={style.title} type={"H3"} weight={"600"}>How do we calculate loyalty level?</CelText>
              <CelText style={style.explanation} align={"center"} type={"H4"} weight={"300"}>
                Your loyalty level is determined by the ratio of CEL to other coins in your wallet. If 10% or more of
                your wallet balance is in CEL, you're a Platinum member! </CelText>

              <View style={{ flexDirection: 'column', marginTop: 10 }}>

                <View style={style.tierWrapper}>
                  <View style={style.tierSilver}>
                    <CelText type='H6' color='white' weight='600'> SILVER </CelText>
                  </View>
                  <View style={style.tierGold}>
                    <CelText type='H6' color='white' weight='600'> GOLD </CelText>
                  </View>
                  <View style={style.tierPlatinum}>
                    <CelText type='H6' color='white' weight='600'> PLATINUM </CelText>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-evenly' }}>
                  <View style={style.tierData}>
                    <CelText type='H7' weight='500' color={STYLES.COLORS.DARK_GRAY6}>{`< ${formatter.percentage(celUtilityTiers.SILVER.maximum_cel_percentage)}%`}</CelText>
                  </View>
                  <Separator vertical height={"60%"} margin='7 0 0 5' />
                  <View style={style.tierData}>
                    <CelText type='H7' weight='500' color={STYLES.COLORS.DARK_GRAY6}>{`< ${formatter.percentage(celUtilityTiers.GOLD.maximum_cel_percentage)}%`}</CelText>
                  </View>
                  <Separator vertical height={"60%"} margin='7 0 0 2' />
                  <View style={style.tierData}>
                    <CelText type='H7' weight='500' color={STYLES.COLORS.DARK_GRAY6}>{`> ${formatter.percentage(celUtilityTiers.PLATINUM.minimum_cel_percentage)}%`}</CelText>
                  </View>
                </View>

                <View style={{ alignItems: 'center', backgroundColor: STYLES.COLORS.DARK_GRAY3, paddingVertical: 5 }}>
                  <CelText type='H7' weight='500' color='white'> Bonus interest: </CelText>
                </View>

                <View style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-evenly' }}>
                  <View style={style.tierData}>
                    <CelText type='H7' weight='500' color={STYLES.COLORS.DARK_GRAY6}> {`${formatter.percentage(celUtilityTiers.SILVER.interest_bonus)}%`} </CelText>
                  </View>
                  <Separator vertical height={"60%"} margin='7 0 0 0' />
                  <View style={style.tierData}>
                    <CelText type='H7' weight='500' color={STYLES.COLORS.DARK_GRAY6}> {`${formatter.percentage(celUtilityTiers.GOLD.interest_bonus)}%`}</CelText>
                  </View>
                  <Separator vertical height={"60%"} margin='7 0 0 7' />
                  <View style={style.tierData}>
                    <CelText type='H7' weight='500' color={STYLES.COLORS.DARK_GRAY6}> {`${formatter.percentage(celUtilityTiers.PLATINUM.interest_bonus)}%`} </CelText>
                  </View>
                </View>

                <View style={{ alignItems: 'center', backgroundColor: STYLES.COLORS.DARK_GRAY3, paddingVertical: 5 }}>
                  <CelText type='H7' weight='500' color='white'> Loan interest discount: </CelText>
                </View>


                <View style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-evenly' }}>
                  <View style={style.tierData}>
                    <CelText type='H7' weight='500' color={STYLES.COLORS.DARK_GRAY6}> {`${formatter.percentage(celUtilityTiers.SILVER.loan_interest_bonus)}%`} </CelText>
                  </View>
                  <Separator vertical height={"60%"} margin='7 0 0 0' />
                  <View style={style.tierData}>
                    <CelText type='H7' weight='500' color={STYLES.COLORS.DARK_GRAY6}> {`${formatter.percentage(celUtilityTiers.GOLD.loan_interest_bonus)}%`} </CelText>
                  </View>
                  <Separator vertical height={"60%"} margin='7 0 0 7' />
                  <View style={style.tierDataLast}>
                    <CelText type='H7' weight='500' color={STYLES.COLORS.DARK_GRAY6}> {`${formatter.percentage(celUtilityTiers.PLATINUM.loan_interest_bonus)}%`} </CelText>
                  </View>
                </View>
              </View>



              <CelText align="center" type="H4" weight="300" margin={"20 0 10 0"}>
                Each loyalty level will bring you better interest rates - <CelText align="center" type="H4"
                  weight="700">so keep
                HODLing!</CelText>
              </CelText>

              <View style={style.circle}>
                <Image style={style.image} source={require("../../../../assets/images/loyaltyIcons/withdrawx.png")} />
              </View>
              <CelText style={style.title} type={"H3"} weight={"600"}>Withdrawing CEL</CelText>
              <CelText style={style.explanation} align={"center"} type={"H4"} weight={"300"}>
                Withdrawal will affect your loyalty level, so make sure to HODL to keep the numbers going!
              </CelText>

              <View style={style.circle}>
                <Image style={style.image} source={require("../../../../assets/images/loyaltyIcons/level-upx.png")} />
              </View>
              <CelText style={style.title} type={"H3"} weight={"600"}>Always Updating</CelText>
              <CelText style={style.explanation} align={"center"} type={"H4"} weight={"300"}>
                Your loyalty level is dynamic and will change with changing wallet balances. This includes new wallet
                activity as well as market fluctuations, so be sure to check your status every week!
              </CelText>
            </View>

            <CelInterestCard
              tier={loyaltyInfo.tier.title}
              interestBonus={loyaltyInfo.earn_interest_bonus}
              interestInCel={appSettings.interest_in_cel}
              setUserAppSettings={actions.setUserAppSettings}
            />

            <CelButton
              margin={"30 0 10 0"}
              onPress={() => actions.navigateTo("Deposit", { coin: "CEL" })}
            >
              Deposit CEL
            </CelButton>
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(LoyaltyProgram);
