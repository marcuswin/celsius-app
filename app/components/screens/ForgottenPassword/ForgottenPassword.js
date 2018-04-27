import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Form, Text, View} from 'native-base';
import {bindActionCreators} from 'redux';

import {MainHeader} from '../../molecules/MainHeader/MainHeader';
import {AnimatedHeading} from '../../molecules/AnimatedHeading/AnimatedHeading';
import {Message} from '../../atoms/Message/Message';
import Styles from "./ForgottenPassword.styles";
import * as actions from "../../../redux/actions";
import {STYLES} from "../../../config/constants/style";
import {PrimaryButton} from "../../atoms/Buttons/Button/Button";
import {KEYBOARD_TYPE} from "../../../config/constants/common";
import PrimaryInput from "../../atoms/Inputs/PrimaryInput";
import apiUtil from "../../../utils/api-util";
import API from "../../../config/constants/API";

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    lastCompletedCall: state.api.lastCompletedCall,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class ForgottenPasswordScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
  }

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  onSubmit = () => {
    const { email } = this.state;
    const { sendResetLink } = this.props;
    sendResetLink(email);
  };

  updateEmail = (email) => {
    this.setState({ email });
  };

  render() {
    const { callsInProgress } = this.props;
    const { email} = this.state;

    const isLoading = apiUtil.areCallsInProgress([API.SEND_RESET_LINK], callsInProgress);

    return (
      <Container>
        <StatusBar barStyle="dark-content"/>
        <MainHeader
          {...this.props}
          backButton
          customStyle={{backgroundColor: STYLES.PRIMARY_BLUE }}
        />
        <AnimatedHeading
          containerCustomStyles={{backgroundColor: STYLES.PRIMARY_BLUE, paddingTop: 20, height: 120 }}
          ref={(heading) => {
            this.heading = heading;
          }}
          text={'Password forgotten'}/>

        <Message/>

        <Content
          bounces={false}
          style={Styles.content}
          onScroll={this.onScroll}>
          <View pointerEvents={isLoading ? 'none' : null} style={isLoading ? Styles.disabledForm : null}>
            <Text style={Styles.description}>
              Enter the email address you used to sign in to Celsius.
            </Text>

            <Form style={{paddingTop: 40}}>

              <PrimaryInput
                labelText={'Email'}
                keyboardType={KEYBOARD_TYPE.DEFAULT}
                value={email}
                onChange={this.updateEmail}/>

              <View style={Styles.buttonWrapper}>
                <PrimaryButton
                  loading={isLoading}
                  disabled={isLoading}
                  onPress={() => this.onSubmit()}
                  title={'Get reset link'}/>
              </View>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}

export default ForgottenPasswordScreen;
