import React, { Component } from "react";
import { Keyboard, View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import stylesUtil from '../../../utils/styles-util';
import * as actions from "../../../redux/actions";

const styles = {
  // marginTop: 30,
}

const disabledStyles = {
  opacity: 0.5,
}

@connect(
  state => ({
    keyboardHeight: state.ui.keyboardHeight,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class CelForm extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    margin: PropTypes.string, // example '0 0 0 0'
    customStyles: PropTypes.instanceOf(Object),
  };

  static defaultProps = {
    disabled: false,
    margin: '0 0 0 0',
  };

  constructor(props) {
    super(props);

    this.state = {
      onScreen: props.activeScreen,
      keyboardEventsAttached: true,
    }

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  // lifecycle methods
  componentWillReceiveProps(nextProps) {
    const { clearInputLayouts } = this.props;
    const { onScreen, keyboardEventsAttached } = this.state;

    if (nextProps.activeScreen === onScreen && !keyboardEventsAttached) {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    if (nextProps.activeScreen !== onScreen && keyboardEventsAttached) {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
      clearInputLayouts();
    }
  }

  // event hanlders

  keyboardDidShow = (e) => {
    const { setKeyboardHeight } = this.props;
    setKeyboardHeight(e.endCoordinates.height);
    return false;
  }

  keyboardDidHide = () => {
    const { setKeyboardHeight } = this.props;
    setKeyboardHeight(0);
    return false;
  }

  // rendering methods
  render() {
    const { disabled, customStyles, margin, children } = this.props;

    const formStyles = [styles];
    if (disabled) formStyles.push(disabledStyles);
    if (customStyles) formStyles.push(customStyles);
    if (margin) formStyles.push(stylesUtil.getMargins(margin));
    return (
      <View
        style={formStyles}
        pointerEvents={ disabled ? 'none' : null }
        >
        { children }
      </View>
    )
  }
}

export default CelForm;
