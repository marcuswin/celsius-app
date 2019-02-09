import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Image, TouchableOpacity} from 'react-native';
import {bindActionCreators} from "redux";

import * as appActions from "../../../redux/actions";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import CelButton from '../../atoms/CelButton/CelButton';
import API from "../../../constants/API";
import apiUtil from "../../../utils/api-util";
import imageUtil from "../../../utils/image-util";
import CameraRollStyle from "./CameraRoll.styles";

@connect(
  state => ({
    callsInProgress: state.api.callsInProgress,
    formData: state.forms.formData,
    cameraRoll: state.camera,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class CameraRoll extends Component {
  // lifecycle methods
  // event handlers
  selectPhoto = (photo) => {
    const { actions } = this.props;
    imageUtil.convertCameraRollToB64(photo, ({ base64 }) => {
      actions.takeCameraPhoto(base64);
      actions.navigateBack();
    });
  }
  // rendering methods
  render() {
    const {callsInProgress, cameraRoll, actions} = this.props;

    const isLoading = apiUtil.areCallsInProgress([API.GET_CAMERA_ROLL], callsInProgress);

    return (
      <SimpleLayout
        animatedHeading={{ text: 'Camera Photos' }}
      >
        <View style={CameraRollStyle.photoWrapper}>
          { cameraRoll.cameraRollPhotos.map(crp => (
            <TouchableOpacity key={crp.node.image.uri} onPress={() => this.selectPhoto(crp)}>
              <Image source={{ uri: crp.node.image.uri }} resizeMode="cover" style={CameraRollStyle.photo} />
            </TouchableOpacity>
          )) }
        </View>

        { cameraRoll.hasMore && (
          <CelButton
            margin="40 0 0 0"
            color="blue"
            loading={isLoading}
            onPress={() => actions.getCameraRollPhotos()}
          >
            Load more photos
          </CelButton>
        )}
      </SimpleLayout>
    );
  }
}

export default CameraRoll;
