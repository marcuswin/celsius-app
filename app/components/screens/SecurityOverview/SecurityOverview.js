import React, { Component } from "react";
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
// import SecurityOverviewStyle from "./SecurityOverview.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";

@connect(
  () => ({
    overview: {
      is_2fa_set: true,
      user_actions_log: [
        {
          action: "CelPay Confirm",
          date: "12-12-2019"
        },
        {
          action: "Change Email",
          date: "21-4-2019"
        },
        {
          action: "Loan Apply",
          date: "21-4-2019"
        },
        {
          action: "Change Password",
          date: "11-5-2019"
        },
        {
          action: "Loan Apply",
          date: "28-2-2019"
        }
      ],
      account_activity_log: [
        {
          ip: "89.216.22.92",
          platform: "ios",
          country: "Serbia",
          date: "15-5-2019"
        },
        {
          ip: "89.216.22.92",
          platform: "android",
          country: "Albania",
          date: "10-5-2019"
        }
      ],
      devices_logged_in: [
        {
          model: "iPhone X",
          country: "Serbia",
          city: "Belgrade",
          date: "",
        },
        {
          model: "iPhone SE",
          country: "Serbia",
          city: "Belgrade",
          date: "10-4-2019",
        },
        {
          model: "GUMBOCA PHONE",
          country: "Serbia",
          city: "Arilje City",
          date: "juce",
        },
      ]
    }
  }),
    dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class SecurityOverview extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "SecurityOverview Screen",
    right: "profile"
  });

  render() {
    // const style = SecurityOverviewStyle();

    return (
      <RegularLayout>
        <CelText>Hello SecurityOverview</CelText>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(SecurityOverview);
