import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import LtvModalStyle from "./LtvModal.styles";
import CelModal from "../../atoms/CelModal/CelModal";
import { MODALS } from "../../../config/constants/common";
import { heightPercentageToDP, widthPercentageToDP, normalize } from "../../../utils/styles-util";
import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  state => ({
    openedModal: state.ui.openedModal
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)

class LtvModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };

    // binders
  }

  // lifecycle methods
  // event hanlders
  // rendering methods
  render() {
    const { actions } = this.props;

    return (
      <CelModal name={MODALS.LTV_MODAL}>
        <View>
          <Text style={[globalStyles.largeHeading, { textAlign: "left" }]}>
            What's LTV?
          </Text>
          <Text style={[globalStyles.heading, LtvModalStyle.textAlignment]}>How do
            Celsius Dollar Loans and Crypto Collateral Work?</Text>
          <Text style={[LtvModalStyle.explanation, LtvModalStyle.textAlignment]}>Bob
            needs $33,000 to get his blockchain startup off the ground, so he joins the Celsius loan program.</Text>
          <Text style={[LtvModalStyle.explanation, LtvModalStyle.textAlignment]}>
            Instead of depending on outdated credit scores, with Celsius it all comes down to the LTV (Loan-to-Value)
            Ratio. The more Bob can offer as collateral, the better the interest rate he can get. This also lowers his
            chance of a margin call (having to add additional crypto or pay off part of the loan).
          </Text>
          <Text style={[LtvModalStyle.explanation, LtvModalStyle.textAlignment]}>If Bob
            puts down three times the loan value ($100,000) in crypto, he will pay only 9% annual interest* and he’d
            only have to face a margin call if Bob’s crypto lost 20% of its value.
          </Text>
          <Text style={[globalStyles.italicText, LtvModalStyle.textAlignment, { fontSize: normalize(18) }]}>*interest
            rates are subject to change</Text>
          <Text style={[LtvModalStyle.explanation, LtvModalStyle.textAlignment]}>
            The chart below breaks down the same collateral amount of $100,000 with different loan amounts, which change
            the interest rate.
          </Text>

          <View style={{ marginTop: heightPercentageToDP("2.33%"), alignItems: 'center' }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginRight: widthPercentageToDP("3.87%") }}>
                <View style={LtvModalStyle.yellowDot} />
                <Text style={LtvModalStyle.dotText}>25k USD loan</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={LtvModalStyle.grayDot} />
                <Text style={LtvModalStyle.dotText}>100k crypto collateral</Text>
              </View>
            </View>
            <Image source={require('../../../../assets/images/7pie.png')} style={LtvModalStyle.pie} />
            <View style={{ flexDirection: "row", marginTop: heightPercentageToDP("1.27%"), alignItems: "center", }}>
              <View style={[LtvModalStyle.triangleDown, { marginRight: widthPercentageToDP("2%") }]} />
              <Text style={[{ fontSize: normalize(14), fontFamily: 'agile-extra-light' }]}>LTV: 25% (You pay $1,750 a year)</Text>
            </View>
          </View>

          <View style={{ marginTop: heightPercentageToDP("3.33%"), alignItems: 'center' }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginRight: widthPercentageToDP("3.87%") }}>
                <View style={LtvModalStyle.yellowDot} />
                <Text style={LtvModalStyle.dotText}>33k USD loan</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={LtvModalStyle.grayDot} />
                <Text style={LtvModalStyle.dotText}>100k crypto collateral</Text>
              </View>
            </View>
            <Image source={require('../../../../assets/images/9pie.png')} style={LtvModalStyle.pie} />
            <View style={{ flexDirection: "row", marginTop: heightPercentageToDP("1.27%"), alignItems: "center", }}>
              <View style={[LtvModalStyle.triangleDown, { marginRight: widthPercentageToDP("2%") }]} />
              <Text style={[{ fontSize: normalize(14), fontFamily: 'agile-extra-light' }]}>LTV: 33% (You pay $2,970 a year)</Text>
            </View>
          </View>

          <View style={{ marginTop: heightPercentageToDP("3.33%"), alignItems: 'center' }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginRight: widthPercentageToDP("3.87%") }}>
                <View style={LtvModalStyle.yellowDot} />
                <Text style={LtvModalStyle.dotText}>50k USD loan</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={LtvModalStyle.grayDot} />
                <Text style={LtvModalStyle.dotText}>100k crypto collateral</Text>
              </View>
            </View>
            <Image source={require('../../../../assets/images/12pie.png')} style={LtvModalStyle.pie} />
            <View style={{ flexDirection: "row", marginTop: heightPercentageToDP("1.27%"), alignItems: "center", }}>
              <View style={[LtvModalStyle.triangleDown, { marginRight: widthPercentageToDP("2%") }]} />
              <Text style={[{ fontSize: normalize(14), fontFamily: 'agile-extra-light' }]}>LTV: 50% (You pay $6,000 a year)</Text>
            </View>
          </View>

          <CelButton
            onPress={() => actions.closeModal()}
            margin={"30 0 0 0"}
          >
            Done
          </CelButton>
        </View>
      </CelModal>
    );
  }
}

export default LtvModal;
