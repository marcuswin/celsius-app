import React, {Component} from 'react';
// import {StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {Text, View} from 'native-base';
import {bindActionCreators} from "redux";

import Calculator from '../Calculator/Calculator'
// import {MainHeader} from '../../molecules/MainHeader/MainHeader';
// import {AnimatedHeading} from '../../molecules/AnimatedHeading/AnimatedHeading';
import HomeStyle from "./Home.styles";
import * as actions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";

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
      headingTitle: `Hola, ${ props.user && props.user.first_name ? props.user.first_name : 'Guest' }!`
    };
  }

  componentDidMount() {
    const { getLoanRequest } = this.props;
    getLoanRequest();
  }

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  render() {
    const { animatedHeading } = this.state;

    return (
      <SimpleLayout
        animatedHeading={animatedHeading}
      >
        <View style={{paddingTop: 30}}>
          <Text style={HomeStyle.subHeading}>
            Tell us about your coins
          </Text>
          <Text style={HomeStyle.description}>
            Let us know which coins you currently possess. We’ll help you track their value and provide you with an idea about taking a loan and earning interest with Celsius.
          </Text>
        </View>
        <Calculator />
      </SimpleLayout>
    );
  }
}

export default HomeScreen;
