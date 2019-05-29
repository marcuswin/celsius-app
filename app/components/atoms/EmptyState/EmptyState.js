import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";
import testUtil from "../../../utils/test-util";
import EmptyStateStyle from "./EmptyState.styles";
import STYLES from "../../../constants/STYLES";
import CelText from "../CelText/CelText";
import CelButton from "../CelButton/CelButton";
import { THEMES, EMPTY_STATES, MODALS } from "../../../constants/UI";
import TodayInterestRatesModal from "../../organisms/TodayInterestRatesModal/TodayInterestRatesModal";
import ContactSupport from "../ContactSupport/ContactSupport";
import emptyStateUtil from '../../../utils/empty-state-util'
import { KYC_STATUSES } from "../../../constants/DATA";
import InfoModal from "../../molecules/InfoModal/InfoModal";

@connect(
  state => ({
    kycReasons: state.user.profile.kyc.rejectionReasons,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class EmptyState extends Component {
  static propTypes = {
    purpose: PropTypes.oneOf(Object.keys(EMPTY_STATES)),
    theme: PropTypes.oneOf(Object.values(THEMES)),
    heading: PropTypes.string,
    image: PropTypes.string,
    paragraphs: PropTypes.instanceOf(Array),
    button: PropTypes.string,
    onPress: PropTypes.func,
    support: PropTypes.bool
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = emptyStateUtil(props.purpose, props.actions);
  }

  renderErrors = () => {
    const { kycReasons } = this.props
    const err = kycReasons.map((reason, e) => (

      <CelText key={e.length} margin={"0 0 20 0"}>
        {reason}
      </CelText>

    ))
    return err
  }

  renderKYCReject = () => {
    const emptyStateProps = {
      ...this.state,
      ...this.props
    };
    const { title } = emptyStateProps;
    const { kycStatus, actions } = this.props;
    let kycColor = STYLES.COLORS.CELSIUS_BLUE;
    let kyc = 'Collecting';

    if (kycStatus === 'rejected' || kycStatus === 'rejeceted') {
      kyc = 'Identity verification failed    '
      kycColor = STYLES.COLORS.RED
    }
    if (kycStatus === 'pending' ||
      kycStatus === 'sending' ||
      kycStatus === 'sent') {
      kyc = 'In progress'
      kycColor = STYLES.COLORS.ORANGE
    }

    return (
      (kycStatus === 'rejected' || kycStatus === 'rejeceted') ? 
      < CelButton onPress={() => actions.openModal(MODALS.KYC_REJECTED_MODAL)} basic textColor={STYLES.COLORS.RED} iconRight={'IconChevronRight'} iconRightHeight={'12'} iconRightWidth={'12'} iconRightColor={STYLES.COLORS.RED}>
        {title && title(kyc) || ''}
      </CelButton > 
      :   
      <CelText margin="0 0 2 0" align="center" type="H3" weight={"500"} color={kycColor} bold>{title && title(kyc) || ''} </CelText>

    )
  }

  render() {
    const emptyStateProps = {
      ...this.state,
      ...this.props
    };
    const { image, heading, paragraphs, onPress, button, support } = emptyStateProps;
    const { kycStatus, kycReasons, actions } = this.props
    const style = EmptyStateStyle();
    const RenderKYCReject = this.renderKYCReject


    return (
      <View style={style.container}>
        <View>
          <Image source={image || require("../../../../assets/images/diane-sad.png")}
            style={{ width: 140, height: 140, resizeMode: "contain" }} />
        </View>

        <RenderKYCReject />
        
        <CelText margin="20 0 15 0" align="center" type="H2" weight={"bold"}>{heading}</CelText>

        {paragraphs && paragraphs.map(paragraph => (
          <CelText margin="5 0 15 0" align="center" type="H4" weight={"300"} key={paragraph.length}>{paragraph}</CelText>
        ))}

        {button && onPress ? (
          <CelButton margin="10 0 10 0" disabled={["pending", "sending", "sent"].indexOf(kycStatus) !== -1} onPress={onPress}>{button}</CelButton>
        ) : null}

        {support ? (
          <ContactSupport />
        ) : null}
        <TodayInterestRatesModal />
         { kycReasons ?
          <InfoModal
          name={MODALS.KYC_REJECTED_MODAL}
          heading='Identity verification failed'
          paragraphs={this.renderErrors()}
          noCopy='Verify identity again'
          onNo={actions.closeModal}
        /> : null }

      </View>


    );
  }
};

EmptyState.propTypes = {};

export default testUtil.hookComponent(EmptyState);
