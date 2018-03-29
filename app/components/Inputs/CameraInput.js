import React, {Component} from 'react';
import {Label, Text, View} from "native-base";
import {Image, TouchableOpacity} from 'react-native';
import PropTypes from "prop-types";
import {Col, Grid} from 'react-native-easy-grid';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import Icon from "../../components/Icons/Icon";

import InputStyles from './styles';
import * as actions from "../../redux/actions";

@connect(
  () => ({}),
  dispatch => bindActionCreators(actions, dispatch),
)
class CameraInput extends Component {
  static propTypes = {
    labelText: PropTypes.string.isRequired,
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
    const {labelText, value, previewImage} = this.props;

    let text = labelText;
    let fontSize = 18;
    let positionTop = -2;

    if (value && previewImage) {
      text = labelText.toUpperCase();
      fontSize = 12;
      positionTop = -10;
    }

    if (value && !previewImage) {
      text = `${labelText} - Photo Taken`
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

    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={InputStyles.cameraInput}>
          <Grid style={{height: 50}}>
            <Col size={85} style={{justifyContent: 'center'}}>
              { this.renderLabelText() }
            </Col>
            <Col size={15} style={{justifyContent: 'center', alignItems: 'flex-end'}}>
              { !value ? <Icon name='CameraIcon' height='25' width='25' viewBox="0 0 32 32" fill={'#fff'} style={{opacity: 0.5}} /> : null }
              { value && !previewImage ? <Image source={require('../../../assets/images/icons/icon-check.png')} height='25' width='25' viewBox="0 0 32 32" fill={'#fff'} style={{opacity: 0.5}} /> : null }
            </Col>
          </Grid>

          { value && previewImage ? <Image source={{ uri: `data:image/png;base64,${value}` }} style={InputStyles.cameraImage} />: null}
        </View>
      </TouchableOpacity>
    );
  }
}

export default CameraInput;
