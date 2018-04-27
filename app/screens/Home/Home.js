import React, {Component} from 'react';
import {Image, StatusBar, Linking} from 'react-native';
import {connect} from 'react-redux';
import {Button, Container, Content, Text, View} from 'native-base';
import {bindActionCreators} from "redux";

import {MainHeader} from '../../components/Headers/MainHeader/MainHeader';
import {AnimatedHeading} from '../../components/Headings/AnimatedHeading/AnimatedHeading';
import HomeStyle from "./Home.styles";
import {PrimaryButton} from "../../components/Buttons/Button/Button";
import * as actions from "../../redux/actions";
import {STYLES} from "../../config/constants/style";

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    loanRequest: state.loanRequests.loanRequest,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class HomeScreen extends Component {
  constructor(props) {
    super();

    this.state = {
      headingTitle: `Hola, ${ props.user ? props.user.first_name : 'Guest' }!`
    };
  }

  componentDidMount() {
    const { getLoanRequest } = this.props;
    getLoanRequest();
  }

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  handleEarnInterest = async () => {
    const {navigateTo, createInterestRequest} = this.props;
    createInterestRequest();
    navigateTo('EarnInterest');
  };

  render() {
    const {navigateTo, loanRequest} = this.props;

    return (
      <Container>
        <StatusBar barStyle="dark-content"/>
        <MainHeader {...this.props} />
        <AnimatedHeading
          ref={(heading) => {
            this.heading = heading;
          }}
          text={this.state.headingTitle}/>
        <Content bounces={false} style={HomeStyle.content} onScroll={this.onScroll}>
          <View style={{paddingTop: 30}}>
            <Text style={HomeStyle.subHeading}>
              Thanks for joining the Celsius community!
            </Text>
            <Text style={HomeStyle.description}>
              We’re still working on the full release of the Celsius wallet - click on the button below to get an idea
              of how large a loan you can get based on your crypto holdings.
            </Text>
          </View>
          <View>
            <Image style={HomeStyle.macorImage} source={require('../../../assets/images/machor.png')}/>
            <View style={HomeStyle.buttonWrapper}>
              { loanRequest && loanRequest.id ? (
                <PrimaryButton
                  iconRight={false}
                  customStyles={{backgroundColor: STYLES.PRIMARY_BLUE}}
                  customTitleStyles={{color: 'white'}} title={'Preview loan'}
                  onPress={() => navigateTo('LoanPreview')}
                />
              ) : (
                <PrimaryButton
                  iconRight={false}
                  customStyles={{backgroundColor: STYLES.PRIMARY_BLUE}}
                  customTitleStyles={{color: 'white'}} title={'Calculate loan'}
                  onPress={() => navigateTo('Calculator')}
                />
              )}
              <PrimaryButton
                iconRight={false}
                customStyles={{backgroundColor: STYLES.PRIMARY_GREEN, marginTop: 20}}
                customTitleStyles={{color: 'white'}} title={'Earn interest'}
                onPress={this.handleEarnInterest}/>
              <PrimaryButton
                iconRight={false}
                customStyles={{backgroundColor: '#A866AA', marginTop: 20}}
                customTitleStyles={{color: 'white'}} title={'See the roadmap'}
                onPress={() => navigateTo('ComingSoon')}/>
            </View>
          </View>
          <View>
            <Button
              style={HomeStyle.linkButton}
              block
              title={'celsius.network'}
              transparent
              onPress={() => Linking.openURL('https://celsius.network/')}
            >
              <Text style={HomeStyle.linkButtonText}>celsius.network</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default HomeScreen;
