import { StyleSheet } from 'react-native';

const CameraRollStyle = StyleSheet.create({
  photoWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: -30,
  },
  photo: { height: 80, margin: 3, width: 80 },

});

export default CameraRollStyle;
