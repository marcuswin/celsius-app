import React, {Component} from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Text, View} from 'native-base';
import {bindActionCreators} from "redux";

import ThankYouStyle from "./styles";
import * as actions from "../../redux/actions";
import {FONT_SCALE, GLOBAL_STYLE_DEFINITIONS, STYLES} from "../../config/constants/style";
import Icon from "../../components/Icons/Icon";
import {PrimaryButton} from "../../components/Buttons/Button/Button";
import {MainHeader} from "../../components/Headers/MainHeader/MainHeader";

@connect(
  state => ({
    nav: state.nav,
    loanRequest: state.loanRequests.loanRequest,
    user: state.users.user,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class ThankYouScreen extends Component {
  constructor() {
    super();

    this.state = {
      status: 'Reject',
      address: '0xbb9bc244d798123fde783fcc1c72d3bb8c189413',
      requestNumber: 1,
      amount: 1
    };
  }

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
    const {status, address, requestNumber, amount} = this.state;
    const {navigateTo} = this.props;

    let statusColor = 'yellow';

    if (status === 'In review') {
      statusColor = '#E1D430';
    } else if (status === 'Completed') {
      statusColor = '#69e159';
    } else {
      statusColor = '#e1332d'
    }

    return (
      <Container>
        <StatusBar barStyle="dark-content"/>
        <MainHeader
          {...this.props}
          customStyle={{backgroundColor: STYLES.PRIMARY_BLUE}}
          cancelBtn
          onCancel={() => navigateTo('Home')}/>
        <Content bounces={false} style={ThankYouStyle.content}>
          <Text style={ThankYouStyle.heading}>Thank you</Text>
          <Text style={ThankYouStyle.welcomeText}>You’re the {this.ordinalSuffixOf(requestNumber)} person interested in taking a loan.</Text>

          <View style={{paddingTop: 13}}>
            <Text style={ThankYouStyle.description}>
              Please transfer
              <Text style={[GLOBAL_STYLE_DEFINITIONS.boldText, {color: '#fff'}]}> {amount} CEL {amount > 1 ? 'tokens' : 'token'} </Text>
              to the address below in order for your loan application to be accepted and reviewed.
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigateTo('Home', true)}>
            <View style={[GLOBAL_STYLE_DEFINITIONS.centeredColumn, {paddingTop: 24}]}>
              <View style={ThankYouStyle.imageWrapper}>
                <View style={ThankYouStyle.celsiusLogo}>
                  <Icon name='CelsiusLogoV2' width='46' height='46' viewBox="0 0 49 49" fill='#FFFFFF'/>
                </View>

              </View>
            </View>
          </TouchableOpacity>

          <View style={[GLOBAL_STYLE_DEFINITIONS.centeredColumn, {paddingTop: 20, paddingBottom: 20}]}>
            <View style={{
              width: 195,
              borderRadius: 8,
              backgroundColor: 'rgba(255, 255, 255, .05)',
              justifyContent: 'center',
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 6,
              paddingBottom: 6
            }}>
              <Text style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 16,
                fontFamily: 'agile-light'
              }}>{address}</Text>
            </View>
          </View>

          <View style={[GLOBAL_STYLE_DEFINITIONS.centeredColumn]}>
            <Text style={{fontSize: 18, fontFamily: 'agile-light', color: '#fff', paddingBottom: 12}}>Profile
              verification status:</Text>
            <View style={[GLOBAL_STYLE_DEFINITIONS.centeredColumn]}>
              <View style={{flexDirection: 'row'}}>
                <View style={{justifyContent: 'center'}}>
                  <View style={{width: 14, height: 14, borderRadius: 14, backgroundColor: statusColor, marginRight: 15}}/>
                </View>
                <Text style={{color: statusColor, fontFamily: 'agile-medium', fontSize: 18}}>{status}</Text>
              </View>
            </View>
          </View>

          <View style={{paddingBottom: 20, paddingTop: 27}}>
            <PrimaryButton
              iconRight={false}
              customStyles={{backgroundColor: 'transparent', borderWidth: 2, borderColor: '#fff'}}
              customTitleStyles={{color: "#fff", fontSize: FONT_SCALE * 18}}
              onPress={() => navigateTo('Home')}
              title="Cancel loan request"/>
          </View>

        </Content>
      </Container>
    );
  }
}

export default ThankYouScreen;
