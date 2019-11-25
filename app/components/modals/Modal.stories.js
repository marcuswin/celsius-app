import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { storiesOf } from "@storybook/react-native/dist";
import { action } from "@storybook/addon-actions";
import store from "../../redux/store";
import { openModal } from "../../redux/ui/uiActions";
import {
  updateFormField,
  updateFormFields,
} from "../../redux/forms/formsActions";
import { MODALS } from "../../constants/UI";
import ACTIONS from "../../constants/ACTIONS";
import CelButton from "../atoms/CelButton/CelButton";
import VerifyAuthAppModal from "./VerifyAuthAppModal/VerifyAuthAppModal";
import CenterView from "../../../storybook/stories/CenterView";
import SsnModal from "./SsnModal/SsnModal";
import WithdrawWarningModal from "./WithdrawWarningModal/WithdrawWarningModal";
import ChangeWithdrawalAddressModal from "./ChangeWithdrawalAddressModal/ChangeWithdrawalAddressModal";
import PrepareDollarInterestModal from "./PrepareDollarInterestModal/PrepareDollarInterestModal";
import ApiKeySuccessModal from "./ApiKeySuccessModal/ApiKeySuccessModal";
import ConfirmWithdrawalAddressModal from "./ConfirmWithdrawalAddressModal/ConfirmWithdrawalAddressModal";
import WithdrawInfoModal from "../modals/WithdrawalInfoModal/WithdrawalInfoModal";
import LoanApplicationSuccessModal from "./LoanApplicationSuccessModal/LoanApplicationSuccessModal";
import CancelLoanModal from "./CancelLoanModal/CancelLoanModal";
import BecomeCelMemberModal from "./BecomeCelMemberModal/BecomeCelMemberModal";
import DepositInfoModal from "./DepositInfoModal/DepositInfoModal";
import RemoveAuthAppModal from "./RemoveAuthAppModal/RemoveAuthAppModal";
import LoseTierModal from "./LoseTierModal/LoseTierModal";
import LoseMembershipModal from "./LoseMembershipModal/LoseMembershipModal";
import MemoIdModal from "./MemoIdModal/MemoIdModal";
import ApiKeyRevokeModal from "./ApiKeyRevokeModal/ApiKeyRevokeModal";

let type = "";

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
  .add("ApiKeySuccessModal", () => (
    <View style={{ marginBottom: 30 }}>
      <CelButton
        onPress={() => {
          store.dispatch(openModal(MODALS.GENERATE_API_KEY_MODAL));
          store.dispatch({
            type: ACTIONS.CREATE_API_KEY_SUCCESS,
            apiKey: "1234-5678-1234-5678",
          });
        }}
      >
        Open ApiKeySuccessModal
      </CelButton>
      <ApiKeySuccessModal />
    </View>
  ))
  .add("ConfirmWithdrawalAddressModal", () => (
    <View style={{ marginBottom: 30 }}>
      <CelButton
        onPress={() => {
          store.dispatch(
            updateFormField(
              "withdrawAddress",
              "2Mawkjflkwjafk394LfIOEslwdksaKJLdKJkl"
            )
          );
          store.dispatch(updateFormField("coin", "BTC"));
          store.dispatch(openModal(MODALS.CONFIRM_WITHDRAWAL_ADDRESS_MODAL));
        }}
      >
        Open ConfirmWithdrawalAddressModal
      </CelButton>
      <ConfirmWithdrawalAddressModal />
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
  ))
  .add("LoanApplicationSuccessModal", () => (
    <View style={{ marginBottom: 30 }}>
      <CelButton
        style={{ marginBottom: 5 }}
        onPress={() => {
          store.dispatch(
            updateFormFields({
              loanAmount: 1,
              coin: "CEL",
            })
          );
          store.dispatch(openModal(MODALS.LOAN_APPLICATION_SUCCESS_MODAL));
        }}
      >
        Open Multi LoanApplicationSuccessModal
      </CelButton>
      <CelButton
        onPress={() => {
          store.dispatch(
            updateFormFields({
              loanAmount: 1000000000,
              coin: "USD",
            })
          );
          store.dispatch(openModal(MODALS.LOAN_APPLICATION_SUCCESS_MODAL));
        }}
      >
        Open Info LoanApplicationSuccessModal
      </CelButton>

      <LoanApplicationSuccessModal
        onPressConfirm={action("onPressConfirm")}
        loanId={42}
      />
    </View>
  ))
  .add("CancelLoanModal", () => (
    <View style={{ marginBottom: 30 }}>
      <CelButton
        onPress={() => store.dispatch(openModal(MODALS.LOAN_CANCEL_MODAL))}
      >
        Open CancelLoanModal
      </CelButton>
      <CancelLoanModal onPressConfirm={action("onPressConfirm")} />
    </View>
  ))
  .add("BecomeCelMemberModal", () => (
    <View style={{ marginBottom: 30 }}>
      <CelButton
        onPress={() =>
          store.dispatch(openModal(MODALS.BECAME_CEL_MEMBER_MODAL))
        }
      >
        Open BecomeCelMemberModal
      </CelButton>
      <BecomeCelMemberModal />
    </View>
  ))
  .add("DepositInfoModal", () => (
    <View style={{ marginBottom: 30 }}>
      <CelButton
        style={{ marginBottom: 5 }}
        onPress={() => {
          type = "USDT ERC20";
          store.dispatch(openModal(MODALS.DEPOSIT_INFO_MODAL));
        }}
      >
        Open Multi DepositInfoModal
      </CelButton>
      <CelButton
        onPress={() => {
          type = "XRP";
          store.dispatch(openModal(MODALS.DEPOSIT_INFO_MODAL));
        }}
      >
        Open Info DepositInfoModal
      </CelButton>
      <DepositInfoModal onPressConfirm={action("onPressConfirm")} type={type} />
    </View>
  ))
  .add("RemoveAuthAppModal", () => (
    <View style={{ marginBottom: 30 }}>
      <CelButton
        onPress={() => store.dispatch(openModal(MODALS.REMOVE_AUTHAPP_MODAL))}
      >
        Open RemoveAuthAppModal
      </CelButton>
      <RemoveAuthAppModal />
    </View>
  ))
  .add("LoseTierModal", () => (
    <View style={{ marginBottom: 30 }}>
      <CelButton
        onPress={() => store.dispatch(openModal(MODALS.LOSE_TIER_MODAL))}
      >
        Open LoseTierModal
      </CelButton>
      <LoseTierModal tierTitle={"PLATINUM"} />
    </View>
  ))
  .add("LoseMembershipModal", () => (
    <View style={{ marginBottom: 30 }}>
      <CelButton
        onPress={() => store.dispatch(openModal(MODALS.LOSE_MEMBERSHIP_MODAL))}
      >
        Open LoseMembershipModal
      </CelButton>
      <LoseMembershipModal />
    </View>
  ))
  .add("MemoIdModal", () => (
    <View style={{ marginBottom: 30 }}>
      <CelButton
        onPress={() => store.dispatch(openModal(MODALS.MEMO_ID_MODAL))}
      >
        Open MemoIdModal
      </CelButton>
      <MemoIdModal coin={"EOS"} />
    </View>
  ))
  .add("ApiKeyRevokeModal", () => (
    <View style={{ marginBottom: 30 }}>
      <CelButton
        onPress={() => store.dispatch(openModal(MODALS.API_KEY_REVOKE_MODAL))}
      >
        Open ApiKeyRevokeModal
      </CelButton>
      <ApiKeyRevokeModal apiKey={"fake-api-key"} />
    </View>
  ));
