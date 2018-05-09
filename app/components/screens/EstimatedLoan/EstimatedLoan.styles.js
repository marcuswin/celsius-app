import {Dimensions, StyleSheet} from 'react-native';
import {FONT_SCALE} from "../../../config/constants/style";

const {width} = Dimensions.get('window');

const EstimatedLoanStyle = StyleSheet.create({
  infoWrapper: {
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#E19F30',
    marginTop: 22,
    marginBottom: 25,
  },
  infoText: {
    color: '#FFFFFF',
    fontFamily: 'agile-medium',
    fontSize: FONT_SCALE * 15,
    fontWeight: '300',
    lineHeight: 18,
  },
  description: {
    color: '#3D4853',
    fontSize: FONT_SCALE * 18,
    fontFamily: 'agile-extra-light'
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(200,200,200,0.3)'
  },
  hippoSection: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  hippoSectionBubble: {
    backgroundColor: '#8a9098',
    borderRadius: 15,
    padding: 12,
    marginTop: 15,
  },
  bubblePointer: {
    position: 'absolute',
    left: 0.27 * width,
    width: 0.1 * width,
    height: 0.066 * width,
  },
  hippo: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  hippoImage: {
    width: width * 0.4,
    height: width * 0.88 * 0.4,
  },
  sectionText: {
    color: '#3D4853',
    fontSize: FONT_SCALE * 18,
    fontFamily: 'agile-extra-light',
    textAlign: 'center'
  },
  heading: {
    color: '#3D4853',
    fontFamily: 'agile-bold',
    fontSize: FONT_SCALE * 21,
    fontWeight: '500',
    lineHeight: 25,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  pdfWrapper: {
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 90,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2, elevation: 3
  },
});

export default EstimatedLoanStyle;
