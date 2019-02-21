import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';

import testUtil from "../../../utils/test-util";

import ContactListStyle from "./ContactList.styles";
import ContactRow from '../../atoms/ContactRow/ContactRow';

class ContactList extends Component {

  static propTypes = {
    contacts: PropTypes.instanceOf(Array).isRequired
  };

  render() {
    const { contacts, onContactPress } = this.props;
    const style = ContactListStyle();

    return (
      <ScrollView style={style.container} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
        <View>
          {contacts.map(contact => <ContactRow key={contact.id} contact={contact} onPress={() => onContactPress(contact)}/>)}
        </View>
      </ScrollView>
    );
  }
}

export default testUtil.hookComponent(ContactList);
