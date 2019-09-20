import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React, { Component } from "react";
// import Constants from 'expo-constants';
import { Image as RNImage, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-expo-image-cache";
import * as appActions from "../../../redux/actions";

import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import STYLES from "../../../constants/STYLES";
import Separator from "../../atoms/Separator/Separator";
import IconButton from "../../organisms/IconButton/IconButton";
import { MODALS } from "../../../constants/UI";
import ReferralSendModal from "../../organisms/ReferralSendModal/ReferralSendModal";
import RegisterPromoCodeModal from "../../organisms/RegisterPromoCodeModal/RegisterPromoCodeModal";
import CelButton from "../../atoms/CelButton/CelButton";
import MissingInfoCard from "../../atoms/MissingInfoCard/MissingInfoCard";
import appUtil from "../../../utils/app-util";

@connect(
  state => ({
    user: state.user.profile,
    profilePicture: state.user.profile.profile_picture,
    formData: state.forms.formData,
    formErrors: state.forms.formErrors
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Profile extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  static navigationOptions = () => ({
    // left: "back",
    title: "Your profile",
    right: "settings"
  });

  constructor(props) {
    super(props);
    this.state = {
      updatingTaxInfo: false,
      revisionId: ""
    };
  }

 async componentDidMount() {
    const { user, actions } = this.props;
    actions.profileTaxpayerInfo();
    this.initForm(user);

    const appVersion = await appUtil.getRevisionId()
    this.setState({ revisionId: appVersion.revisionId });
  }

  componentDidUpdate(prevProps) {
    const { user, actions } = this.props;
    if (prevProps.user.cellphone_verified !== user.cellphone_verified) {
      actions.updateFormFields({
        cellphone: user.cellphone,
      })
    }
  }

  initForm = (user) => {
    const { actions } = this.props;
    if (user) {
      actions.updateFormFields({
        ssn: user.ssn,
        cellphone_verified: user.cellphone_verified
      });
    }
  };

  logoutUser = async () => {
    const { actions } = this.props;
    await actions.logoutUser();
  };

  openReferralSendModal = () => {
    const { actions } = this.props;
    actions.openModal(MODALS.REFERRAL_SEND_MODAL);
  };

  render() {
    const { profilePicture, user, actions } = this.props;
    const { revisionId } = this.state

    return (
      <RegularLayout>
        <MissingInfoCard user={user} navigateTo={actions.navigateTo}/>

        <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
          {profilePicture ? (
            <Image
              style={{
                width: 100, height: 100, borderRadius: 50, borderWidth: 4, borderColor: STYLES.COLORS.WHITE
              }}
              uri={profilePicture}
              resizeMethod="resize"
            />
          ) : (
              <RNImage
                style={{
                  width: 100, height: 100, borderRadius: 50, borderWidth: 4, borderColor: STYLES.COLORS.WHITE
                }}
                source={require("../../../../assets/images/empty-profile/empty-profile.png")}
                resizeMethod="resize"
              />
            )}
          <View style={{ marginLeft: 20 }}>
            <CelText weight="600" type="H2">{user.first_name}</CelText>
            <CelText weight="600" type="H2">{user.last_name}</CelText>
            <TouchableOpacity onPress={() => actions.navigateTo("ChangeAvatar")}>
              <CelText color={STYLES.COLORS.CELSIUS_BLUE} margin="10 0 0 0">Change photo</CelText>
            </TouchableOpacity>
          </View>
        </View>

        <IconButton onPress={this.openReferralSendModal} icon="Refer" color="blue">Refer your friends</IconButton>
        <IconButton
          onPress={() => actions.openModal(MODALS.REGISTER_PROMO_CODE_MODAL)}
          margin="0 0 20 0"
          icon="Present"
        >
          Enter a promo code
        </IconButton>

        <Separator />

        <IconButton icon={"Couple"} onPress={() => actions.navigateTo("PersonalInformation")}>Personal Information</IconButton>

        <CelButton
          onPress={() => actions.navigateTo("TermsOfUse")}
          basic
          margin={"20 0 0 0"}
        >
          See Terms of use
        </CelButton>
        <CelText margin="20 0 0 0" weight="light" align='center' type="H7">
          Celsius App version: {revisionId}
        </CelText>

        <ReferralSendModal />
        <RegisterPromoCodeModal type={"celsius"} />
      </RegularLayout>
    );
  }
}

export default Profile;
