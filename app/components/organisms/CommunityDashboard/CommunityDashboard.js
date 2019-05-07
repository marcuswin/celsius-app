import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "react-native";

import testUtil from "../../../utils/test-util";

import CommunityDashboardStyle from "./CommunityDashboard.styles";
import formatter from "../../../utils/formatter";
import CelText from "../../atoms/CelText/CelText";
import Separator from "../../atoms/Separator/Separator";
import STYLES from "../../../constants/STYLES";
import Icon from "../../atoms/Icon/Icon";


class CommunityDashboard extends Component {

  static propTypes = {
    onPress: PropTypes.func,
    buttonTypes: PropTypes.instanceOf(Array),
    name: PropTypes.string,
    info: PropTypes.bool,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);

    const { buttonTypes } = this.props;

    this.state = {
      // initial state
      activeButton: buttonTypes ? buttonTypes[0] : "",
      primaryNumber: "",
      explanation: ""
    };
    // binders
  }

  // lifecycle methods
  componentDidMount() {
    // get all data for community screen, call handlePress to calculate initial values
  }

  // event hanlders
  // rendering methods
  handlePress = (button) => {
    const { name } = this.props;
    let number;
    let explanationText;


    if (name === "BORROW" && button === "Loans") {
      number = 20000;
      explanationText = "Highest $ loan taken";
    }
    if (name === "BORROW" && button === "Average") {
      number = 25000;
      explanationText = "Highest $ loan takene";
    }
    if (name === "BORROW" && button === "Total") {
      explanationText = "Highest $ loan taken";
      number = 28000;
    }
    if (name === "CELPAY" && button === "Sent") {
      explanationText = "Sent via CelPay in total";
      number = 12000;
    }
    if (name === "CELPAY" && button === "Transactions") {
      explanationText = "Sent via CelPay in total";
      number = 15000;
    }
    if (name === "CELPAY" && button === "Total") {
      explanationText = "Sent via CelPay in total";
      number = 18000;
    }
    if (name === "INTEREST" && button === "Earned") {
      explanationText = "Total community earn";
      number = 33000;
    }
    if (name === "INTEREST" && button === "Average") {
      explanationText = "Total community earn";
      number = 38000;
    }
    if (name === "INTEREST" && button === "Rates") {
      explanationText = "Total community earn";
      number = 31000;
    }

    this.setState({
      activeButton: button,
      primaryNumber: number,
      explanation: explanationText
    });
  };


  render() {
    const { name, buttonTypes, info, children } = this.props;
    const { activeButton, primaryNumber, explanation } = this.state;
    const style = CommunityDashboardStyle();

    return (
      <View style={style.container}>
        <Separator margin={"30 0 20 0"} color={"black"} textOpacity={0.7} text={name}/>
        {(buttonTypes && buttonTypes.length > 0) &&
        <View style={style.buttonWrapper}>
          {buttonTypes.map((button) => (
            <TouchableOpacity key={button} style={style.button} onPress={() => this.handlePress(button)}>
              <View style={style.innerStyle}>
                <Icon
                  name={button}
                  height={20}
                  width={20}
                  stroke={activeButton === button ? STYLES.COLORS.CELSIUS_BLUE : STYLES.COLORS.MEDIUM_GRAY}
                  fill={"white"}
                  strokeWidth={0.5}
                />
                <CelText type={"H6"} weight={"500"} align={"center"}
                         color={activeButton === button ? STYLES.COLORS.CELSIUS_BLUE : STYLES.COLORS.MEDIUM_GRAY}>
                  {button.toUpperCase()}
                </CelText>
                {activeButton === button &&
                <View style={style.active}/>
                }
              </View>
            </TouchableOpacity>
          ))}
        </View>
        }
        {info &&
        <View>
          <CelText weight={"600"} align={"center"} type={"H1"}
                   style={style.primary}>{formatter.usd(primaryNumber)}</CelText>
          <CelText weight={"300"} align={"center"} type={"H6"} style={style.explanation}>{explanation}</CelText>
        </View>
        }
        {children}
      </View>
    );
  }
}

export default testUtil.hookComponent(CommunityDashboard);
