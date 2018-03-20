import React, { Component } from 'react';
import { Text } from "native-base";
import PropTypes from "prop-types";
import { TouchableOpacity, Image, View } from "react-native";

import PrimaryButtonStyles from './styles';
import Icon from "../../Icons/Icon";
import {STYLES} from "../../../config/constants/style";

class PrimaryButton extends Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    customStyles: PropTypes.instanceOf(Object),
    iconRight: PropTypes.bool,
    customTitleStyles: PropTypes.instanceOf(Object),
    fill: PropTypes.string,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    iconRight: true,
    fill: STYLES.PRIMARY_BLUE,
    disabled: false
  };

  renderIconRight = fill => {
    if (this.props.iconRight) {
      return <Icon name='IconArrowRight' height='25' width='38' viewBox="0 0 26 26" fill={fill}
                   style={{marginLeft: 20, opacity: 0.5}}/>
    }
  };

  render() {
    const {
      onPress,
      title,
      customStyles,
      customTitleStyles,
      fill,
      disabled,
      loading
    } = this.props;

    return (
      <TouchableOpacity style={[PrimaryButtonStyles.button, customStyles, disabled ? PrimaryButtonStyles.disabledStyles : {}]} disabled={disabled} onPress={onPress} pointerEvents={ loading ? 'none' : 'auto' }>
        { loading ? (
          <Image source={require('../../../../assets/images/icons/animated-spinner.gif')} style={PrimaryButtonStyles.loader} />
        ) : (
          <View style={PrimaryButtonStyles.btnContent}>
            <Text style={[PrimaryButtonStyles.title, customTitleStyles, disabled ? PrimaryButtonStyles.disabledTextStyles : {}]}>
              {title}
            </Text>
            {this.renderIconRight(disabled ? '#ffffff' : fill)}
          </View>
        )}
      </TouchableOpacity>
    )
  }
}

export { PrimaryButton };
