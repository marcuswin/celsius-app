import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import AvatarDefaultImage from "../../../../assets/images/Headshot-cat.jpg";

const width = Dimensions.get("window").width;


  const styles = StyleSheet.create({
    root: {
      height: '90%',
      width: '90%',
      top: '5%',
      borderRadius: width * 0.9 / 4,
      display: 'flex',
      alignSelf: 'center',
    },    
  });


const Avatar = () => <Image source={AvatarDefaultImage} style={styles.root} />

export default Avatar;