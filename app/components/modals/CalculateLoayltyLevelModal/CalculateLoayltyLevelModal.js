import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { View } from "react-native";

import CalculateLoayltyLevelModalStyle from "./CalculateLoayltyLevelModal.styles";
import CelModal from "../CelModal/CelModal.js";
import { MODALS, THEMES } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import CelsiusMembershipTable from "../../organisms/CelsiusMembershipTable/CelsiusMembershipTable";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";

class CalculateLoayltyLevelModal extends Component {
  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
  }

  render() {
    const style = CalculateLoayltyLevelModalStyle();
    const { actions } = this.props;
    return (
      <CelModal
        style={style.container}
        name={MODALS.MY_CEL_LOYALTY_CALCULATOR_MODAL}
      >
        <CelText
          type={"H3"}
          align={"center"}
          margin={"0 20 10 20"}
          theme={THEMES.LIGHT}
          weight={"700"}
        >
          How do we calculate loyalty level?
        </CelText>
        <CelText
          align={"center"}
          margin={"5 20 0 20"}
          theme={THEMES.LIGHT}
          weight={"300"}
        >
          Your loyalty level is determined by the ratio of CEL to other coins in
          your wallet.
        </CelText>
        <View style={style.tableWrapper}>
          <CelsiusMembershipTable />
        </View>

        <View style={style.footerContainer}>
          <CelText
            margin={"10 0 10 0"}
            weight={"300"}
            type={"H5"}
            align={"center"}
          >
            Each loyalty level will bring you better interest rates -{" "}
            <CelText weight={"500"} type={"H5"} align={"center"}>
              so keep HODLing!
            </CelText>
          </CelText>
        </View>
        <View style={style.buttonsWrapper}>
          <CelModalButton
            buttonStyle={"secondary"}
            position={"single"}
            onPress={() => actions.closeModal()}
          >
            Close
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default CalculateLoayltyLevelModal;
