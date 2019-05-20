import React, { Component } from "react";
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { lookup } from "country-data";
import moment from "moment";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import SecurityOverviewStyle from "./SecurityOverview.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Card from "../../atoms/Card/Card";
import Separator from "../../atoms/Separator/Separator";
import STYLES from "../../../constants/STYLES";
import Icon from "../../atoms/Icon/Icon";


@connect(
  state => ({
    securityOverview: state.user.securityOverview,
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

  getIcon = (item) => {
    if (item.action === "set-pin") return { name: 'Lock', color: 'green', action: 'Set Pin' }
    if (item.action === "confirm-celpay") return { name: 'Mail', color: 'blue', action: 'CelPay Confirmed' };
    if (item.action === "loan-apply") return { name: 'Lock', color: 'green', action: 'Loan apply' }
    if (item.action === "change-pass") return { name: 'Key', color: 'blue', action: 'Password changed' }
    if (item.action === "deactivation-2fa") return { name: 'Shield', color: 'red', action: '2FA Deactivated' }
    if (item.action === "activation-2fa") return { name: 'Shield', color: 'green', action: '2FA Activated' }
    if (item.action === "claim-celpay") return { name: 'CaretDown', color: 'green', action: 'CelPay Claimed' }
    if (item.action === "withdraw-info") return { name: 'CaretUp', color: 'red', action: 'Withdraw' }
    if (item.action === "deposit-success") return { name: 'CaretDown', color: 'green', action: 'Deposit' }
    if (item.action === "confirm-withdrawal-request") return { name: 'CaretUp', color: 'red', action: 'Withrdaw confirm request' }
  };

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


    const userActions = securityOverview ? securityOverview.user_actions_log.map((item) => {
      const actions = this.getIcon(item)
      return (
        <View style={style.userActionsLogWrapper} >
          <View style={style.userActionsLog}>
            <Icon name={actions.name} viewBox="0 0 29 29" fill={actions.color} />
            <CelText style={{ flex: 1, justifyContent: 'flex-start' }} type='H5' weight='600'>{actions.action} </CelText>
            <CelText type='H6' weight='300'>{moment(item.created_at).format('MMMM d, GGGG')} </CelText>
          </View>
          <View style={{ marginBottom: 0 }}>
            {securityOverview.user_actions_log[securityOverview.user_actions_log.length - 1] !== item ?
              <Separator /> : null
            }
          </View>
        </View>
      )
    }) : null
    return userActions
  }

  renderImage = (iso = "") => {
    const short = iso ? lookup.countries({ name: iso })[0].alpha2 : "";
    return <Image source={{ uri: `https://raw.githubusercontent.com/hjnilsson/country-flags/master/png250px/${short.toLowerCase()}.png` }} resizeMode="cover" style={{ borderRadius: 15, width: 30, height: 30 }} />
  }

  renderAccountActionsLog = () => { // country flag
    const { securityOverview } = this.props
    const style = SecurityOverviewStyle();
    const userActions = securityOverview ? securityOverview.account_activity_log.map((item) => (
      <View style={style.accountActionsLogWrapper}>
        <View style={style.accountActionsLog1}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            {this.renderImage(item.country)}
            <View style={style.accountActionsLog2}>
              <CelText type='H5' weight='600'>{item.ip} </CelText>
              <CelText type='H6' weight='300'>{item.country} </CelText>
            </View>
          </View>
          <View style={style.accountActionsLog3}>
            <CelText type='H6' weight='300'>{item.platform} </CelText>
            <CelText type='H6' weight='300'>{moment(item.date).format('MMMM d, GGGG')}</CelText>
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
          <Icon name="Mobile" viewBox="0 0 29 29" fill="#737A82" />
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <CelText type='H5' weight='600'>{item.model} </CelText>
            <CelText type='H6' weight='300'>{item.country} </CelText>
          </View>
          <View style={style.renderDeviceCity}>
            <CelText type='H6' weight='300'>{item.city} </CelText>
            <CelText type='H6' weight='300'>{moment(item.date).format('MMMM d, GGGG')}</CelText>
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
    const { actions } = this.props;
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

          <Separator margin='10 0 20 0' text="Account activity LOG" />

          {this.renderAccountActionsLog()}

          <Separator margin='10 0 20 0' text="DEVICES Loged in" />

          {this.renderDeviceLogedIn()}

          <Separator margin='20 0 20 0' />

          <View ><CelText align='center'>To make any changes on your account’s safety go to your<CelText color={STYLES.COLORS.CELSIUS_BLUE} onPress={() => actions.navigateTo('SecuritySettings')}> Security Settings</CelText></CelText></View>

        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(SecurityOverview);

