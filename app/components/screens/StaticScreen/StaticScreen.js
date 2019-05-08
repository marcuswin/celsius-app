import React, { Component } from "react";
import { View } from "react-native";

import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import EmptyState from "../../atoms/EmptyState/EmptyState";
import StaticScreenStyle from "./StaticScreen.styles";

class StaticScreen extends Component {
  render() {
    const { emptyState } = this.props;
    const style = StaticScreenStyle();
    return (
      <RegularLayout>
        <View style={style.wrapper}>
          <EmptyState {...emptyState} />
        </View>
      </RegularLayout>
    );
  }
}

export default StaticScreen;
