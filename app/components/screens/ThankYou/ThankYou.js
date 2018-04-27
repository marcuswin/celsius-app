import React, {Component} from 'react';
import {StatusBar, Image} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Text, View} from 'native-base';
import {bindActionCreators} from 'redux';
import * as _ from 'lodash';

import ThankYouStyle from './ThankYou.styles';
import * as actions from '../../../redux/actions';
import {FONT_SCALE, GLOBAL_STYLE_DEFINITIONS, STYLES} from '../../../config/constants/style';
import {PrimaryButton} from '../../atoms/Buttons/Button/Button';
import {MainHeader} from '../../molecules/MainHeader/MainHeader';

@connect(
  state => ({
    nav: state.nav,
    loanRequest: state.loanRequests.loanRequest,
    loanStatus: state.loanRequests.loanStatus,
    user: state.users.user,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class ThankYouScreen extends Component {
  constructor() {
    super();

    this.state = {
      status: 'Loading...',
      address: 'Loading...',
      requestNumber: 0,
      amount: 0
    };
  }

  componentWillMount() {
    const {statusLoanRequest} = this.props;
    statusLoanRequest();
  }

  componentWillReceiveProps = (nextProps) => {
    const {loanStatus} = this.props;

    if (!_.isEqual(loanStatus, nextProps.loanStatus)) {
      this.setState({
        status: nextProps.loanStatus.status,
        address: nextProps.loanStatus.address,
        requestNumber: nextProps.loanStatus.order,
        amount: nextProps.loanStatus.amount,
      })
    }
  };

  ordinalSuffixOf = (number) => {
    const j = number % 10;
    const k = number % 100;

    if (j === 1 && k !== 11) {
      return `${number  }st`;
    }
    if (j === 2 && k !== 12) {
      return `${number  }nd`;
    }
    if (j === 3 && k !== 13) {
      return `${number  }rd`;
    }
    return `${number  }th`;
  };

  render() {
    const {status, requestNumber} = this.state;
    const {navigateTo} = this.props;

    let statusColor = 'yellow';
    let statusCopy = '';

    if (status === 'in-kyc') {
      statusColor = '#E1D430';
      statusCopy = 'In review';
    } else if (status === 'kyc-done') {
      statusColor = '#69e159';
      statusCopy = 'Complete';
    } else {
      statusColor = '#d8a148';
      statusCopy = 'Need more details';
    }

    return (
      <Container>
        <StatusBar barStyle="dark-content"/>
        <MainHeader
          {...this.props}
          customStyle={{backgroundColor: STYLES.PRIMARY_BLUE}}
          cancelBtn
          onCancel={() => navigateTo('Home', true)}/>
        <Content bounces={false} style={ThankYouStyle.content}>

          <View style={[ThankYouStyle.heroImageWrapper, GLOBAL_STYLE_DEFINITIONS.centeredColumn]}>
            <Image source={require('../../../../assets/images/icons/celsius-spinner.gif')} style={[ThankYouStyle.heroImage]}/>
          </View>

          <Text style={ThankYouStyle.heading}>Thank you</Text>
          <Text style={ThankYouStyle.welcomeText}>You’re the {this.ordinalSuffixOf(requestNumber)} person interested in
            taking a loan.</Text>

          <View style={[GLOBAL_STYLE_DEFINITIONS.centeredColumn, { marginTop: 15 }]}>
            <Text style={ThankYouStyle.descriptionText}>
              We are processing your profile information. It may take <Text style={[{color: 'white'}, GLOBAL_STYLE_DEFINITIONS.boldText]}>48 hours</Text> to complete. We will notify you once your profile is reviewed.
            </Text>
          </View>

          <View style={ThankYouStyle.statusSection}>
            <View style={[GLOBAL_STYLE_DEFINITIONS.centeredColumn, { marginTop: 15 }]}>
              <Text style={ThankYouStyle.verificationText}>
                Profile verification status:
              </Text>
            </View>

            <View style={[GLOBAL_STYLE_DEFINITIONS.centeredColumn]}>
              <View style={{flexDirection: 'row'}}>
                <View style={{justifyContent: 'center'}}>
                  <View style={{width: 14, height: 14, borderRadius: 14, backgroundColor: statusColor, marginRight: 15}}/>
                </View>
                <Text style={{color: statusColor, fontFamily: 'agile-medium', fontSize: 18}}>{ statusCopy }</Text>
              </View>
            </View>

            <View style={ThankYouStyle.cancelWrapper}>
              <PrimaryButton
                iconRight={false}
                customStyles={{backgroundColor: 'transparent', borderWidth: 2, borderColor: '#fff'}}
                customTitleStyles={{color: "#fff", fontSize: FONT_SCALE * 18}}
                onPress={() => navigateTo('Home')}
                title="Cancel loan request"/>
            </View>
          </View>

        </Content>
      </Container>
    );
  }
}

export default ThankYouScreen;
