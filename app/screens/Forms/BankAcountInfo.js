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
import PrimaryInput from "../../components/Inputs/PrimaryInput/PrimaryInput";
import {KEYBOARD_TYPE} from "../../config/constants/common";
import {PrimaryButton} from "../../components/Buttons/Button/Button";

@connect(
  state => ({
    nav: state.nav,
    bankInfo: state.users.bankInfo
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class BankAccountInfoScreen extends Component {
  constructor(props) {
    super();

    this.state = {
      name: props.bankInfo.name,
      routingNumber: props.bankInfo.routingNumber,
      accountNumber: props.bankInfo.accountNumber,
      purposeOfLoan: props.bankInfo.purposeOfLoan,
      note: props.bankInfo.note,
      isDefault: props.bankInfo.isDefault,
      isLoading: false,
      disabledButton: false
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const {personalInfo} = this.props;

    if (!_.isEqual(personalInfo, nextProps.personalInfo)) {
      this.setState({isLoading: false, disabledButton: false});
    }
  };

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  onSubmit = () => {
    const {createUserBankInfo} = this.props;
    const {
      name,
      routingNumber,
      accountNumber,
      purposeOfLoan,
      note,
      isDefault,
    } = this.state;

    this.setState({isLoading: true, disabledButton: true});

    createUserBankInfo({
      name,
      routingNumber,
      accountNumber,
      purposeOfLoan,
      note,
      isDefault,
    });
  };

  render() {
    const {
      name,
      routingNumber,
      accountNumber,
      purposeOfLoan,
      isDefault,
      note,
      isLoading,
      disabledButton
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
          text={'Bank Info'}/>

        <Message/>

        <Content
          bounces={false}
          style={Styles.content}
          onScroll={this.onScroll}>
          <View pointerEvents={isLoading ? 'none' : null} style={isLoading ? Styles.disabledForm : null}>
            <Form>
              <PrimaryInput
                labelText={'Bank Name'}
                keyboardType={KEYBOARD_TYPE.NUMERIC}
                value={name}
                onChange={(text) => this.setState({name: text})}/>

              <PrimaryInput
                labelText={'Routing number'}
                keyboardType={KEYBOARD_TYPE.NUMERIC}
                value={routingNumber}
                autoCapitalize={'words'}
                onChange={(text) => this.setState({routingNumber: text})}/>

              <PrimaryInput
                labelText={'Account number'}
                keyboardType={KEYBOARD_TYPE.NUMERIC}
                value={accountNumber}
                autoCapitalize={'words'}
                onChange={(text) => this.setState({accountNumber: text})}/>

              <PrimaryInput
                labelText={'Purpose of Loan'}
                keyboardType={KEYBOARD_TYPE.DEFAULT}
                value={purposeOfLoan}
                onChange={(text) => this.setState({purposeOfLoan: text})}/>

              <PrimaryInput
                labelText={'Note'}
                keyboardType={KEYBOARD_TYPE.DEFAULT}
                value={note}
                multiline
                onChange={(text) => this.setState({note: text})}/>

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
                  disabled={disabledButton}
                  onPress={() => this.onSubmit()}
                  title={'Next'}/>
              </View>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}

export default BankAccountInfoScreen;
