import React, {Component} from 'react';
import {Text, View} from "native-base";
import {Col, Grid} from "react-native-easy-grid";

import SeparatorStyles from './styles';

class Separator extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View style={{paddingTop: 50}}>
        <Grid>
          <Col style={SeparatorStyles.centeredColumn}>
            <View style={SeparatorStyles.dummyBorder}/>
          </Col>
          <Col style={{width: 175, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={SeparatorStyles.middleBorderText}>{ this.props.children }</Text>
          </Col>
          <Col style={SeparatorStyles.centeredColumn}>
            <View style={SeparatorStyles.dummyBorder}/>
          </Col>
        </Grid>
      </View>
    );
  }
}

export {Separator};
