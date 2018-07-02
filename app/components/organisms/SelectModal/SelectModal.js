import React, { Component } from 'react';
import { Body, Button, Header, Icon, Left, List, ListItem, Right, Text, View } from "native-base";
import PropTypes from "prop-types";
import { Modal, TouchableOpacity } from "react-native";

import SelectModalStyles from "./SelectModal.styles";

class SelectModal extends Component {

  static propTypes = {
    items: PropTypes.instanceOf(Array).isRequired,
    visible: PropTypes.bool,
    animation: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    customHeaderStyle: PropTypes.instanceOf(Object),
    modalTitle: PropTypes.string.isRequired
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
    const { visible, animation, onClose, items, customHeaderStyle, modalTitle } = this.props;
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

          <Text style={SelectModalStyles.headerTitle}>{modalTitle}</Text>

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
