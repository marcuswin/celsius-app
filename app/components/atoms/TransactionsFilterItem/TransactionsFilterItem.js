import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, TouchableOpacity, View } from "react-native";

import TransactionsFilterItemStyle from "./TransactionsFilterItem.styles";
import STYLES from "../../../constants/STYLES";
import CelCheckbox from "../CelCheckbox/CelCheckbox";
import Icon from "../Icon/Icon";

class TransactionsFilterItem extends Component {
  static propTypes = {
    item: PropTypes.instanceOf(Object),
    activeCoin: PropTypes.string,
    customStyles: PropTypes.instanceOf(Object),
    onChange: PropTypes.func,
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };

    // binders
  }

  render() {
    const { customStyles, onChange, item } = this.props;
    const style = TransactionsFilterItemStyle();
    return (
      <View style={style.itemStyle}>
        <TouchableOpacity style={style.optionPickerWrapper}>
          <View
            style={[
              style.iconWrapper,
              // {backgroundColor: STYLES.COLORS.LIGHT_GRAY},
              customStyles,
            ]}
          >
            <CelCheckbox
              field="interestInCel"
              onChange={onChange}
              // value={item.name || item}
              rightText={item.name || item}
              textWeight="400"
              checked={
                <Image
                  source={{ uri: item.image_url }}
                  style={style.iconWrapper}
                />
              }
              unCheckedImage={
                <Icon
                  name={item.icon || "CloseCircle"}
                  fill={STYLES.COLORS.DARK_GRAY3}
                  height={"26"}
                  width={"26"}
                />
              }
            />
          </View>

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
