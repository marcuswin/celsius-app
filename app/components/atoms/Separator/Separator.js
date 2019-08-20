import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableOpacity } from 'react-native'



import SeparatorStyle from './Separator.styles'
import CelText from '../CelText/CelText'
import { getMargins } from '../../../utils/styles-util'
import Icon from "../Icon/Icon";

class Separator extends Component {
  static propTypes = {
    text: PropTypes.string,
    vertical: PropTypes.bool,
    size: PropTypes.number,
    fontType: PropTypes.oneOf(['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7']),
    allCaps: PropTypes.bool,
    dashed: PropTypes.bool,
    color: PropTypes.string,
    opacity: PropTypes.number,
    textOpacity: PropTypes.number,
    margin: PropTypes.string,
    height: PropTypes.string,
    top: PropTypes.number,
    isExpanded: PropTypes.bool,
    expandable: PropTypes.bool,
  }
  static defaultProps = {
    vertical: false,
    size: 1,
    fontType: 'H6',
    allCaps: true,
    dashed: false,
    color: '',
    opacity: 0.08,
    textOpacity: 1,
    margin: '0 0 0 0',
    height: '100%',
    top: 0,
    expandable: false,
    isExpanded: false
  }

  getSeparatorColor = style => StyleSheet.flatten(style.separatorColor).color // get color from raw json depending on style theme

  renderVertical = () => {
    const { size, color, dashed, opacity, margin, height, top } = this.props
    const style = SeparatorStyle()
    const separatorColor = color || this.getSeparatorColor(style)
    const margins = getMargins(margin)

    return (
      <View
        style={[
          style.separatorVertical,
          {
            borderColor: separatorColor,
            width: size,
            borderWidth: size / 2,
            borderStyle: dashed ? 'dashed' : 'solid',
            opacity,
            height,
            top
          },
          margins
        ]}
      />
    )
  }

  renderLine = () => {
    const { size, color, dashed, opacity, margin } = this.props
    const style = SeparatorStyle()
    const separatorColor = color || this.getSeparatorColor(style)
    const margins = getMargins(margin)

    return (
      <View
        style={[
          style.separator,
          {
            borderColor: separatorColor,
            borderWidth: size / 2,
            borderStyle: dashed ? 'dashed' : 'solid',
            opacity
          },
          margins
        ]}
      />
    )
  }

  renderWithText = () => {
    const { text, opacity, textOpacity, size, allCaps, fontType, color, dashed, margin } = this.props
    const style = SeparatorStyle()
    const separatorColor = color || this.getSeparatorColor(style)
    const margins = getMargins(margin)

    return (
      <View style={[style.content, margins]}>
        <View
          style={[
            style.left,
            {
              borderColor: separatorColor,
              borderWidth: size / 2,
              borderStyle: dashed ? 'dashed' : 'solid',
              opacity,
            },
          ]}
        />
        <View style={[style.center, {opacity: textOpacity}]}>
          <CelText
            allCaps={allCaps}
            color={separatorColor}
            align='center'
            type={fontType}
          >
            {text}
          </CelText>
        </View>
        <View
          style={[
            style.right,
            {
              borderColor: separatorColor,
              borderWidth: size / 2,
              borderStyle: dashed ? 'dashed' : 'solid',
              opacity
            },
          ]}
        />
      </View>
    )
  }

  renderExpandableSeparator = () => {
    const { text, opacity, textOpacity, size, allCaps, fontType, color, dashed, margin, isExpanded } = this.props
    const style = SeparatorStyle()
    const separatorColor = color || this.getSeparatorColor(style)
    const margins = getMargins(margin)

    return (
      <View style={[style.content, margins]}>
        <View
          style={[
            style.left,
            {
              borderColor: separatorColor,
              borderWidth: size / 2,
              borderStyle: dashed ? 'dashed' : 'solid',
              opacity,
            },
          ]}
        />
        <View style={[style.center, {opacity: textOpacity}]}>
          <CelText
            allCaps={allCaps}
            color={separatorColor}
            align='center'
            type={fontType}
          >
            { text }
          </CelText>
        </View>
        <View
          style={[
            style.right,
            {
              borderColor: separatorColor,
              borderWidth: size / 2,
              borderStyle: dashed ? 'dashed' : 'solid',
              opacity
            },
          ]}
        />
        <TouchableOpacity>
          <Icon
            name={ isExpanded ? 'CaretUp' : 'CaretDown' }
          />
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    const { text, vertical, expandable } = this.props
    const VerticalSeparator = this.renderVertical
    const HorizontalSeparator = this.renderLine
    const TextSeparator = this.renderWithText
    const ExpandableSeparator = this.renderExpandableSeparator

    if (vertical) {
      return <VerticalSeparator />
    }

    if (!text && !expandable) {
      return <HorizontalSeparator />
    }

    if (text && !expandable) {
      return  <TextSeparator />
    }

    return <ExpandableSeparator />
  }
}

export default Separator
