import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { storiesOf } from "@storybook/react-native/dist";
import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import VerifyAuthAppModal from "./VerifyAuthAppModal";
import CenterView from "../../../../storybook/stories/CenterView";

storiesOf("VerifyAuthAppModal", module)
  .addDecorator(getStory => (
    <Provider store={store}>
      <CenterView>{getStory()}</CenterView>
    </Provider>
  ))
  .add("VerifyAuthAppModal", () => (
    <View style={{ marginBottom: 30 }}>
      <CelButton
        onPress={() => store.dispatch(openModal(MODALS.VERIFY_AUTHAPP_MODAL))}
      >
        Open modal
      </CelButton>
      <VerifyAuthAppModal />
    </View>
  ));
