import React, { Component } from "react";
import { View, Image } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { Image } from "react-native-expo-image-cache";


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
    title: "Security info",
    right: "profile"
  });

  componentDidMount() {
    const { actions } = this.props;
    actions.getSecurityOverview();
  }


  // getIcon = () => {
  //   const overview = this.props
  //   const usr = overview.user_actions_log.map(a => a.action)
  //   switch (usr) {
  //     case 'CelPay Confirm':
  //       return {
  //         iconName: 'TransactionReceived',
  //       }
  //     case 'Change Email':
  //       return {
  //         iconName: 'TransactionReceived',
  //       }
  //   }
  // }

  renderStatus = () => {
    const { is2FAEnabled } = this.props;

    if (is2FAEnabled) {
      return <CelText type='H2' weight="600" color={STYLES.COLORS.GREEN}> ACTIVE </CelText>
    }
      return <CelText type='H2' weight="600" color={STYLES.COLORS.RED}> INACTIVE </CelText>
  }

  renderUserActionsLog = () => { // Add text (no actions yet..) if doesn't exists
    const { overview } = this.props
    const style = SecurityOverviewStyle();
    const usr = overview.user_actions_log.map(a => a.action)
    // const sct = usr[Object.keys(usr)]
    let iconName
    // console.log(usr)

    switch (overview.user_actions_log) {
      case usr === 'CelPay Confirm':
        return {
          iconName: 'UpArrow',
        }
      case 'Change Email':
        return {
          iconName: 'DownArrow'
        }
    }

    // const { iconName } = this.getIcon()
    // let what = overview.account_activity_log.action
    // const usr = overview.user_actions_log.map(a => a.action)
    // console.log(usr)
    // what[Object.keys(what)[0]]

    const userActions = overview.user_actions_log.map((item) => (
      <View style={style.userActionsLogWrapper}>
        <View style={style.userActionsLog}>
          <Icon name={iconName} height={160} width={160} fill="black" />
          <CelText style={{ flex: 1, justifyContent: 'flex-start', paddingLeft: 10 }} type='H5' weight='600'>{item.action} </CelText>
          <CelText type='H6' weight='300'>{item.date} </CelText>
        </View>
        <View style={{ marginTop: 15 }}>
          {overview.user_actions_log[overview.user_actions_log.length - 1] !== item ?
            <Separator /> : null
          }
        </View>
      </View>
     ) )
    // { console.log(iconName, ' -->> iconName') }
    return userActions
  }

  // renderImage = (iso = "") => {
  //   return <Image source={{ uri: `https://raw.githubusercontent.com/hjnilsson/country-flags/master/png250px/${iso.toLowerCase()}.png` }} resizeMode="cover" />
  // }

  renderAccountActionsLog = () => { // country flag
    const { overview } = this.props
    const style = SecurityOverviewStyle();
    // const country = overview.account_activity_log.map(a => a.country)
    // console.log(country)

    const userActions = overview.account_activity_log.map((item) => (
      <View style={style.accountActionsLogWrapper}>
        <View style={style.accountActionsLog}>
          <View style={style.accountActionsLog2}>
            <View>
              {this.renderImage('Serbia')}
            </View>
            <CelText type='H5' weight='600'>{item.ip} </CelText>
            <CelText type='H6' weight='300'>{item.country} </CelText>
          </View>
          <View style={style.accountActionsLog3}>
            <CelText type='H6' weight='300'>{item.platform} </CelText>
            <CelText type='H6' weight='300'>{item.date} </CelText>
          </View>
        </View>
        {/* <Separator margin='15 0 10 0' /> */}
        {overview.account_activity_log[overview.account_activity_log.length - 1] !== item ?
          <Separator margin='15 0 10 0' /> : null
        }
      </View>
    ))
    return userActions
  }

  renderDeviceLogedIn = () => { // Logic for current device loged in
    const { overview } = this.props
    const style = SecurityOverviewStyle();

    const userActions = overview.devices_logged_in.map((item) => (
      <View style={style.renderDeviceWrapper}>
        <View style={style.renderDevice}>
          <Icon name="Mobile" viewBox="0 0 29 29" fill="#737A82" style={{ marginTop: 7 }} />
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <CelText type='H5' weight='600'>{item.model} </CelText>
            <CelText type='H6' weight='300'>{item.country} </CelText>
          </View>
          <View style={style.renderDeviceCity}>
            <CelText type='H6' weight='300'>{item.city} </CelText>
            <CelText type='H6' weight='300'>{item.date} </CelText>
          </View>
        </View>
        {overview.devices_logged_in[overview.devices_logged_in.length - 1] !== item ?
          <Separator margin='15 0 10 0' /> : null
        }
      </View>
    ))
    return userActions
  }

  render() {
    // const {securityOverview} = this.props;
    const style = SecurityOverviewStyle();

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
