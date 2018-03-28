import React, {Component} from 'react';
import {Platform, StatusBar, TouchableOpacity} from 'react-native';
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
import SelectCountryModal from "../../components/Modals/SelectCountryModal/SelectCountryModal";

@connect(
  state => ({
    nav: state.nav,
    addressInfo: state.users.addressInfo
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class AddressInfoScreen extends Component {
  constructor(props) {
    super();

    this.state = {
      country: props.addressInfo.country,
      state: props.addressInfo.state,
      city: props.addressInfo.city,
      zip: props.addressInfo.zip,
      street: props.addressInfo.street,
      buildingNumber: props.addressInfo.buildingNumber,
      isDefault: props.addressInfo.isDefault,
      modalVisible: false,
      isLoading: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentWillReceiveProps = (nextProps) => {
    const {addressInfo} = this.props;

    if (!_.isEqual(addressInfo, nextProps.addressInfo)) {
      this.setState({isLoading: false});
    }
  };

  onScroll = event => {
    this.heading.animateHeading(event);
  };

  onSubmit = () => {
    const {createUserAddressInfo, showMessage} = this.props;
    const {
      country,
      state,
      city,
      zip,
      street,
      buildingNumber,
      isDefault,
    } = this.state;

    const error = this.validateForm();

    if (!error) {
      this.setState({isLoading: true});

      createUserAddressInfo({
        country,
        state,
        city,
        zip,
        street,
        buildingNumber,
        isDefault
      });
    } else {
      showMessage('error', error);
    }

  };

  validateForm = () => {
    const {
      country,
      city,
      zip,
      street,
      buildingNumber,
    } = this.state;

    if (!country) return 'Country is required!';
    if (!city) return 'City is required!';
    if (!zip) return 'Zip number is required!';
    if (!street) return 'Street name is required!';
    if (!buildingNumber) return 'Building number is required!';
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
      street,
      buildingNumber,
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
          text={'Address Info'}/>

        <Message/>

        <Content
          bounces={false}
          style={Styles.content}
          onScroll={this.onScroll}>
          <View pointerEvents={isLoading ? 'none' : null} style={isLoading ? Styles.disabledForm : null}>
            <SelectCountryModal
              visible={modalVisible}
              modalTitle={'Country'}
              onClose={(countryName) => this.closeModal(countryName)}/>

            <Form>
              <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
                <PrimaryInput
                  clickable
                  onPress={() => this.setState({modalVisible: true})}
                  labelText={'Country *'}
                  keyboardType={KEYBOARD_TYPE.DEFAULT}
                  value={country}/>
              </TouchableOpacity>

              {
                this.state.country === 'United States' ?
                  <PrimaryInput
                    labelText={'State'}
                    keyboardType={KEYBOARD_TYPE.DEFAULT}
                    value={state}
                    autoCapitalize={'characters'}
                    onChange={(text) => this.setState({state: text})}/>
                  : null
              }

              <PrimaryInput
                labelText={'City *'}
                keyboardType={KEYBOARD_TYPE.DEFAULT}
                value={city}
                autoCapitalize={'words'}
                onChange={(text) => this.setState({city: text})}/>

              <PrimaryInput
                labelText={'ZIP *'}
                keyboardType={KEYBOARD_TYPE.NUMERIC}
                value={zip}
                autoCapitalize={'words'}
                onChange={(text) => this.setState({zip: text})}/>

              <PrimaryInput
                labelText={'Street *'}
                keyboardType={KEYBOARD_TYPE.DEFAULT}
                value={street}
                autoCapitalize={'words'}
                onChange={(text) => this.setState({street: text})}/>

              <PrimaryInput
                labelText={'Building number *'}
                keyboardType={KEYBOARD_TYPE.DEFAULT}
                value={buildingNumber}
                autoCapitalize={'words'}
                onChange={(text) => this.setState({buildingNumber: text})}/>

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

export default AddressInfoScreen;
