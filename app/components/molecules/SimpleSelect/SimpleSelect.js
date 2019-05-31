import React from 'react'
import PropTypes from 'prop-types'
import RNPickerSelect from 'react-native-picker-select'

import testUtil from '../../../utils/test-util'

import SimpleSelectStyle from './SimpleSelect.styles'
import Icon from '../../atoms/Icon/Icon'
import STYLES from '../../../constants/STYLES'

const SimpleSelect = props => {
  const style = SimpleSelectStyle()
  let additionalStyle

  const {
    displayValue,
    items,
    onChange,
    updateFormField,
    field,
    iconName,
    fillColor,
    iconWidth,
    placeholder,
    style:selectStyle
  } = props
  if (selectStyle) {
    additionalStyle = {
      inputAndroid: {
        ...selectStyle
      },
      inputIOS: {
        ...selectStyle
      }
    }
  }
  
  return (
    <RNPickerSelect
      placeholder={{ label: placeholder } || {}}
      onValueChange={item => {
        if (item) {
          return onChange ? onChange(field, item) : updateFormField(field, item)
        }
      }}
      style={{ ...style, ...additionalStyle }}
      useNativeAndroidPickerStyle={false}
      value={displayValue}
      Icon={() => (
        <Icon
          name={iconName || 'CaretDown'}
          width={iconWidth || 8}
          fill={fillColor || STYLES.COLORS.DARK_GRAY}
        />
      )}
      items={items}
    />
  )
}

SimpleSelect.propTypes = {
  displayValue: PropTypes.string,
  // { label, value }
  items: PropTypes.instanceOf(Array).isRequired,
  updateFormField: PropTypes.func,
  onChange: PropTypes.func,
  field: PropTypes.string.isRequired,
  iconName: PropTypes.string,
  placeholder: PropTypes.string,
  fillColor: PropTypes.string,
  iconWidth: PropTypes.number,
  style: PropTypes.instanceOf(Object)
}

export default testUtil.hookComponent(SimpleSelect)
