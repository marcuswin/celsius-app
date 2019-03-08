import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import formatter from "../../../utils/formatter";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import CelPayMessageStyle from "./CelPayMessage.styles";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelButton from '../../../components/atoms/CelButton/CelButton';
// import CelTextArea from '../../atoms/CelTextArea/CelTextArea';
import CelInput from '../../atoms/CelInput/CelInput';

@connect(
  state => ({
    formData: state.forms.formData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class CelPayMessage extends Component {

  constructor(props) {
    super(props);

    const { formData } = props;
    const names = (formData.friend && formData.friend.name) ? formData.friend.name.split(' ') : undefined;
    const screenTitle = names ? `Send to ${names[0] ? names[0] : ''} ${(!!names[1] && !!names[1][0]) ? names[1][0] : ''}` : 'Send'
    this.state = {
      header: {
        title: screenTitle,
        left: "back",
        right: "profile"
      }
    };
  }

  handleSend = () => {
    const { actions } = this.props

    actions.navigateTo('VerifyProfile', {
      onSuccess: actions.celPayFriend
    })
  }

  // Link coin and amount from previous screen
  render() {
    const { header } = this.state;
    const { formData } = this.props;
    const style = CelPayMessageStyle();

    return (
      <RegularLayout header={header}>
        <View style={style.container}>
          <CelInput
            placeholder="Notes (optional)"
            type="text-area"
            field="message"
            value={formData.message}
            numberOfLines={5}
          />

          <CelButton
            iconRight={"IconArrowRight"}
            margin="0 0 0 0"
            onPress={this.handleSend}
          >
            Send {formatter.crypto(formData.amountCrypto, formData.coin)}
          </CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(CelPayMessage);
