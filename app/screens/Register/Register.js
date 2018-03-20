import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content} from 'native-base';
import * as Animatable from 'react-native-animatable';
import {bindActionCreators} from "redux";

import {Message} from '../../components/Message/Message';
import {MainHeader} from '../../components/Headers/MainHeader/MainHeader';
import {AnimatedHeading} from '../../components/Headings/AnimatedHeading/AnimatedHeading';
import RegisterStyle from "./styles";
import API from '../../config/constants/API';
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import * as actions from "../../redux/actions";

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    error: state.api.error,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class RegisterScreen extends Component {
  constructor() {
    super();

    this.state = {
      step: 0,
      headingTitle: 'Sign up',
      backButton: true
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const {user, callsInProgress, error} = this.props;
    const {step} = this.state;

    if (step === 0 && !error &&
      callsInProgress.indexOf(API.REGISTER_USER) !== -1 && nextProps.callsInProgress.indexOf(API.REGISTER_USER) === -1 &&
      nextProps.user) {

      this.goToStep1();
    }

    if (step === 1 && user && !error &&
      callsInProgress.indexOf(API.UPDATE_USER) !== -1 && nextProps.callsInProgress.indexOf(API.UPDATE_USER) === -1 &&
      nextProps.user.first_name) {

      this.props.navigateTo('Home')
    }
  };

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  onNextStep = data => {
    const {step} = this.state;
    const {registerUser, updateUser, user, registerUserTwitter, registerUserFacebook, registerUserGoogle} = this.props;

    // when 3rd party login
    if (step === 0 && !data) {
      this.goToStep1();
    }

    // register user
    if (step === 0 && data) {
      registerUser(data);
    }

    // update user
    if (step === 1 && data && user && user.id) {
      updateUser(data);
    }

    // register twitter user
    if (step === 1 && data && user && user.twitter_id) {
      registerUserTwitter({...user, ...data});
    }

    // register facebook user
    if (step === 1 && data && user && user.facebook_id) {
      registerUserFacebook({...user, ...data});
    }

    // register google user
    if (step === 1 && data && user && user.google_id) {
      registerUserGoogle({...user, ...data});
    }
  };

  goToStep1 = () => {
    this.stepRef.fadeOut().then(() => {
      this.setState({
        step: ++this.state.step,
        headingTitle: 'Just a few more details…',
        backButton: false
      }, () => {
        this.stepRef.fadeIn();
      });
    });
  };

  renderStep1 = () => <Step1 onNextStep={(data) => this.onNextStep(data)}/>;

  renderStep2 = () => <Step2 onNextStep={(data) => this.onNextStep(data)}/>;

  render() {
    const {setHeaderHeight} = this.props;
    return (
      <Container>
        <StatusBar barStyle="dark-content"/>
        <MainHeader {...this.props} backButton={this.state.backButton}/>
        <AnimatedHeading
          setHeaderHeight={setHeaderHeight}
          ref={(heading) => {
            this.heading = heading;
          }}
          text={this.state.headingTitle}/>

        <Message/>

        <Content bounces={false} style={RegisterStyle.content} onScroll={this.onScroll}>
          <Animatable.View
            duration={1000}
            ref={(step) => {
              this.stepRef = step
            }}
            style={{opacity: 1}}
          >
            {this.state.step === 0 ? this.renderStep1() : this.renderStep2()}
          </Animatable.View>
        </Content>
      </Container>
    );
  }
}

export default RegisterScreen;
