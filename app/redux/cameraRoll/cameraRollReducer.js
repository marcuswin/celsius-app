import ACTIONS from "../../config/constants/ACTIONS";

function initialState() {
  return {
    cameraRollPhotos: [],
    hasMore: true,
    totalPhotos: 0,
    lastPhotoCursor: undefined,
  };
}

export default function cameraRollReducer(state = initialState(), action) {
  let cameraRollPhotos;
  switch (action.type) {
    case ACTIONS.GET_CAMERA_ROLL_SUCCESS:
      cameraRollPhotos = [
        ...state.cameraRollPhotos,
        ...action.photos.edges,
      ];
      return {
        ...state,
        cameraRollPhotos,
        totalPhotos: cameraRollPhotos.length,
        hasMore: action.photos.page_info.has_next_page,
        lastPhotoCursor: action.photos.page_info.end_cursor,
      };

    default:
      return { ...state };
  }
}
