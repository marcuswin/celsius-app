import React, {Component} from 'react';
import {Label, Text, View} from "native-base";
import {Image, TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import {Col, Grid} from 'react-native-easy-grid';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import Icon from "../Icon/Icon";

import InputStyles from './Inputs.styles';
import * as actions from "../../../redux/actions";

@connect(
  () => ({}),
  dispatch => bindActionCreators(actions, dispatch),
)
class CameraInput extends Component {
  static propTypes = {
    labelTextActive: PropTypes.string.isRequired,
    labelTextInactive: PropTypes.string,
    value: PropTypes.string,
    previewImage: PropTypes.bool,
  };

  static defaultProps = {
    previewImage: false,
  };

  constructor(props) {
    super(props);

    this.state = {
    };

    this.onPress = this.onPress.bind(this);
  }

  // Component Lifecycle Methods
  // Event Handlers
  onPress = () => {
    const {toggleCamera, photoName} = this.props;
    toggleCamera(photoName);
  }

  // Render methods
  renderLabelText = () => {
    const {labelTextActive, labelTextInactive, value} = this.props;

    let text = labelTextActive;
    let fontSize = 18;
    let positionTop = -2;

    if (value) {
      text = labelTextInactive ? labelTextInactive.toUpperCase() : labelTextActive.toUpperCase();
      fontSize = 12;
      positionTop = -4;
    }

    return (
      <Label style={{top: positionTop}}>
        <Text style={[InputStyles.label, {fontSize}]}>{text}</Text>
      </Label>
    )
  };

  render() {
    const {
      value,
      previewImage,
    } = this.props;

    const inputStyles = value ? [InputStyles.cameraInput, InputStyles.cameraInputActive] : InputStyles.cameraInput;

    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={inputStyles}>
          <Grid style={{height: 50}}>
            <Col size={85} style={{justifyContent: 'center'}}>
              { this.renderLabelText() }
              { value && !previewImage ? (
                <Label style={{top: -2}}>
                  <Text style={[InputStyles.label, InputStyles.labelActive]}>Photo Taken</Text>
                </Label>
              ) : null}
            </Col>
            <Col size={15} style={InputStyles.leftIconColumn}>

              { !value ? (
                  <Icon name='CameraIcon' height='25' width='25' viewBox="0 0 32 32" fill={'#fff'} style={{opacity: 0.5}} />
              ) : null }

              { value && !previewImage ? (
                <View style={InputStyles.checkbox}>
                  <Image source={require('../../../../assets/images/icons/icon-check.png')} height='25' width='25' viewBox="0 0 32 32" fill={'#fff'}/>
                </View>
              ) : null }
            </Col>
          </Grid>

          { value && previewImage ? <Image source={{ uri: value }} style={InputStyles.cameraImage} /> : null}
        </View>
      </TouchableOpacity>
    );
  }
}

export default CameraInput;
