import React from 'react';
import { StyleSheet, View } from 'react-native'
import PropTypes from "prop-types";

const CardStyle = StyleSheet.create({
  root: {
    width: '98%',
    marginLeft: 2,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
})


const Card = ({ children }) => <View style={CardStyle.root}>{children}</View>;

Card.propTypes = {
  children: PropTypes.node,
};


export default Card;

