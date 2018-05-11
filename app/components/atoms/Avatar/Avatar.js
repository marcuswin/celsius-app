import React from 'react';
import { Image, StyleSheet } from 'react-native';
import AvatarDefaultImage from "../../../../assets/images/Headshot-cat.jpg";


  const styles = StyleSheet.create({
    root: {
      height: 185,
      width: 185,
      borderRadius: 190 / 2,
      left: 7.5,
      top: 7.5,
    },    
  });


const Avatar = () => <Image source={AvatarDefaultImage} style={styles.root} />

export default Avatar;