import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';

import testUtil from "../../../utils/test-util";

import IconButtonStyle from "./IconButton.styles";
import Icon from '../../atoms/Icon/Icon';
import CelText from '../../atoms/CelText/CelText';
import STYLES from '../../../constants/STYLES';
import { getMargins, getPadding } from '../../../utils/styles-util';

class IconButton extends Component {

  static propTypes = {
    icon: PropTypes.string,
    margin: PropTypes.string,
    padding: PropTypes.string,
    right: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    hideIconRight: PropTypes.bool,
    onPress: PropTypes.func,
    color: PropTypes.oneOf(['white', 'blue']),
  };
  static defaultProps = {
    margin: '20 0 20 0',
    padding: '0 18 0 18',
    hideIconRight: false,
    color: "white",
  }

  constructor(props) {
    super(props);

    this.state = {
      ...this.getColors()
    };

    // binders
  }

  getColors() {
    const { color } = this.props

    if (color === 'white') {
      return {
        primary: STYLES.COLORS.WHITE,
        secondary: STYLES.COLORS.DARK_GRAY6,
      }
    }

    if (color === 'blue') {
      return {
        primary: STYLES.COLORS.CELSIUS_BLUE,
        secondary: STYLES.COLORS.WHITE,
      }
    }
  }

  renderIconButtonContent = () => {
    const { secondary } = this.state;
    const { children, icon, hideIconRight, right } = this.props;
    return ( 
      <>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {!!icon && <Icon fill={secondary} name={icon} width="25" />}
          <CelText type="H4" style={{ marginLeft: icon ? 15 : 0 }} color={secondary}>{children}</CelText>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {!!right && (
            <View>
              {typeof right === 'string' ? (
                <CelText type='H4' color={STYLES.COLORS.DARK_GRAY}>{right}</CelText>
              ) : right}
            </View>
          )}
          {!hideIconRight && <Icon name='IconChevronRight' height='12' width='7.7' fill={secondary} />}
        </View>
    </>
    )
  }

  render() {
    const { primary } = this.state
    const { margin, padding, onPress } = this.props
    const style = IconButtonStyle()
    const containerStyle = [style.container, { ...getMargins(margin), ...getPadding(padding) }, { backgroundColor: primary }]
    const IconButtonContent = this.renderIconButtonContent

    if(onPress) return (
      <TouchableOpacity style={containerStyle} onPress={onPress}>
        <IconButtonContent />
      </TouchableOpacity>
    );

    return (
      <View style={containerStyle}>
        <IconButtonContent />
      </View>
    );
    
  }
}

export default testUtil.hookComponent(IconButton);
