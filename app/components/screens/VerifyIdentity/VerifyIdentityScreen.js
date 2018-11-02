import React, { Component } from "react";
import { Text } from "react-native";

import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import { STYLES } from "../../../config/constants/style";

class VerifyIdentity extends Component {
  render() {
    return (
      <SimpleLayout
        background={STYLES.PRIMARY_BLUE}>
        <Text>Verify screenwork boo</Text>
      </SimpleLayout>
    )
  }
}

export default VerifyIdentity;
