import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as actions from "../../../redux/actions";
import Icon from "../Icon/Icon";
import CelInputStyle from "../CelInput/CelInput.styles";
import CelSelectStyle from "../../molecules/CelSelect/CelSelect.styles";

@connect(
  () => ({}),
  dispatch => bindActionCreators(actions, dispatch),
)
class CameraInput extends Component {
  static propTypes = {
    mask: PropTypes.oneOf(['circle', 'document']),
    cameraType: PropTypes.oneOf(['back', 'front']),
    cameraCopy: PropTypes.string,
    field: PropTypes.string.isRequired,
    value: PropTypes.string,
    labelTextActive: PropTypes.string.isRequired,
    labelTextInactive: PropTypes.string.isRequired,
  };

  static defaultProps = {

  };

  // lifecycle methods
  // event hanlders
  onPress = () => {
    const { activateCamera, cameraType, cameraCopy, labelTextInactive, value, mask, field } = this.props;
    console.log('Activate Camera');
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
    const { value, labelTextActive, labelTextInactive } = this.props;

    return (
      <TouchableOpacity onPress={ this.onPress } style={CelInputStyle.wrapper}>
        <Text style={ value ? CelSelectStyle.selectLabelActive : CelSelectStyle.selectLabel}>
          { value ? labelTextActive.toUpperCase() : labelTextInactive }
        </Text>
        { value ? <Text style={ CelInputStyle.input }>Photo Taken</Text> : null }

        { !value ? (
          <View style={{ position: 'absolute', right: 15, top: 0, height: 60, justifyContent: 'center' }}>
            <Icon name='CameraIcon' height='25' width='25' viewBox="0 0 32 32" fill={'#fff'} style={{opacity: 0.5}} />
          </View>
        ) : (
          <View style={{ position: 'absolute', right: 15, top: 0, height: 60, justifyContent: 'center' }}>
            <Icon name='GreenCheck' height='25' width='25' viewBox="0 0 37 37" />
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

export default CameraInput;
