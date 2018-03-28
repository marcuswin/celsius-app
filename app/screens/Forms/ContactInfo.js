import React, {Component} from 'react';
import {Platform, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Form, View} from 'native-base';
import {bindActionCreators} from 'redux';
import CheckBox from 'react-native-checkbox';
import * as _ from 'lodash';

import {MainHeader} from '../../components/Headers/MainHeader/MainHeader';
import {AnimatedHeading} from '../../components/Headings/AnimatedHeading/AnimatedHeading';
import {Message} from '../../components/Message/Message';
import Styles from "./styles";
import * as actions from "../../redux/actions";
import {STYLES} from "../../config/constants/style";
import PrimaryInput from "../../components/Inputs/PrimaryInput";
import {KEYBOARD_TYPE} from "../../config/constants/common";
import {PrimaryButton} from "../../components/Buttons/Button/Button";

@connect(
  state => ({
    nav: state.nav,
    contactInfo: state.users.contactInfo
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class ContactInfoScreen extends Component {
  constructor(props) {
    super();

    this.state = {
      cellPhone: props.contactInfo.cellPhone,
      otherPhones: props.contactInfo.otherPhones,
      email: props.contactInfo.email,
      isDefault: props.contactInfo.isDefault,
      isLoading: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentWillReceiveProps = (nextProps) => {
    const {contactInfo} = this.props;

    if (!_.isEqual(contactInfo, nextProps.contactInfo)) {
      this.setState({isLoading: false});
    }
  };

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  onSubmit = () => {
    const {createUserContactInfo, showMessage} = this.props;
    const {
      cellPhone,
      otherPhones,
      email,
      isDefault,
    } = this.state;

    const error = this.validateForm();

    if (!error) {
      this.setState({isLoading: true});

      createUserContactInfo({
        cellPhone,
        otherPhones,
        email,
        isDefault
      });
    } else {
      showMessage('error', error);
    }
  };

  validateForm = () => {
    const {
      cellPhone,
      email,
    } = this.state;

    if (!cellPhone) return 'Cell phone is required!';
    if (!email) return 'Email is required!';
  };

  render() {
    const {
      cellPhone,
      otherPhones,
      email,
      isDefault,
      isLoading,
    } = this.state;

    return (
      <Container>
        <StatusBar barStyle="dark-content"/>
        <MainHeader {...this.props} backButton customStyle={{backgroundColor: STYLES.PRIMARY_BLUE}}/>
        <AnimatedHeading
          containerCustomStyles={{backgroundColor: STYLES.PRIMARY_BLUE}}
          ref={(heading) => {
            this.heading = heading;
          }}
          text={'Contact Info'}/>

        <Message/>

        <Content
          bounces={false}
          style={Styles.content}
          onScroll={this.onScroll}>
          <View pointerEvents={isLoading ? 'none' : null} style={isLoading ? Styles.disabledForm : null}>
            <Form>
              <PrimaryInput
                labelText={'Cell Phone *'}
                keyboardType={KEYBOARD_TYPE.NUMERIC}
                value={cellPhone}
                onChange={(text) => this.setState({cellPhone: text})}/>

              <PrimaryInput
                labelText={'Other phones'}
                keyboardType={KEYBOARD_TYPE.DEFAULT}
                value={otherPhones}
                autoCapitalize={'words'}
                onChange={(text) => this.setState({otherPhones: text})}/>

              <PrimaryInput
                labelText={'Email *'}
                keyboardType={KEYBOARD_TYPE.EMAIL}
                value={email}
                autoCapitalize={'words'}
                onChange={(text) => this.setState({email: text})}/>

              <CheckBox
                label={`Save as default`}
                checked={isDefault}
                labelStyle={Styles.checkboxLabel}
                checkboxStyle={Styles.checkboxStyle}
                checkedImage={
                  Platform.OS === 'ios' ?
                    require('../../../assets/images/icons/icon-check.png') :
                    require('../../../assets/images/icons/icon-check2x.png')
                }
                uncheckedImage={require('../../../assets/images/icons/transparent.png')}
                onChange={() => {
                  this.setState({isDefault: !this.state.isDefault})
                }}
              />

              <View style={Styles.buttonWrapper}>
                <PrimaryButton
                  loading={isLoading}
                  onPress={this.onSubmit}
                  title={'Next'}/>
              </View>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}

export default ContactInfoScreen;
