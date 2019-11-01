import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import CelText from "../../atoms/CelText/CelText";
import CircleButton from "../../atoms/CircleButton/CircleButton";
import CoinPickerStyle from "./CoinPicker.styles";
import Icon from "../../atoms/Icon/Icon";

class CoinPicker extends Component {
  static propTypes = {
    updateFormField: PropTypes.func.isRequired, // vrv brisi
    field: PropTypes.string.isRequired,
    coin: PropTypes.string,
    defaultSelected: PropTypes.string, // vrv brisi
    coinCompliance: PropTypes.instanceOf(Array).isRequired, // coinCompliance are coins which are eligible to show up
    navigateTo: PropTypes.func,
    type: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    coin: "",
    defaultSelected: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      coinListFormatted: [],
    };
  }

  componentDidMount() {
    const {
      type,
      updateFormField,
      field,
      defaultSelected,
      coinCompliance,
      onChange,
      coin,
    } = this.props;

    let coinListFormatted = coinCompliance;
    if (type === "enterAmount") {
      coinListFormatted = coinCompliance.map(c => c.value);
    }
    if (type === "borrowAmount") {
      if (coin !== "USD")
        coinListFormatted = coinCompliance
          .filter(c => c.value !== "USD")
          .map(c => c.value);
    }

    this.setState({ coinListFormatted });

    if (defaultSelected) {
      if (onChange) {
        onChange(field, defaultSelected);
      }
      updateFormField(field, defaultSelected);
    }
  }

  getIconColor = style => StyleSheet.flatten(style.iconColor).color; // get color from raw json depending on style theme

  renderByType = () => {
    const { type, coin, navigateTo, field, onChange } = this.props;
    const { coinListFormatted } = this.state;
    const iconColor = this.getIconColor(CoinPickerStyle());
    const style = CoinPickerStyle();
    const icon = coin ? `Icon${coin}` : "StackedCoins";
    const label = coin
      ? coinListFormatted.find(c => c === coin)
      : "Choose a coin";

    switch (type) {
      case "depositAmount":
      case "borrowAmount":
        return (
          <View>
            {type === "depositAmount" && (
              <CelText align="center" weight="regular" type="H4">
                Choose coin to deposit
              </CelText>
            )}
            <TouchableOpacity
              onPress={() =>
                navigateTo("SelectCoin", { coinListFormatted, onChange, field })
              }
              style={style.coinPicking}
              disabled={coin === "USD"}
            >
              <View>
                {coin === "USD" ? (
                  <View style={[style.circleWrapper]}>
                    <CelText color={iconColor} weight={"300"} type={"H2"}>
                      $
                    </CelText>
                  </View>
                ) : (
                  <CircleButton
                    iconSize={30}
                    style={style.circleButton}
                    type="coin"
                    icon={icon}
                    disabled
                  />
                )}
              </View>
              <View style={style.iconStyle}>
                <CelText
                  color={iconColor}
                  type="H3"
                  margin={"10 0 10 0"}
                  style={{ paddingRight: 10 }}
                >
                  {coin === "USD" ? "Dollar (USD)" : label}
                </CelText>
                {coin !== "USD" && (
                  <Icon
                    width="13"
                    height="13"
                    name="CaretDown"
                    fill={iconColor}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        );

      case "enterAmount":
        return (
          <View style={style.selectWrapper}>
            <TouchableOpacity
              onPress={() =>
                navigateTo("SelectCoin", { coinListFormatted, onChange, field })
              }
            >
              <View
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  flexDirection: "row",
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                }}
              >
                <CelText type="H3" style={{ paddingRight: 10 }}>
                  {label}
                </CelText>
                <Icon
                  width="13"
                  height="13"
                  name="CaretDown"
                  fill={iconColor}
                />
              </View>
            </TouchableOpacity>
          </View>
        );

      default:
        break;
    }
  };

  render() {
    const CoinPickerByType = this.renderByType;
    return <CoinPickerByType />;
  }
}

export default CoinPicker;
