import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Icon from "../Icon/Icon";
import Card from "../Card/Card";
import testUtil from "../../../utils/test-util";
import { THEMES } from "../../../constants/UI";
// import InfoBoxStyle from "./InfoBox.styles";
import STYLES from "../../../constants/STYLES";

const InfoBox = (props) => (
  <Card { ...props }>
    <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
      <View>
        { props.children }
      </View>
      <View>
        <Icon name="WarningCircle" width="23" height="23" fill={STYLES.COLORS.ORANGE} />
      </View>
    </View>
  </Card>
);

InfoBox.propTypes = {
  margin: PropTypes.string,
  padding: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func,
  theme: PropTypes.oneOf(Object.keys(THEMES)),
  size: PropTypes.oneOf(['full', 'half'])
}

export default testUtil.hookComponent(InfoBox);
