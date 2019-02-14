import React, { Component } from 'react';
// import { Body, Button, Header, Icon, Left, List, ListItem, Text, Title, View } from "native-base";
import PropTypes from "prop-types";
import { Modal, TouchableOpacity, TextInput } from "react-native";
import testUtil from "../../../utils/test-util";
import SelectStateStyles from "./SelectStateModal.styles";
import { STATE } from '../../../config/constants/common';


class SelectStateModal extends Component {
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
    modalTitle: 'Select State',
    withPhones: false,
  };

  constructor() {
    super();

    this.state = {
      allStates: [],
      filteredStates: [],
    };

    this.filterStates = this.filterStates.bind(this);
  }

  componentWillMount = () => {
    const stateList = STATE;

    stateList.sort((a, b) => {

      if (a.value < b.value) return -1;
      if (a.value > b.value) return 1;

      return 0;
    });

    this.setState({
      allStates: stateList,
      filteredStates: stateList,
    })
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible) {
      this.componentWillMount();
    }
  }

  filterStates = (text) => {
    const { allStates } = this.state;
    this.setState({
      filteredStates: allStates.filter(c => c.value.toLowerCase().includes(text.toLowerCase())),
    });
  }

  render() {
    const { visible, animation, onClose, modalTitle } = this.props;
    const { filteredStates } = this.state;

    return (
      <Modal
        animationType={animation}
        visible={visible}
        onRequestClose={() => onClose(null)}
      >
        <Header style={[SelectStateStyles.header]} iosBarStyle="light-content">
          <Left>
            <Button ref={testUtil.generateTestHook(this, 'SelectStateModal.state')} title='Back' transparent onPress={() => onClose(null)}>
              <Icon style={SelectStateStyles.backArrow} name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title style={SelectStateStyles.headerTitle}>{modalTitle}</Title>
          </Body>
        </Header>

        <View style={SelectStateStyles.searchBox} >
          <TextInput

            style={SelectStateStyles.search}
            onChangeText={this.filterStates}
            placeholder={'eg. Arizona'}
            placeholderTextColor={'#3D4853'}
            underlineColorAndroid={'rgba(0,0,0,0)'}
          />
        </View>

        <View style={SelectStateStyles.content}>
          {filteredStates.length ? (
            <List
              dataArray={filteredStates}
              renderRow={(state) =>
                <ListItem avatar style={{ minWidth: 280 }}>
                  <Body>
                    <TouchableOpacity ref={testUtil.generateTestHook(this, 'SelectStateModal.select')} onPress={() => onClose(state)}>
                      <Text style={SelectStateStyles.coinTitle}>
                        {state.value}
                      </Text>
                    </TouchableOpacity>
                  </Body>
                </ListItem>
              }
            />
          ) : (
              <List
                dataArray={['No states match your search.']}
                renderRow={(text) =>
                  <ListItem avatar style={{ minWidth: 280 }}>
                    <Text style={SelectStateStyles.coinTitle}>{text}</Text>
                  </ListItem>
                }
              />
            )}
        </View>
      </Modal>
    );
  }
}

export default testUtil.hookComponent(SelectStateModal);
