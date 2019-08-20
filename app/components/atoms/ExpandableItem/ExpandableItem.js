import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types'

import ExpandableItemStyle from "./ExpandableItem.styles";
import Separator from "../Separator/Separator";
import CelText from "../CelText/CelText";

const ExpandableItem = (props) => {

  const style = ExpandableItemStyle(props.theme)
  const { children } = props
  return (
      <View
        style={ [props.style, style.container] }
      >
        { props.heading && <Separator
          text={ props.heading }
          // expandable
          // isExpanded
        />}
        <CelText
          type={'H5'}
          style={{ marginTop: 20}}
        >{ children }</CelText>
      </View>
  )
}
ExpandableItem.propTypes = {
  heading: PropTypes.string,
  // content: PropTypes.string.isRequired,
  style: PropTypes.instanceOf(Object)
}

export default ExpandableItem
