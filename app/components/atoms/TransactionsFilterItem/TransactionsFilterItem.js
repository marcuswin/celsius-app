import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "react-native";

import TransactionsFilterItemStyle from "./TransactionsFilterItem.styles";
import STYLES from "../../../constants/STYLES";
import Icon from "../Icon/Icon";
import CelText from "../CelText/CelText";

class TransactionsFilterItem extends Component {
  static propTypes = {
    item: PropTypes.instanceOf(Object),
    // customStyles: PropTypes.instanceOf(Object),
    // onChange: PropTypes.func,

    // icon: PropTypes.string,
    isActive: PropTypes.bool,
    // label: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  };
  static defaultProps = {};

  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     isChecked: false,
  //   };
  // }

  render() {
    const { item, isActive, onPress } = this.props;
    const style = TransactionsFilterItemStyle();

    return (
      <View style={style.itemStyle}>
        <TouchableOpacity
          style={style.optionPickerWrapper}
          onPress={() => onPress(item)}
        >
          <View
            style={[
              style.iconWrapper,
              // {backgroundColor: STYLES.COLORS.LIGHT_GRAY},
            ]}
          >
            {isActive ? (
              <Icon
                name={item.icon || "CloseCircle"}
                fill={STYLES.COLORS.GREEN}
                height={"26"}
                width={"26"}
              />
            ) : (
              <Icon
                name={item.icon || "CloseCircle"}
                fill={STYLES.COLORS.DARK_GRAY3}
                height={"26"}
                width={"26"}
              />
            )}
          </View>

          <CelText color={isActive && STYLES.COLORS.GREEN}>
            {item.title}
          </CelText>

          {/* <CelText weight={"300"}>{item.name || item}</CelText>*/}
          {/* <View style={style.clearSelectWrapper}>*/}
          {/*  <Icon*/}
          {/*    name={"Close"}*/}
          {/*    fill={STYLES.COLORS.DARK_GRAY3}*/}
          {/*    height={"16"}*/}
          {/*    width={"16"}*/}
          {/*  />*/}
          {/* </View>*/}
        </TouchableOpacity>
      </View>
    );
  }
}

export default TransactionsFilterItem;
