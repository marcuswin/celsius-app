import React, { Component } from "react";
import { View, TouchableOpacity, Linking } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Markdown from "react-native-markdown-renderer";

import * as appActions from "../../../redux/actions";
import LoanTermsOfUseStyle from "./LoanTermsOfUse.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import { THEMES } from "../../../constants/UI";
import CelCheckbox from "../../atoms/CelCheckbox/CelCheckbox";
import STYLES from "../../../constants/STYLES";
import Card from "../../atoms/Card/Card";
import ExpandableItem from "../../molecules/ExpandableItem/ExpandableItem";
import Icon from "../../atoms/Icon/Icon";
import HeadingProgressBar from '../../atoms/HeadingProgressBar/HeadingProgressBar'

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
      accept: [false, false, false],
      pdf: undefined
    };

    props.actions.updateFormFields({
      acceptLoanTermsOfUse: false
    });
  }

  componentDidMount() {
    const { pdf } = this.props;
    this.setState({
      pdf
    });
  }

  handleAcceptance = () => {
    const { accept } = this.state;
    const { actions } = this.props;
    let acceptedCount = 0;
    accept.forEach(accepted => {
        if (accepted) {
          acceptedCount++;
        }
      }
    );
    if (acceptedCount === 3) {
      actions.updateFormField("acceptLoanTermsOfUse", true);
    } else {
      actions.updateFormField("acceptLoanTermsOfUse", false);
    }
  };

  continue = () => {
    const { actions } = this.props
    actions.navigateTo('VerifyProfile', {
      onSuccess: () => actions.applyForALoan()
    })
  }


  render() {
    const { formData, loanTermsOfUse, theme } = this.props;
    const { pdf, accept } = this.state;
    const styles = LoanTermsOfUseStyle();
    // const termsOfUse = handleCopy();

    const c = theme === THEMES.LIGHT ? STYLES.COLORS.MEDIUM_GRAY : "white";
    const terms = loanTermsOfUse.split("##").splice(1);

    const text = terms.map(t => {
      const tempTerm = t.split(/\r?\n/g);

      const data = tempTerm.slice(1);
      return {
        heading: tempTerm[0],
        content: data
      };
    });

    const borderValue = text.length / 3;
    const count = 1;

    return (
      <RegularLayout fabType={"hide"} padding="0 0 100 0">
        <HeadingProgressBar steps={6} currentStep={6} />
        <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
          {text.map(({ heading, content }, index) => (
            <View key={`${heading}${index}`} style={{marginTop:10}}>
              {index === 0 ?
                <View>
                  <Markdown style={{
                    text: { color: theme === THEMES.LIGHT ? STYLES.COLORS.DARK_GRAY : "white", fontSize: 26, fontWeight: "bold"},
                  }}
                  >
                    {heading}
                  </Markdown>
                  <Markdown style={{
                    text: { color: c, fontSize: 16 },
                    link: {color: STYLES.COLORS.CELSIUS_BLUE}
                  }}
                  >
                    {content}
                  </Markdown>
                </View>
                :
                <ExpandableItem margin="3 0 3 0" heading={heading} >
                  <Markdown style={{
                    listOrderedItemIcon: { color: c },
                    listUnorderedItemIcon: { color: c, marginTop: 5 },
                    text: { color: c, fontSize: 16 },
                    list: { color: c },
                    link: {color: STYLES.COLORS.CELSIUS_BLUE}
                  }}
                  >
                    {content}
                  </Markdown>
                </ExpandableItem>
              }
                {index !== 0 && index % borderValue * count === 0 || index === text.length - 1 ?
                  <Card
                    color={
                      theme === THEMES.LIGHT
                        ? STYLES.COLORS.WHITE
                        : STYLES.COLORS.SEMI_GRAY
                    }
                    margin={"20 0 20 0"}
                  >
                    <CelCheckbox
                      onChange={(field, value) => {
                        const acceptIndex = (!(index !== 0 && index % borderValue * count === 0) && index === text.length - 1 ? 2 : index % 3 - 1);
                        accept[acceptIndex] = value;
                        this.setState({ accept }, this.handleAcceptance);
                      }}
                      field={"accept"}
                      value={accept[(!(index !== 0 && index % borderValue * count === 0) && index === text.length - 1 ? 2 : index % 3 - 1)]}
                      uncheckedCheckBoxColor={STYLES.COLORS.GRAY}
                      checkedCheckBoxColor={STYLES.COLORS.GREEN}
                      rightText={
                        "I have read, understood and agree to the above mentioned in Celsius Loan Terms and Conditions"
                      }
                    />
                  </Card>
                  : null
                }
              </View>
            )
          )}
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
                <CelText align={"center"}>Download</CelText>
              </TouchableOpacity>
            </View>
          </Card>

          <CelButton
            onPress={this.continue}
            style={styles.requestButton}
            disabled={!formData.acceptLoanTermsOfUse}
          >
            Request loan
          </CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default LoanTermsOfUse
