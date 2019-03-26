import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";

import Icon from "../Icon/Icon";
import testUtil from "../../../utils/test-util";
import { THEMES } from "../../../constants/UI";
// import InfoBoxStyle from "./InfoBox.styles";

import { heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";
import CelText from "../CelText/CelText";

class InfoBox extends Component {

  static propTypes = {
    margin: PropTypes.string,
    padding: PropTypes.string,
    color: PropTypes.string,
    onPress: PropTypes.func,
    theme: PropTypes.oneOf(Object.values(THEMES)),
    size: PropTypes.oneOf(["full", "half"]),
    titleText: PropTypes.string,
    infoText: PropTypes.string,
    right: PropTypes.bool,
    left: PropTypes.bool,
    backgroundColor: PropTypes.string,
    triangle: PropTypes.bool,
    opened: PropTypes.bool,
    explanationText: PropTypes.string,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  renderLargeInfoBox() {
    const { open } = this.state;
    const o = !open;
    this.setState({
      open: o
    });
  }

  render() {
    const { left, right, triangle, children, titleText, color, explanationText, backgroundColor } = this.props;
    const { open } = this.state;

    const rotate = open ? "0deg" : "180deg";

    return (
      <TouchableOpacity style={{
        width: "100%",
        padding: 20,
        backgroundColor,
        borderRadius: 8, marginTop: 10, marginBottom: 10
      }} onPress={() => this.renderLargeInfoBox()}>
        <View style={{
          flexDirection: "row", justifyContent: "space-around",
          alignItems: "center"
        }}>
          {left &&
            <View style={{ paddingRight: 20 }}>
              <Icon name="WarningCircle" width="23" height="23" stroke={backgroundColor} fill={color} />
            </View>
          }
          <CelText type={"H4"} style={{ color }}>{titleText}</CelText>
          <View>
            {children}
          </View>
          {right &&
            <View style={{ paddingLeft: 20 }}>
              <Icon name="WarningCircle" width="23" height="23" stroke={backgroundColor} fill={color} />
            </View>
          }
          {triangle &&
            <View style={{ paddingLeft: 20 }}>
              <View style={{
                width: 0,
                height: 0,
                backgroundColor: "transparent",
                borderStyle: "solid",
                marginTop: heightPercentageToDP("1%"),
                borderLeftWidth: widthPercentageToDP("1.5%"),
                borderRightWidth: widthPercentageToDP("1.5%"),
                borderBottomWidth: widthPercentageToDP("1.5%"),
                borderLeftColor: "transparent",
                borderRightColor: "transparent",
                borderBottomColor: "white",
                transform: [
                  { rotate }
                ]
              }} />
            </View>
          }
        </View>
        {(triangle && open) &&
          <View style={{ marginTop: 20, width: "100%", jutifyContetn: 'center', alignContent: 'center', alignItems: "center",  }}>
            <CelText type={"H6"} style={{  color, width: '90%', paddingBottom: heightPercentageToDP("2%") }}>{explanationText}</CelText>
          </View>
        }
      </TouchableOpacity>
    );
  }
};


export default testUtil.hookComponent(InfoBox);
