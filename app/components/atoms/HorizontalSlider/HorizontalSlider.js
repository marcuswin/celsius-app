import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Slider, TouchableOpacity, View} from 'react-native'

import testUtil from '../../../utils/test-util'

import HorizontalSliderStyle from './HorizontalSlider.styles'
import STYLES from '../../../constants/STYLES'
import {widthPercentageToDP} from "../../../utils/styles-util"



class HorizontalSlider extends Component {

  static propTypes = {
    items: PropTypes.instanceOf(Array),
    field: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    updateFormField: PropTypes.func,
  };
  static defaultProps = {
  }


  handleChangeSlideValue = (value) => {
    const { onChange, updateFormField, field } = this.props

    if (onChange) {
      onChange(field, value)
    } else {
      updateFormField(field, value)
    }
  }

  // lifecycle methods
  // event handlers
  // rendering methods
  render() {
    const { items, value } = this.props;

    const height = (items.length - 1) * 56
    const values = items.map(i => i.value)

    const style = HorizontalSliderStyle()
    return (
      <View style={style.container}>
        <View style={{ height, width: 10 }}>
          <Slider
            minimumTrackTintColor={STYLES.COLORS.CELSIUS_BLUE}
            maximumTrackTintColor={STYLES.COLORS.DARK_GRAY_OPACITY}
            style={{ width: widthPercentageToDP('82%'), height: 40  }}
            orientation='horizontal'
            minimumValue={0}
            maximumValue={items.length - 1}
            step={1}
            value={values.indexOf(value)}
            onValueChange={(step) => this.handleChangeSlideValue(values[step])}
          />
        </View>

        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end'
          }}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={`value-${index}`}
              onPress={() => this.handleChangeSlideValue(item.value)}
            >
              { item.label }
            </TouchableOpacity>
          ))}
        </View>
      </View >
    );
  }
}

export default testUtil.hookComponent(HorizontalSlider);
