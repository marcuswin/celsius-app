import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../../redux/actions";
import CelModal from "../../atoms/CelModal/CelModal";
import { MODALS } from "../../../config/constants/common";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import CelButton from "../../atoms/CelButton/CelButton";


@connect(
  () => ({
    // map state to props
  }),
  dispatch => bindActionCreators(actions, dispatch)
)
class TransactionOptionsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
    // binders
  }

  // lifecycle methods
  // event hanlders
  // rendering methods
  render() {
    return (
      <CelModal name={MODALS.TRANSACTION_OPTIONS}>
        <View>
          <Text style={[globalStyles.largeHeading, { marginBottom: 10 }]}>Link to your transaction</Text>
          <Text style={[globalStyles.normalText, { marginBottom: 20, textAlign: "center" }]}>To bring your money back
            you can discard the transaction before someone accepts it, or you can send the link to someone else</Text>
          <View style={{ marginBottom: 20 }}>
            <CelButton
              onPress={() => console.log("j")}
            >
              Send to someone else
            </CelButton>
          </View>
          <View style={{ marginBottom: 20 }}>
            <CelButton
              inverse
              onPress={() => console.log("j")}
            >
              Discard transaction
            </CelButton>
          </View>
        </View>
      </CelModal>
    );
  }
}

export default TransactionOptionsModal;
