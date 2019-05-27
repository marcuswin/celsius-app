import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image, TouchableOpacity } from "react-native";
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
import KycRejectedModal from "../../organisms/KycRejectedModal/KycRejectedModal";
import ContactSupport from "../ContactSupport/ContactSupport";
import emptyStateUtil from '../../../utils/empty-state-util'
import { KYC_STATUSES } from "../../../constants/DATA";
import Icon from "../Icon/Icon";

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

  // timer = () => {
  //   this.setState({timer: null, counter: 0})
  // }


  render() {
    const emptyStateProps = {
      ...this.state,
      ...this.props
    };
    const { image, heading, paragraphs, onPress, button, support, title } = emptyStateProps;
    const { kycStatus, actions } = this.props
    // console.log(kycReasons, '111111111')
    const style = EmptyStateStyle();
    let kyc = 'Collecting'
    let kycColor = STYLES.COLORS.CELSIUS_BLUE
    if (kycStatus === 'rejected' || kycStatus === 'rejeceted') {
      kyc = 'Identity verification failed '
      kycColor = STYLES.COLORS.RED
    }
    if (kycStatus === 'pending' ||
      kycStatus === 'sending' ||
      kycStatus === 'sent') {
      kyc = 'In progress'
      kycColor = STYLES.COLORS.ORANGE
    }


    return (
      <View style={style.container}>
        <View>
          <Image source={image || require("../../../../assets/images/diane-sad.png")}
            style={{ width: 140, height: 140, resizeMode: "contain" }} />
        </View>
        <TouchableOpacity onPress={() => actions.openModal(MODALS.KYC_REJECTED_MODAL)} style={{ flex: 1, flexDirection: 'row', alignContent: 'center', alignItems: 'center' }} >
          <CelText margin="0 0 0 0" align="center" type="H3" weight={"500"} color={kycColor} bold>{title && title(kyc) || ''} </CelText>
          <Icon name='IconChevronRight' width={15} height={15} fill={STYLES.COLORS.RED} paddingTop={10} />
        </TouchableOpacity>

        <CelText margin="20 0 15 0" align="center" type="H2" weight={"bold"}>{heading}</CelText>

        {paragraphs && paragraphs.map(paragraph => (
          <CelText margin="5 0 15 0" align="center" type="H4" weight={"300"} key={paragraph}>{paragraph}</CelText>
        ))}

        {button && onPress ? (
          <CelButton margin="10 0 10 0" disabled={["pending", "sending", "sent"].indexOf(kycStatus) !== -1} onPress={onPress}>{button}</CelButton>
        ) : null}

        {support ? (
          <ContactSupport />
        ) : null}
        <TodayInterestRatesModal />
        <KycRejectedModal />
      </View>


    );
  }
};

EmptyState.propTypes = {};

export default testUtil.hookComponent(EmptyState);
