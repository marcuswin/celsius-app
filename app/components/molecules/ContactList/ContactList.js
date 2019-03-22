import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';

import testUtil from "../../../utils/test-util";

import ContactListStyle from "./ContactList.styles";
import ContactRow from '../../atoms/ContactRow/ContactRow';
import Separator from '../../atoms/Separator/Separator';

class ContactList extends Component {

  static propTypes = {
    contacts: PropTypes.shape({
      friendsWithApp: PropTypes.arrayOf(
        PropTypes.shape({
          email: PropTypes.string,
          id: PropTypes.string,
          name: PropTypes.string,
          network: PropTypes.string,
          phone_number: PropTypes.string,
          profile_image: PropTypes.string,
        })),
      friendsWithoutApp: PropTypes.arrayOf(
        PropTypes.shape({
          email: PropTypes.string,
          id: PropTypes.string,
          name: PropTypes.string,
          network: PropTypes.string,
          phone_number: PropTypes.string,
          profile_image: PropTypes.string,
        })),
    }).isRequired
  };

  renderSeparator = () => (
    <View style={{marginTop: 25}}>
      <Separator />
    </View>
  );

  renderContactsWithApp = () => {
    const { contacts, onContactPress } = this.props;

    return (
      contacts.friendsWithApp.map(contact => <ContactRow key={contact.id} contact={contact} hasApp onPress={() => onContactPress(contact)}/>)
    )
  };

  renderContactsWithoutApp = () => {
    const { contacts } = this.props;

    return (
      <View style={{width: '100%'}}>
        {contacts.friendsWithApp && contacts.friendsWithApp.length ? this.renderSeparator() : null}
        {contacts.friendsWithoutApp.map(contact => <ContactRow key={contact.id} contact={contact}/>)}
      </View>
    )
  };

  render() {
    const { contacts } = this.props;
    const style = ContactListStyle();
    const RenderContactsWithApp = this.renderContactsWithApp;
    const RenderContactsWithoutApp = this.renderContactsWithoutApp;

    return (
      <ScrollView style={style.container} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
        <View>
          {contacts.friendsWithApp && contacts.friendsWithApp.length ? <RenderContactsWithApp/> : null}
          {contacts.friendsWithoutApp && contacts.friendsWithoutApp.length ? <RenderContactsWithoutApp /> : null}
        </View>
      </ScrollView>
    );
  }
}

export default testUtil.hookComponent(ContactList);
