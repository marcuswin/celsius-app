import { StyleSheet} from "react-native";

const PinInputStyle = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  digitsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  digitWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitWrapperActive: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  digitText: {
    fontFamily: 'agile-bold',
  },
  digitInput: {
    position: 'absolute',
    opacity: 0,
    top: 0,
    left: 0,
  },
});

export default PinInputStyle;

