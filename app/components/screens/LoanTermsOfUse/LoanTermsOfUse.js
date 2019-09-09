import React, { Component } from "react";
import { View, TouchableOpacity, Linking } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Markdown from "react-native-markdown-package"

import * as appActions from "../../../redux/actions";
import LoanTermsOfUseStyle from "./LoanTermsOfUse.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import { MODALS, THEMES } from "../../../constants/UI";
import CelCheckbox from "../../atoms/CelCheckbox/CelCheckbox";
import STYLES from "../../../constants/STYLES";
import Card from "../../atoms/Card/Card";
// import ExpandableItem from "../../molecules/ExpandableItem/ExpandableItem";
import Icon from "../../atoms/Icon/Icon";

@connect(
  state => ({
    formData: state.forms.formData,
    loanTermsOfUse: state.generalData.loanTermsOfUse,
    pdf: state.generalData.pdf,
    theme: state.user.appSettings.theme
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class LoanTermsOfUse extends Component {
  static navigationOptions = () => ({
    title: "Terms and Conditions"
  });

  constructor(props) {
    super(props);

    this.state = {
      accept: false,
      pdf: undefined
    };

    props.actions.initForm({
      acceptLoanTermsOfUse: false
    });
  }

  componentDidMount() {
    const {pdf} = this.props;
    this.setState({
      pdf
    });
  }

  handleRequestButton = () => {
    const { actions } = this.props;
    actions.openModal(MODALS.LOAN_APPLICATION_SUCCESS_MODAL);
  };

  handleAcceptance = () => {
    const { accept } = this.state;
    const { formData } = this.props;

    if (accept) {
      formData.acceptLoanTermsOfUse = true;
    } else {
      formData.acceptLoanTermsOfUse = false;
    }
  };


  render() {
    const { formData, loanTermsOfUse, theme } = this.props;
    const { accept, pdf } = this.state;
    const styles = LoanTermsOfUseStyle();
    // const termsOfUse = handleCopy();
    this.handleAcceptance();

    const c = theme === THEMES.LIGHT ? STYLES.COLORS.DARK_GRAY : "white";

    return (
      <RegularLayout fabType={"hide"}>

        <Markdown styles={{
          heading1: { color: c },
          heading2: { marginTop: 30, color: c },
          text: { color: c },
          listItemBullet: { color: c },
          listItemNumber: { color: c },
        }}
        onLink={(url) => Linking.openURL(url)}
        >
          {loanTermsOfUse}
        </Markdown>

        <Card
          color={
            theme === THEMES.LIGHT
              ? STYLES.COLORS.WHITE
              : STYLES.COLORS.SEMI_GRAY
          }
          margin={"20 0 20 0"}
        >
          <CelCheckbox
            onChange={(field, value) => this.setState({ accept: value })}
            field={"acceptPt3"}
            value={accept}
            uncheckedCheckBoxColor={STYLES.COLORS.GRAY}
            checkedCheckBoxColor={STYLES.COLORS.GREEN}
            rightText={
              "I have read, understood and agree to the above mentioned in Celsius Loan Terms and Conditions"
            }
          />
        </Card>
        <Card
          color={
            theme === THEMES.LIGHT
              ? STYLES.COLORS.WHITE
              : STYLES.COLORS.SEMI_GRAY
          }
          padding={"20 0 20 0"}
        >
          <View style={styles.shareCard}>
            <TouchableOpacity onPress={() => Linking.openURL(pdf)} style={styles.shareButton}>
              <Icon
                name="Share"
                height="24"
                fill={STYLES.COLORS.GRAY}
                style={styles.iconStyle}
              />
              <CelText align={"center"}>Share/Download</CelText>
            </TouchableOpacity>
          </View>
        </Card>

        <CelButton
          onPress={this.handleRequestButton}
          style={styles.requestButton}
          disabled={!formData.acceptLoanTermsOfUse}
        >
          Request Loan
        </CelButton>
      </RegularLayout>
    );
  }
}

export default LoanTermsOfUse;
