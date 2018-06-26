import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import Icon from "../Icon/Icon";
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";

@connect(
  () => ({}),
  dispatch => bindActionCreators(actions, dispatch),
)
class CameraInput extends Component {
  static propTypes = {
    theme: PropTypes.oneOf(['blue', 'white']),
    mask: PropTypes.oneOf(['circle', 'document']),
    cameraType: PropTypes.oneOf(['back', 'front']),
    cameraCopy: PropTypes.string,
    field: PropTypes.string.isRequired,
    value: PropTypes.string,
    labelTextActive: PropTypes.string.isRequired,
    labelTextInactive: PropTypes.string.isRequired,
  };

  static defaultProps = {
    theme: 'blue'
  };

  // lifecycle methods
  // event hanlders
  onPress = () => {
    const { activateCamera, cameraType, cameraCopy, labelTextInactive, value, mask, field } = this.props;
    activateCamera({
      cameraField: field,
      cameraType,
      cameraHeading: labelTextInactive,
      cameraCopy,
      photo: value,
      mask,
    });
  }
  // rendering methods
  render() {
    const { value, labelTextActive, labelTextInactive, theme } = this.props;

    const labelStyles = value ? [globalStyles.selectLabelActive] : [globalStyles.selectLabelInactive];
    labelStyles.push(globalStyles[`${theme}InputTextColor`]);

    const cameraBackground = value ? globalStyles[`${theme}InputWrapperActive`] : globalStyles[`${theme}InputWrapper`];

    return (
      <TouchableOpacity onPress={ this.onPress } style={[globalStyles.inputWrapper, globalStyles[`${theme}InputWrapper`], cameraBackground]}>
        <Text style={ labelStyles }>
          { value ? labelTextActive.toUpperCase() : labelTextInactive }
        </Text>
        { value ? <Text style={ [globalStyles.input, globalStyles[`${theme}InputTextColor`]] }>Photo Taken</Text> : null }

        { !value ? (
          <View style={globalStyles.inputIconRight}>
            <Icon name='CameraIcon' height='25' width='25' viewBox="0 0 32 32" fill={'#fff'} style={{opacity: 0.5}} />
          </View>
        ) : (
          <View style={[globalStyles.inputIconRight, { opacity: 1 }]}>
            <Icon name='GreenCheck' height='25' width='25' viewBox="0 0 37 37" />
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

export default CameraInput;
