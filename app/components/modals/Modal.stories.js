import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { storiesOf } from "@storybook/react-native/dist";
import { action } from "@storybook/addon-actions";
import store from "../../redux/store";
import { openModal } from "../../redux/ui/uiActions";
import { MODALS } from "../../constants/UI";
import CelButton from "../atoms/CelButton/CelButton";
import VerifyAuthAppModal from "./VerifyAuthAppModal/VerifyAuthAppModal";
import CenterView from "../../../storybook/stories/CenterView";
import SsnModal from "./SsnModal/SsnModal";
import WithdrawWarningModal from "./WithdrawWarningModal/WithdrawWarningModal";
import ChangeWithdrawalAddressModal from "./ChangeWithdrawalAddressModal/ChangeWithdrawalAddressModal";
import PrepareDollarInterestModal from "./PrepareDollarInterestModal/PrepareDollarInterestModal";
import WithdrawInfoModal from "../modals/WithdrawalInfoModal/WithdrawalInfoModal";

storiesOf("Modals", module)
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
        Open VerifyAuthAppModal
      </CelButton>
      <VerifyAuthAppModal onVerify={action("onVerify prop fn")} />
    </View>
  ))
  .add("SsnModal", () => (
    <View style={{ marginBottom: 30 }}>
      <CelButton onPress={() => store.dispatch(openModal(MODALS.SSN_MODAL))}>
        Open SsnModal
      </CelButton>
      <SsnModal />
    </View>
  ))
  .add("WithdrawWarningModal", () => (
    <View style={{ marginBottom: 30 }}>
      <CelButton
        onPress={() => store.dispatch(openModal(MODALS.WITHDRAW_WARNING_MODAL))}
      >
        Open WithdrawWarningModal
      </CelButton>
      <WithdrawWarningModal />
    </View>
  ))
  .add("ChangeWithdrawalAddressModal", () => (
    <View style={{ marginBottom: 30 }}>
      <CelButton
        onPress={() =>
          store.dispatch(openModal(MODALS.CHANGE_WITHDRAWAL_ADDRESS_MODAL))
        }
      >
        Open ChangeWithdrawalAddressModal
      </CelButton>
      <ChangeWithdrawalAddressModal onPressConfirm={action("onPressConfirm")} />
    </View>
  ))
  .add("PrepareDollarInterestModal", () => (
    <View style={{ marginBottom: 30 }}>
      <CelButton
        onPress={() =>
          store.dispatch(openModal(MODALS.PREPAY_DOLLAR_INTEREST_MODAL))
        }
      >
        Open PrepareDollarInterestModal
      </CelButton>
      <PrepareDollarInterestModal onPressConfirm={action("onPressConfirm")} />
    </View>
  ))
  .add("WithdrawalInfoModal", () => (
    <View style={{ marginBottom: 30 }}>
      <CelButton
        onPress={() => store.dispatch(openModal(MODALS.WITHDRAW_INFO_MODAL))}
      >
        Open WithdrawalInfoModal
      </CelButton>
      <WithdrawInfoModal onPressConfirm={action("onPressConfirm")} />
    </View>
  ));
