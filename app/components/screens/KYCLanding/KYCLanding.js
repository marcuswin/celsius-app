import React, { Component } from "react";
import { Image, View } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import KYCLandingStyle from "./KYCLanding.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import { THEMES, MODALS } from "../../../constants/UI";
import STYLES from "../../../constants/STYLES";
import { KYC_STATUSES } from "../../../constants/DATA";
import Card from "../../atoms/Card/Card";
import CelButton from "../../atoms/CelButton/CelButton";
import InfoModal from "../../molecules/InfoModal/InfoModal";

const progressSteps = ["Verify Identity"];

@connect(
  state => ({
    profile: state.user.profile,
    kycReasons: state.user.profile.kyc.rejectionReasons,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
    kycErrors:
      state.user.profile && state.user.profile.kyc
        ? state.user.profile.kyc.errors
        : [],
    transactions: state.transactions.transactionList
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class KYCLanding extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    headerSameColor: true
  });

  componentDidMount() {
    const { actions, profile, navigation } = this.props;

    navigation.setParams({
      title: profile.first_name
    });

    actions.getKYCStatus();
    actions.getAllTransactions({ type: "celpay" });
    actions.getWalletSummary();
  }

  renderErrors = () =>
    this.props.kycReasons.map((reason, e) => (
      <CelText key={e} margin={"0 0 0 0"}>
        {reason}
      </CelText>
    ));

  // rendering methods
  renderCard = () => {
    const { transactions, actions } = this.props;

    if (transactions && Object.keys(transactions).length > 1) {
      return (
        <Card margin="0 0 20 0">
          <CelText>
            You have several transactions on-hold.
            <CelText
              onPress={() => actions.navigateTo("TransactionsOnHold")}
              style={[{ textDecorationLine: "underline" }]}
            >
              See all transactions
            </CelText>
          </CelText>
        </Card>
      );
    }

    if (transactions && Object.keys(transactions).length) {
      return (
        <Card margin="0 0 20 0">
          <CelText align="center">
            Verify your profile now to get your crypto.
          </CelText>
        </Card>
      );
    }
  };

  renderKycStatus = kycStatus => {
    const { kycErrors } = this.props;
    const style = KYCLandingStyle();
    let status;

    if (kycStatus === "collecting") {
      status = {
        title: "Add, Send, Receive Coins",
        explanation:
          "Please verify your identity to add to your wallet balance.",
        image: require("../../../../assets/images/illustrations-v3/Dog/profile-dog.png")
      };
    }

    if (
      kycStatus === "pending" ||
      kycStatus === "sending" ||
      kycStatus === "sent"
    ) {
      status = {
        text: "In progress",
        title: "Your identity verification is in progress",
        explanation:
          "It typically takes just a few minutes to verify your identity. Please contact support if you do not receive verification within the next 24 hours.",
        image: require("../../../../assets/images/emptyStates/KYC-Pending.png")
      };
    }

    if (kycStatus === "rejected") {
      status = {
        explanation:
          "Please go through the verification process again or contact our support for help.",
        image: require("../../../../assets/images/emptyStates/KYC-Failed.png")
      };
    }

    return (
      <View>
        <Image source={status.image} style={style.image} />

        <View
          style={{
            flex: 1,
            alignContent: "center",
            justifyContet: "center",
            marginBottom: 10
          }}
        >
          {this.renderStatus()}
        </View>
        <CelText
          margin={"0 0 10 0"}
          align={"center"}
          type={"H2"}
          weight={"700"}
        >
          {status.title}
        </CelText>

        <CelText align={"center"} type={"H4"} weight={"300"}>
          {status.explanation}
        </CelText>

        <View style={style.progressWrapper}>
          <Image style={style.progressImage} source={status.imageState} />
          <View style={style.stepsWrapper}>
            {kycErrors &&
              kycErrors.map(e => (
                <CelText align={"center"} type={"H4"} weight={"300"} key={e}>
                  {e}
                </CelText>
              ))}
            <View style={{ marginLeft: "23%", justifyContet:'center' }}>
              {this.renderProgressSteps(kycStatus)}
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderStatus = () => {
    const { kycStatus, actions } = this.props;
    let kycColor = STYLES.COLORS.CELSIUS_BLUE;
    let kyc = "";

    if (kycStatus === "rejected" || kycStatus === "rejeceted") {
      kyc = "Identity verification failed    ";
      kycColor = STYLES.COLORS.RED;
    }
    if (
      kycStatus === "pending" ||
      kycStatus === "sending" ||
      kycStatus === "sent"
    ) {
      kyc = "In progress";
      kycColor = STYLES.COLORS.ORANGE;
    }

    return kycStatus === "rejected" || kycStatus === "rejeceted" ? (
      <CelButton
        onPress={() => actions.openModal(MODALS.KYC_REJECTED_MODAL)}
        basic
        textColor={STYLES.COLORS.RED}
        iconRight={"IconChevronRight"}
        iconRightHeight={"12"}
        iconRightWidth={"12"}
        iconRightColor={STYLES.COLORS.RED}
      >
        {kyc || ""}
      </CelButton>
    ) : (
      <CelText
        margin="0 0 2 0"
        align="center"
        type="H3"
        weight={"500"}
        color={kycColor}
        bold
      >
        {kyc || ""}
      </CelText>
    );
  };

  renderProgressSteps = kycStatus => {
    const { actions } = this.props;

    return progressSteps.map(step => (
      <CelButton
        style={{ alignSelf: "center" }}
        key={step}
        onPress={() => actions.navigateTo("KYCProfileDetails")}
        disabled={
          !(
            (step === "Verify Identity" && kycStatus === "collecting") ||
            kycStatus === "rejected"
          )
        }
        weight={"500"}
        type={"H4"}
      >
        {step}
      </CelButton>
    ));
  };
  render() {
    const { kycStatus, kycReasons, actions } = this.props;
    if (kycStatus === KYC_STATUSES.passed) return null;
    return (
      <RegularLayout theme={THEMES.LIGHT}>
        {this.renderCard()}
        {this.renderKycStatus(kycStatus)}
        {kycReasons ? (
          <InfoModal
            name={MODALS.KYC_REJECTED_MODAL}
            heading="Identity verification failed"
            support
            yesCopy="Verify identity again"
            onYes={actions.closeModal}
          >
            <>{this.renderErrors()}</>
          </InfoModal>
        ) : null}
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(KYCLanding);
