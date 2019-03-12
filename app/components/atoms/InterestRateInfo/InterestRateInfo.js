import React, { Component } from "react";
import { View, Image, Linking } from "react-native";
import { connect } from "react-redux";

import InterestRateInfoStyle from "./InterestRateInfo.styles";
import CelText from "../CelText/CelText";
// import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";

@connect(
  state => ({
    walletCurrencies: state.interest.ratesInfo
  })
)
class InterestRateInfo extends Component {
  capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  render() {
    const { currency, rate, walletCurrencies, compact } = this.props;

    if (!currency || !walletCurrencies) {
      return null;
    }

    const styles = InterestRateInfoStyle();

    const additionalWrapperStyle = compact ? styles.mainWrapperCompact : {};

    const currencyInfo = walletCurrencies[currency.toUpperCase()];

    const currencyName = currencyInfo.name;

    return (
      <View style={[styles.mainWrapper, additionalWrapperStyle]}>
        <View style={styles.mainInfoWrapper}>
          <View style={styles.imageInfoWrapper}>
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: currencyInfo.image_url }}
                style={styles.currencyImage}
              />
            </View>
            <View style={styles.infoWrapper}>
              <CelText weight={"500"} type={"H5"} style={styles.currencyName}>{this.capitalize(currencyName)}</CelText>
              <CelText weight={"500"} type={"H4"} style={styles.currencyShort}>{currencyInfo.short}</CelText>
            </View>
          </View>
          <View style={{ justifyContent: "space-around" }}>
            <View style={styles.regularRateWrapper}>
              <CelText type={"H7"} style={styles.regularRateText}>Regular Rate</CelText>
              <CelText type={"H5"} style={styles.regRateText}>{rate}</CelText>
            </View>
            <View style={styles.celRateWrapper}>
              <CelText type={"H7"} style={styles.celsiusRateText}>CEL Rate</CelText>
              <CelText type={"H5"} style={styles.celRateText}>{rate}</CelText>
            </View>
          </View>
        </View>
        {currencyInfo.short.toUpperCase() === "USD" && <View style={styles.usdInfoWrapper}>
          <CelText>
            Start earning interest for dollars by <CelText onPress={() => {
            Linking.openURL("mailto:sales@celsius.network");
          }}>getting in touch</CelText> with
            our team.
          </CelText>
        </View>}
      </View>
    );
  }
}

export default InterestRateInfo;
