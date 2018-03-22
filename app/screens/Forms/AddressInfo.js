import React, {Component} from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Container, Content, Form, View} from 'native-base';
import {bindActionCreators} from 'redux';

import {MainHeader} from '../../components/Headers/MainHeader/MainHeader';
import {AnimatedHeading} from '../../components/Headings/AnimatedHeading/AnimatedHeading';
import {Message} from '../../components/Message/Message';
import Styles from "./styles";
import * as actions from "../../redux/actions";
import {STYLES} from "../../config/constants/style";
import PrimaryInput from "../../components/Inputs/PrimaryInput/PrimaryInput";
import {KEYBOARD_TYPE} from "../../config/constants/common";
import {PrimaryButton} from "../../components/Buttons/Button/Button";
import SelectCountryModal from "../../components/Modals/SelectCountryModal/SelectCountryModal";

@connect(
  state => ({
    nav: state.nav,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class AddressInfoScreen extends Component {
  constructor() {
    super();

    this.state = {
      country: '',
      state: '',
      city: '',
      zip: '',
      streetAndNumber: '',
      modalVisible: false,
    };
  }

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  onSubmit = () => {
    console.log(this.state)
  };

  closeModal = (data) => {
    this.setState({
      modalVisible: false,
      country: data || this.state.country,
    });
  };

  render() {
    const {
      country,
      state,
      city,
      zip,
      modalVisible,
      streetAndNumber,
      isLoading
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
          text={'Address Info'}/>

        <Message/>

        <Content
          bounces={false}
          style={Styles.content}
          onScroll={this.onScroll}>
          <View>
            <SelectCountryModal
              visible={modalVisible}
              modalTitle={'Country'}
              onClose={(countryName) => this.closeModal(countryName)}/>

            <Form>
              <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
                <PrimaryInput
                  clickable
                  onPress={() => this.setState({modalVisible: true})}
                  labelText={'Country'}
                  keyboardType={KEYBOARD_TYPE.DEFAULT}
                  value={country}/>
              </TouchableOpacity>

              {
                this.state.country === 'United States' ?
                  <PrimaryInput
                    labelText={'State'}
                    keyboardType={KEYBOARD_TYPE.DEFAULT}
                    value={state}
                    autoCapitalize={'words'}
                    onChange={(text) => this.setState({state: text})}/>
                  : null
              }

              <PrimaryInput
                labelText={'City'}
                keyboardType={KEYBOARD_TYPE.DEFAULT}
                value={city}
                autoCapitalize={'words'}
                onChange={(text) => this.setState({city: text})}/>

              <PrimaryInput
                labelText={'ZIP'}
                keyboardType={KEYBOARD_TYPE.NUMERIC}
                value={zip}
                autoCapitalize={'words'}
                onChange={(text) => this.setState({zip: text})}/>

              <PrimaryInput
                labelText={'Street and Number'}
                keyboardType={KEYBOARD_TYPE.DEFAULT}
                value={streetAndNumber}
                autoCapitalize={'words'}
                onChange={(text) => this.setState({streetAndNumber: text})}/>

              <View style={Styles.buttonWrapper}>
                <PrimaryButton
                  loading={isLoading}
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

export default AddressInfoScreen;
