import React, {Component} from 'react';
import {Body, Button, Header, Icon, Left, List, ListItem, Text, Title, View} from "native-base";
import PropTypes from "prop-types";
import {Modal, TouchableOpacity, TextInput} from "react-native";
import {countries} from "country-data";

import SelectCountryStyles from "./SelectCountryModal.styles";


class SelectCountryModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    animation: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    modalTitle: PropTypes.string,
    withPhones: PropTypes.bool,
  };

  static defaultProps = {
    visible: false,
    animation: 'slide',
    modalTitle: 'Select Country',
    withPhones: false,
  };

  constructor() {
    super();

    this.state = {
      allCountries: [],
      filteredCountries: [],
    };

    this.filterCountries = this.filterCountries.bind(this);
  }

  componentWillMount = () => {
    const countryList = this.getAllCountries(this.props.withPhones);

    countryList.sort((a, b) => {
      if (a.name === 'United States') return -1;
      if (b.name === 'United States') return 1;

      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;

      return 0;
    });

    this.setState({
      allCountries: countryList,
      filteredCountries: countryList,
    })
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible) {
      this.componentWillMount();
    }
  }

  getAllCountries = (withPhones) => {
    let allCountries;
    if (withPhones) {
      allCountries = countries.all.filter(c => c.status === 'assigned' && c.countryCallingCodes.length);
    } else {
      allCountries = countries.all.filter(c => c.status === 'assigned');
    }
    return allCountries;
  }

  filterCountries = (text) => {
    const {allCountries} = this.state;
    this.setState({
      filteredCountries: allCountries.filter(c => c.name.toLowerCase().includes(text.toLowerCase())),
    });
  }

  render() {
    const {visible, animation, onClose, modalTitle, withPhones} = this.props;
    const {filteredCountries} = this.state;

    return (
      <Modal
        animationType={animation}
        visible={visible}
        onRequestClose={() => onClose(null)}
      >
        <Header style={[SelectCountryStyles.header]} iosBarStyle="light-content">
          <Left>
            <Button title='Back' transparent onPress={() => onClose(null)}>
              <Icon style={SelectCountryStyles.backArrow} name='arrow-back'/>
            </Button>
          </Left>
          <Body>
            <Title style={SelectCountryStyles.headerTitle}>{modalTitle}</Title>
          </Body>
        </Header>

        <View style={SelectCountryStyles.searchBox} >
          <TextInput
            style={SelectCountryStyles.search}
            onChangeText={this.filterCountries}
            placeholder={'eg. Japan'}
            placeholderTextColor={'#3D4853'}
            underlineColorAndroid={'rgba(0,0,0,0)'}
          />
        </View>

        <View style={SelectCountryStyles.content}>
          {filteredCountries.length ? (
            <List
              dataArray={filteredCountries}
              renderRow={(country) =>
                <ListItem avatar style={{minWidth: 280}}>
                  <Left>
                    <Text>{country.emoji}</Text>
                  </Left>
                  <Body>
                  <TouchableOpacity onPress={() => onClose(country)}>
                    <Text style={SelectCountryStyles.coinTitle}>
                      {country.name}
                      { withPhones && country.countryCallingCodes ? ` (${country.countryCallingCodes[0]})` : '' }
                    </Text>
                  </TouchableOpacity>
                  </Body>
                </ListItem>
              }
            />
          ) : (
            <List
              dataArray={['No countries match your search.']}
              renderRow={(text) =>
                <ListItem avatar style={{minWidth: 280}}>
                  <Text style={SelectCountryStyles.coinTitle}>{text}</Text>
                </ListItem>
              }
            />
          )}
        </View>
      </Modal>
    );
  }
}

export default SelectCountryModal;
