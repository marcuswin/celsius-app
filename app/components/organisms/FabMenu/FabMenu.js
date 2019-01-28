import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { BlurView } from 'expo';

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import FabMenuStyle from "./FabMenu.styles";
import Fab from '../../molecules/Fab/Fab';
import CircleButton from '../../atoms/CircleButton/CircleButton';

function getMenuItems(menu) {
  return {
    MAIN: [['Wallet', 'Borrow', 'CelPay'], ['Deposit', 'Settings', 'Support'], ['Community']],
    SUPPORT: [],
  }[menu];
}

@connect(
  state => ({
    style: FabMenuStyle(state.ui.theme),
    fabMenuOpen: state.ui.fabMenuOpen,
    theme: state.ui.theme
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class FabMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
      type: 'MAIN'
    };
  }

  componentDidMount = () => {
    this.setState({
      menuItems: getMenuItems('MAIN')
    });
  }

  componentWillReceiveProps() {
    const nextScreen = "home"
    const currScreen = "home"
    if (nextScreen !== currScreen && (nextScreen === 'support' || currScreen === 'support')) {
      const menuType = nextScreen === 'support' ? 'SUPPORT' : 'menuType'
      this.setState({
        type: menuType,
        menuItems: getMenuItems(menuType)
      });
    }
  }

  getTintColor = () => {
    const { theme } = this.props;

    return {
      'light': 'light',
      'dark': 'dark',
      'celsius': 'dark',
    }[theme]
  }

  fabAction = () => {
    const { type } = this.state;
    const { actions } = this.props;
    switch (type) {
      case 'MAIN':
        this.toggleMenu();
        break;

      case 'SUPPORT':
        actions.navigateTo('Support');
        break;

      default:
        break;
    }
  }

  toggleMenu = () => {
    const { fabMenuOpen, actions } = this.props;
    if (fabMenuOpen) {
      actions.closeFabMenu()
    } else {
      actions.openFabMenu()
    }
  }

  renderMenuRow = (menuRow) => {
    const { style } = this.props;
    return (
      <View key={menuRow} style={style.menuItemsContainer}>
        {menuRow.map(this.renderMenuItem)}
      </View>
    );
  }

  renderMenuItem = (menuItemType) => {
    const { theme, actions } = this.props;
    return <CircleButton key={menuItemType} theme={theme} onPress={() => { actions.navigateTo(menuItemType); actions.closeFabMenu() }} type="menu" text={menuItemType} icon={menuItemType} />;
  }

  render() {
    const { style, fabMenuOpen } = this.props
    const { menuItems, type } = this.state;
    const tintColor = this.getTintColor();
    if (fabMenuOpen) {
      return (
        <View style={StyleSheet.absoluteFill}>
          {fabMenuOpen &&
            <BlurView tint={tintColor} intensity={90} style={StyleSheet.absoluteFill}>
              <View style={[style.menuContainer, StyleSheet.absoluteFill]}>
                {menuItems.map(this.renderMenuRow)}
              </View>
            </BlurView>
          }
          <Fab onPress={this.fabAction} type={type} />
        </View>
      );
    }
    return (
      <View style={style.container}>
        <Fab onPress={this.fabAction} type={type} />
      </View>
    );
  }
}

export default testUtil.hookComponent(FabMenu);
