import React, { Component } from "react";
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { Image } from "react-native-expo-image-cache";
import { countries } from "country-data";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import SecurityOverviewStyle from "./SecurityOverview.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Card from "../../atoms/Card/Card";
import Separator from "../../atoms/Separator/Separator";
import STYLES from "../../../constants/STYLES";
import Icon from "../../atoms/Icon/Icon";
// import { widthPercentageToDP } from "../../../utils/styles-util";


@connect(
  state => ({
    securityOverview: state.user.securityOverview,
    overview: {
      is_2fa_set: true,
      user_actions_log: [
        {
          action: "CelPayConfirm",
          date: "12-12-2019"
        },
        {
          action: "ChangeEmail",
          date: "21-4-2019"
        },
        // {
        //   action: "Loan Apply",
        //   date: "21-4-2019"
        // },
        // {
        //   action: "Change Password",
        //   date: "11-5-2019"
        // },
        // {
        //   action: "Loan Apply",
        //   date: "28-2-2019"
        // }
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
  static propTypes = {
    iconName: PropTypes.string,
  };
  static defaultProps = {
    iconName: ''
  };

  static navigationOptions = () => ({
    title: "Security info",
    right: "profile"
  });

  componentDidMount() {
    const { actions } = this.props;
    actions.getSecurityOverview();
  }

  getIcon = () => {
    const { securityOverview } = this.props
    const usr = securityOverview.user_actions_log.map(a => a.action)
    // let dddn = ...securityOverview.user_actions_log
    // let icon;
    // console.log(...usr.map(a))

    if( usr.indexOf("set-pin") !== -1 ) return { name: 'Mail', color: 'green', action: 'Set Pin'}
    // console.log("1")
    if( usr.indexOf("confirm-celpay") !== -1 ) return { name: 'Mail', color:'blue', action: 'CelPay Confirmed' };
    // console.log("2")
    if (usr.indexOf("loan-apply") !== -1) return { name: 'Lock', color: 'green', action: 'Loan apply'  }
    // console.log("3")
    if (usr.indexOf("change-pass") !== -1) return { name: 'Key', color: 'blue', action: 'Password changed'  }
    if (usr.indexOf("deactivation-2fa") !== -1) return { name: 'Shield', color: 'red', action: '2FA Deactivated'  }
    if (usr.indexOf("activation-2fa") !== -1) return { name: 'Shield', color: 'green', action: '2FA Activated'  }
    if (usr.indexOf("claim-celpay") !== -1) return { name: 'CaretDown', color: 'green', action: 'CelPay Claimed'  }
    // if (usr.indexOf("set-pin") !== -1) return { name: 'Lock', color: 'green', action: 'CelPay Confirmed'  }
    if (usr.indexOf("withdraw-info") !== -1) return { name: 'CaretUp', color: 'red', action: 'Withdraw'  }
    if (usr.indexOf("deposit-success") !== -1) return { name: 'CaretDown', color: 'green', action: 'Deposit'  }
    if (usr.indexOf("confirm-withdrawal-request") !== -1) return { name: 'CaretUp', color: 'red', action: 'Withrdaw confirm request'  }

  }

  renderStatus = () => {
    const { is2FAEnabled } = this.props;

    if (is2FAEnabled) {
      return <CelText type='H2' weight="600" color={STYLES.COLORS.GREEN}> ACTIVE </CelText>
    }
    return <CelText type='H2' weight="600" color={STYLES.COLORS.RED}> INACTIVE </CelText>
  }


  renderUserActionsLog = () => { // Add text (no actions yet..) if doesn't exists
    const { securityOverview } = this.props
    const style = SecurityOverviewStyle();


    const userActions = securityOverview ? securityOverview.user_actions_log.map((item) => (
      <View style={style.userActionsLogWrapper}>
        <View style={style.userActionsLog}>
            <Icon name={this.getIcon().name} viewBox="0 0 29 29" fill={this.getIcon().color} />
            <CelText style={{ flex: 1, justifyContent: 'flex-start', paddingLeft: 5 }} type='H5' weight='600'>{this.getIcon().action} </CelText>
            <CelText type='H6' weight='300'>{item.created_at.split('T')[0]} </CelText>
        </View>
        <View style={{ marginTop: 15 }}>
          {securityOverview.user_actions_log[securityOverview.user_actions_log.length - 1] !== item ?
            <Separator /> : null
          }
        </View>
      </View>
    )) : null
    return userActions
  }

  // renderImage = (iso = 'Serbia') => {
  //   return <Image source={{ uri: `https://raw.githubusercontent.com/hjnilsson/country-flags/master/png250px/${iso.toLowerCase()}.png` }} resizeMode="cover" />
  // }

  renderAccountActionsLog = () => { // country flag
    const { securityOverview } = this.props
    const style = SecurityOverviewStyle();
    // const country = overview.account_activity_log.map(a => a.country)
    // console.log(country)
    const country = this.props.value ? this.props.value : countries.US;


    const userActions = securityOverview ? securityOverview.account_activity_log.map((item) => (
      <View style={style.accountActionsLogWrapper}>
        <View style={style.accountActionsLog1}>
          <View style={style.accountActionsLog2}>
            {/* <View style={{ flex: 1, flexDirection: 'row' }}> */}
              {this.renderImage(country.name)}
            {/* </View> */}
            <CelText type='H5' weight='600'>{item.ip} </CelText>
            <CelText type='H6' weight='300'>{item.country} </CelText>
          </View>
          <View style={style.accountActionsLog3}>
            <CelText type='H6' weight='300'>{item.platform} </CelText>
            <CelText type='H6' weight='300'>{item.date.split('T')[0]} </CelText>
          </View>
        </View>
        {securityOverview.account_activity_log[securityOverview.account_activity_log.length - 1] !== item ?
          <Separator margin='15 0 10 0' /> : null
        }
      </View>
    )) : null
    return userActions
  }

  renderDeviceLogedIn = () => { // Logic for current device loged in
    const { securityOverview } = this.props
    const style = SecurityOverviewStyle();
    // console.log(moment)


    const userActions = securityOverview ? securityOverview.devices_logged_in.map((item) => (
      <View style={style.renderDeviceWrapper}>
        <View style={style.renderDevice}>
          <Icon name="Mobile" viewBox="0 0 29 29" fill="#737A82" style={{ marginTop: 7 }} />
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <CelText type='H5' weight='600'>{item.model} </CelText>
            <CelText type='H6' weight='300'>{item.country} </CelText>
          </View>
          <View style={style.renderDeviceCity}>
            <CelText type='H6' weight='300'>{item.city} </CelText>
            <CelText type='H6' weight='300'>{item.date.split('T')[0]} </CelText>
          </View>
        </View>
        {securityOverview.devices_logged_in[securityOverview.devices_logged_in.length - 1] !== item ?
          <Separator margin='15 0 10 0' /> : null
        }
      </View>
    )) : null
    return userActions
  }

  render() {
    // const {securityOverview} = this.props;
    const style = SecurityOverviewStyle();
    // console.log(this.getIcon().color, 'this . get con')

    return (
      <RegularLayout>
        <View style={{ flex: 1 }}>
          <CelText margin='0 0 20 0'>Check the security of your account and check the suggestions on how to make it even more secure.</CelText>
          <Separator text="Two-factor verification" />
          <Card margin='40 0 40 0'>
            <View style={style.twoFactor}>
              <Image source={require("../../../../assets/images/security/securityDog/security-dog-illustration.png")}
                style={style.twoFactorImage}
              />
              <View style={style.twoFactorText}>
                <CelText type="H7" > Your Two-Factor Verification is </CelText>
                <CelText align='right'>{this.renderStatus()}</CelText>
              </View>
            </View>
          </Card>
          <CelText margin='0 0 20 0'>Two-Factor Verification is an extra layer of security that prevents the risk of an unwanted access to your account, even if your login information is compromised. </CelText>
          <Separator text="Email conformation" />

          <Card margin='40 0 40 0'>
            <View style={style.email}>
              <Image source={require("../../../../assets/images/security/securityDiane/security-diane-illustration.png")}
                style={style.emailImage} />
              <View style={style.emailText}>
                <CelText type="H7">Email conformation</CelText>
                <CelText type='H2' weight="600" color={STYLES.COLORS.GREEN}>ACTIVE</CelText>
              </View>
            </View>
          </Card>
          <CelText margin='0 0 20 0'>Stay in control of your actions! By confirming your transactions via email you are adding to your security level.</CelText>
          <Separator margin='0 0 10 0' text="User actions log" />

          {this.renderUserActionsLog()}

          <Separator margin='10 0 10 0' text="Account activity LOG" />

          {this.renderAccountActionsLog()}

          <Separator margin='10 0 10 0' text="DEVICES Loged in" />

          {this.renderDeviceLogedIn()}

          <Separator margin='20 0 20 0' />

          <CelText margin='0 0 20 0' align='center'>To make any changes on your account’s safety go to your Security Settings </CelText>

        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(SecurityOverview);
// 