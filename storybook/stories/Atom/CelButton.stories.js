import React from "react";
import { storiesOf } from "@storybook/react-native/dist";
import { action } from "@storybook/addon-actions";
import CenterView from "../CenterView";

import CelButton from "../../../app/components/atoms/CelButton/CelButton";
import STYLES from "../../../app/constants/STYLES";

storiesOf("CelButton", module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add("default - medium", () => (
    <CelButton onPress={action("tapped-default")}>Join Celsius</CelButton>
  ))

  .add("default - small", () => (
    <CelButton size={"small"} onPress={action("tapped-default-small")}>
      Join Celsius
    </CelButton>
  ))

  .add("default - green", () => (
    <CelButton color={"green"} onPress={action("tapped-green")}>
      Join Celsius
    </CelButton>
  ))

  .add("default - red", () => (
    <CelButton color={"red"} onPress={action("tapped-green")}>
      Join Celsius
    </CelButton>
  ))

  .add("default - white", () => (
    <CelButton
      color={"white"}
      textColor={STYLES.COLORS.CELSIUS_BLUE}
      onPress={action("tapped-green")}
    >
      Join Celsius
    </CelButton>
  ))

  .add("disabled", () => (
    <CelButton disabled onPress={action("tapped-disabled")}>
      Join Celsius
    </CelButton>
  ))

  .add("with right icon", () => (
    <CelButton
      iconRight="IconArrowRight"
      onPress={action("tapped-with-right-icon")}
    >
      Join Celsius
    </CelButton>
  ))

  .add("loading", () => (
    <CelButton loading onPress={action("tapped-loading")}>
      Join Celsius
    </CelButton>
  ))

  .add("basic", () => (
    <CelButton basic onPress={action("tapped-basic")}>
      Join Celsius
    </CelButton>
  ))

  .add("ghost", () => (
    <CelButton ghost onPress={action("tapped-ghost")}>
      Join Celsius
    </CelButton>
  ));
