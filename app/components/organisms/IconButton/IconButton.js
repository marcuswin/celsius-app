import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';

import testUtil from "../../../utils/test-util";

import IconButtonStyle from "./IconButton.styles";
import Icon from '../../atoms/Icon/Icon';
import CelText from '../../atoms/CelText/CelText';
import STYLES from '../../../constants/STYLES';
import stylesUtil from '../../../utils/styles-util';

class IconButton extends Component {

  static propTypes = {
    icon: PropTypes.string,
    margin: PropTypes.string,
    right: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    hideIconRight: PropTypes.bool,
    onPress: PropTypes.func
  };
  static defaultProps = {
    margin: '20 0 20 0',
    hideIconRight: false
  }

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };

    // binders
  }

  // lifecycle methods
  // event hanlders
  // rendering methods
  render() {
    const { children, icon, margin, onPress, hideIconRight, right } = this.props;
    const style = IconButtonStyle()
    return (
      <TouchableOpacity style={[style.container, { ...stylesUtil.getMargins(margin) }]} onPress={onPress}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {!!icon && <Icon fill={STYLES.COLORS.DARK_GRAY} name={icon} width="25" />}
          <CelText type="H4" style={{ marginLeft: icon ? 15 : 0 }}>{children}</CelText>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {!!right && (
            <View style={{ marginRight: 10 }}>
              {typeof right === 'string' ? (
                <CelText type='H4' color={STYLES.COLORS.DARK_GRAY_OPACITY}>{right}</CelText>
              ) : right}
            </View>
          )}
          {!hideIconRight && <Icon name='IconChevronRight' width='10' fill={STYLES.COLORS.DARK_GRAY_OPACITY} />}
        </View>
      </TouchableOpacity>
    );
  }
}

export default testUtil.hookComponent(IconButton);
