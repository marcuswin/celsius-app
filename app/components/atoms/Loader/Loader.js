import React from 'react';
import {Text, View} from "native-base";

import {STYLES} from "../../../config/constants/style";


const Loader = () =>
  <View style={{display: 'flex', justifyContent: 'center', height: '100%', backgroundColor: STYLES.PRIMARY_BLUE}}>
      <Text style={{color: 'white', textAlign: 'center'}}>Loading...</Text>
  </View>

export default Loader;