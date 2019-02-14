import React, { Component } from 'react';
import { TouchableOpacity, Platform, Clipboard, Share } from 'react-native';
import PropTypes from "prop-types";
// import { View, Text } from 'native-base';

import ShareCopyStyle from "./ShareCopy.styles";
import Icon from '../../atoms/Icon/Icon';

class ShareCopy extends Component {
  static propTypes = {
    theme: PropTypes.oneOf(["blue", "white"]),
    size: PropTypes.oneOf(["small", "large"]),
    displayValue: PropTypes.string.isRequired,
    copyShareValue: PropTypes.string,
    title: PropTypes.string,
    link: PropTypes.bool
  };

  static defaultProps = {
    theme: "white",
    displayValue: "",
    title: "",
    size: "large",
    link: false
  };

  copyLink = (link) => {
    Clipboard.setString(link);
  };

  render() {
    const { theme, displayValue, copyShareValue, title, size, link } = this.props;
    let iconColor;
    if (theme === "white") {
      iconColor = "#899099";
    } else if (theme === "blue") {
      iconColor = "rgba(255, 255, 255, 0.5)";
    }

    const displayTextStyle = link ? [ShareCopyStyle[`${theme}link`], ShareCopyStyle.link, ShareCopyStyle.linkBlue] : [ShareCopyStyle.link, ShareCopyStyle[`${theme}link`]];

    return (
      <View style={[ShareCopyStyle.box, ShareCopyStyle[`${theme}box`], ShareCopyStyle[`${size}box`]]}>
        <View style={[ShareCopyStyle.linkWrapper, ShareCopyStyle[`${theme}linkWrapper`]]}>
          <Text style={displayTextStyle}>{displayValue}</Text>
        </View>
        <View style={[ShareCopyStyle.boxButtonsWrapper, ShareCopyStyle[`${theme}boxButtonsWrapper`]]}>
          <TouchableOpacity
            onPress={() => Share.share({ message: copyShareValue || displayValue, title })}
            style={[ShareCopyStyle.buttons, ShareCopyStyle[`${theme}buttons`], ShareCopyStyle[`${size}buttons`], {
              borderBottomLeftRadius: 8
            }]}
          >
            <View style={[ShareCopyStyle.buttonTextWrapper, ShareCopyStyle[`${theme}buttonTextWrapper`]]}>
              {Platform.OS === "ios" ? (
                <Icon
                  name='ShareIcon'
                  width='20'
                  height='20'
                  fill={iconColor}
                />
              ) : null}
              <Text style={[ShareCopyStyle.buttonsText, ShareCopyStyle[`${theme}buttonsText`]]}>Share</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.copyLink(copyShareValue || displayValue)}
            style={[ShareCopyStyle.buttons, ShareCopyStyle[`${size}buttons`], {
              borderBottomRightRadius: 8
            }]}
          >
            <View style={[ShareCopyStyle.buttonTextWrapper, ShareCopyStyle[`${theme}buttonTextWrapper`]]}>
              {Platform.OS === "ios" ? (
                <Icon
                  name='CopyIcon'
                  width='20'
                  height='20'
                  fill={iconColor}
                />
              ) : null}
              <Text style={[ShareCopyStyle.buttonsText, ShareCopyStyle[`${theme}buttonsText`]]}>Copy</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ShareCopy;
