import { StyleSheet } from 'react-native';

const VerifyProfileStyle = StyleSheet.create({
  centeredColumn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentsGrid: {
    height: 101
  },
  documentViewWrapper: {
    backgroundColor: '#5366ad',
    opacity: 0.7,
    borderRadius: 8,
    width: 88,
    height: 101,
    alignItems: 'center',
    justifyContent: 'center'
  },
  documentViewWrapperSelected: {
    backgroundColor: '#828fc2',
    opacity: 1,
    borderRadius: 8,
    width: 88,
    height: 101,
    alignItems: 'center',
    justifyContent: 'center'
  },
  documentTypeWrapper: {
    paddingTop: 14,
    alignItems: 'center',
    width: 50,
    height: 43
  },
  documentTypeName: {
    fontSize: 12,
    fontFamily: 'agile-light',
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default VerifyProfileStyle;
