// TODO(fj) check usage in v3

import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'native-base';

import { COLORS, GLOBAL_STYLE_DEFINITIONS as globalStyles, FONT_SCALE } from "../../../config/constants/style";
import InfoBubbleStyle from "./InfoBubble.styles";
import Icon from '../Icon/Icon';
import stylesUtil from '../../../utils/styles-util';

class InfoBubble extends Component {

  static propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    shouldClose: PropTypes.bool,
    margin: PropTypes.string,
    onPressClose: PropTypes.func
  }

  static defaultProps = {
    color: "yellow",
    margin: '0 0 25 0',
    shouldClose: false
  };

  constructor(props) {
    super(props);

    this.state = {
      showComponent: true
    };
    // binders
  }

  onClose = () => {
    this.setState({ showComponent: false });
  }

  render() {
    const { color, title, onPressClose, shouldClose, renderContent, margin } = this.props;
    const { showComponent } = this.state;

    return (showComponent ?
      <View style={[InfoBubbleStyle.infoWrapper, { backgroundColor: COLORS[color] }, stylesUtil.getMargins(margin)]}>
        {title &&
          <Text style={[InfoBubbleStyle.infoText, globalStyles.boldText, { marginBottom: 7, fontSize: FONT_SCALE * 18 }]}>{title}</Text>
        }
        {shouldClose &&
          <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10, opacity: .6 }} onPress={onPressClose || this.onClose}>
            <Icon name='xIcon' height='11' width='11' viewBox="0 0 1000 1000" fill={'white'} />
          </TouchableOpacity>
        }
        {renderContent(InfoBubbleStyle.infoText)}
      </View>
      :
      null)
  }
}

export default InfoBubble;
