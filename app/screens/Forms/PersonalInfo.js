import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Form, View} from 'native-base';
import {bindActionCreators} from 'redux';

import {MainHeader} from '../../components/Headers/MainHeader/MainHeader';
import {AnimatedHeading} from '../../components/Headings/AnimatedHeading/AnimatedHeading';
import {Message} from '../../components/Message/Message';
import KycStyles from "./styles";
import * as actions from "../../redux/actions";
import {STYLES} from "../../config/constants/style";
import PrimaryInput from "../../components/Inputs/PrimaryInput/PrimaryInput";
import {KEYBOARD_TYPE} from "../../config/constants/common";

@connect(
  state => ({
    nav: state.nav,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class PersonalInfoScreen extends Component {
  constructor() {
    super();

    this.state = {
      first_name: '',
      lastName: '',
      middleName: '',
      dateOfBirth: '',
      gender: '',
      phoneNumber: ''
    };
  }

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  render() {
    const {firstName, lastName, middleName, dateOfBirth, gender, phoneNumber} = this.state;

    return (
      <Container>
        <StatusBar barStyle="dark-content"/>
        <MainHeader {...this.props} backButton customStyle={{backgroundColor: STYLES.PRIMARY_BLUE}}/>
        <AnimatedHeading
          containerCustomStyles={{backgroundColor: STYLES.PRIMARY_BLUE}}
          ref={(heading) => {
            this.heading = heading;
          }}
          text={'Personal Info'}/>

        <Message/>

        <Content
          bounces={false}
          style={KycStyles.content}
          onScroll={this.onScroll}>
          <View>
            <Form>
              <PrimaryInput labelText={'First Name'} keyboardType={KEYBOARD_TYPE.DEFAULT} value={firstName}
                            onChange={(text) => this.setState({firstName: text})}/>
              <PrimaryInput labelText={'Last Name'} keyboardType={KEYBOARD_TYPE.DEFAULT} value={lastName}
                            onChange={(text) => this.setState({lastName: text})}/>
              <PrimaryInput labelText={'Middle Name'} keyboardType={KEYBOARD_TYPE.DEFAULT} value={middleName}
                            onChange={(text) => this.setState({middleName: text})}/>
              <PrimaryInput labelText={'Date of Birth'} keyboardType={KEYBOARD_TYPE.DEFAULT} value={dateOfBirth}
                            onChange={(text) => this.setState({dateOfBirth: text})}/>
              <PrimaryInput labelText={'Gender'} keyboardType={KEYBOARD_TYPE.DEFAULT} value={gender}
                            onChange={(text) => this.setState({gender: text})}/>
              <PrimaryInput labelText={'Phone Number'} placeholder={'+0000000000'}
                            keyboardType={KEYBOARD_TYPE.PHONE} value={phoneNumber}
                            onChange={(text) => this.setState({phoneNumber: text})}/>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}

export default PersonalInfoScreen;
