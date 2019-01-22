import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import FabMenuStyle from "./FabMenu.styles";
import Fab from '../../molecules/Fab/Fab';
import CircleButton from '../../atoms/CircleButton/CircleButton';

@connect(
  state => ({
    style: FabMenuStyle(state.ui.theme),
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class FabMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  getScreenOpenIcon = () => {
    const { style } = this.props
    const screen = "home"
    switch (screen) {
      case 'home':
        return <Image
          source={require('../../../../assets/images/icons/celsius_symbol_white.png')}
          style={style.logo}
        />

      default:
        return <Image
          source={require('../../../../assets/images/icons/celsius_symbol_white.png')}
          style={style.logo}
        />
    }
  }

  toggleMenu = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { style } = this.props
    const { open } = this.state;
    return (
      <View style={style.container}>
        {open &&
          <View style={style.menuContainer}>
            <View style={style.menuItemsContainer}>
              <CircleButton style={style.fabButtonStyle} onPress={this.toggleMenu}>
                <Image
                  source={require('../../../../assets/images/icons/celsius_symbol_white.png')}
                  style={style.logo}
                />
              </CircleButton>
              <CircleButton style={style.fabButtonStyle} onPress={this.toggleMenu}>
                <Image
                  source={require('../../../../assets/images/icons/celsius_symbol_white.png')}
                  style={style.logo}
                />
              </CircleButton>
              <CircleButton style={style.fabButtonStyle} onPress={this.toggleMenu}>
                <Image
                  source={require('../../../../assets/images/icons/celsius_symbol_white.png')}
                  style={style.logo}
                />
              </CircleButton>
            </View>
          </View>
        }
        <Fab onPress={this.toggleMenu}>
          {open ?
            <Text style={{ color: "#fff", fontSize: 25, alignSelf: 'center' }}>X</Text> :
            this.getScreenOpenIcon()
          }
        </Fab>
      </View>
    );
  }
}

export default testUtil.hookComponent(FabMenu);
