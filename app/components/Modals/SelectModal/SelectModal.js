import React, { Component } from 'react';
import { Body, Button, Header, Icon, Left, List, ListItem, Right, Text, Title, View } from "native-base";
import PropTypes from "prop-types";
import { Modal, TouchableOpacity } from "react-native";

import SelectModalStyles from "./styles";

class SelectModal extends Component {

  static propTypes = {
    items: PropTypes.instanceOf(Array).isRequired,
    visible: PropTypes.bool,
    animation: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    customHeaderStyle: PropTypes.instanceOf(Object)
  };

  static defaultProps = {
    visible: false,
    animation: 'slide',
    customHeaderStyle: {}
  };

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { visible, animation, onClose, items, customHeaderStyle } = this.props;
    return (
      <Modal animationType={animation}
             visible={visible}
             onRequestClose={() => onClose(null)}
      >
        <Header style={[SelectModalStyles.header, customHeaderStyle]}>
          <Left>
            <Button title='Back' transparent onPress={() => onClose(null)}>
              <Icon style={SelectModalStyles.backArrow} name='arrow-back'/>
            </Button>
          </Left>
          <Body>
          <Title style={SelectModalStyles.headerTitle}>Select Coin</Title>
          </Body>
          <Right/>
        </Header>

        <View style={SelectModalStyles.modal}>
          <List
            dataArray={items}
            renderRow={ (item) =>
              <ListItem avatar>
                <Body>
                <TouchableOpacity onPress={() => onClose(item)}>
                  <Text style={SelectModalStyles.coinTitle}>{item.label}</Text>
                </TouchableOpacity>
                </Body>
              </ListItem>
            }
          />
        </View>
      </Modal>
    );
  }
}

export default SelectModal;
