import React, {Component} from 'react';
import {Body, Button, Header, Icon, Left, List, ListItem, Text, Title, View} from "native-base";
import PropTypes from "prop-types";
import {Modal, TouchableOpacity, TextInput} from "react-native";
import {countries} from "country-data";

import SelectCountryStyles from "./styles";


class SelectCountryModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    animation: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    modalTitle: PropTypes.string
  };

  static defaultProps = {
    visible: false,
    animation: 'slide',
    modalTitle: 'Select Country'
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
    const countryList = countries.all.filter(c => c.status === 'assigned');

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

  filterCountries = (text) => {
    const {allCountries} = this.state;
    this.setState({
      filteredCountries: allCountries.filter(c => c.name.toLowerCase().includes(text.toLowerCase())),
    });
  }

  render() {
    const {visible, animation, onClose, modalTitle} = this.props;
    const {filteredCountries} = this.state;

    return (
      <Modal
        animationType={animation}
        visible={visible}
        onRequestClose={() => onClose(null)}
      >
        <Header style={[SelectCountryStyles.header]}>
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
          />
        </View>

        <View>
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
                    <Text style={SelectCountryStyles.coinTitle}>{country.name}</Text>
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
