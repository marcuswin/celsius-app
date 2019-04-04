import React from "react";
import PropTypes from "prop-types";
import { Image, View } from "react-native";

import testUtil from "../../../utils/test-util";

import LoadingStateStyle from "./LoadingState.styles";
import CelText from "../CelText/CelText";
import Spinner from "../Spinner/Spinner";

const LoadingState = ({
  heading = 'Please wait...',
  image = require("../../../../assets/images/victory-bear3x.png"),
}) => {
  const style = LoadingStateStyle();
  return (
    <View style={style.container}>
      <View>
        <Image source={image} style={style.image} />
      </View>

      <CelText margin="20 0 15 0" align="center" type="H3" bold>{heading}</CelText>

      <View style={{ alignSelf: "center" }}>
        <Spinner size={80} />
      </View>
    </View>
  );
};

LoadingState.propTypes = {
  heading: PropTypes.string,
  image: PropTypes.string,
};

export default testUtil.hookComponent(LoadingState);
