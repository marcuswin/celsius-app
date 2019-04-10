import React from 'react';
import PropTypes from 'prop-types';
import { Linking, View } from "react-native";

import testUtil from "../../../utils/test-util";

import ContactSupportStyle from "./ContactSupport.styles";
import CelText from "../CelText/CelText";
import STYLES from "../../../constants/STYLES";

const ContactSupport = ({
  copy = 'If you need any help, contact our support at app@celsius.network'
}) => {
  const style = ContactSupportStyle()
  const copyParts = copy.split('app@celsius.network')
  return (
    <View style={style.container}>
      <CelText align="center">
        { copyParts[0] }
        <SupportLink />
        { copyParts[1] }
      </CelText>
    </View>
  )
}

const SupportLink = () => (
  <CelText
    color={STYLES.COLORS.CELSIUS_BLUE}
    onPress={() => Linking.openURL("mailto:app@celsius.network")}>
    { 'app@celsius.network' }
  </CelText>
)

ContactSupport.propTypes = {
  copy: PropTypes.string,
}

export default testUtil.hookComponent(ContactSupport);
