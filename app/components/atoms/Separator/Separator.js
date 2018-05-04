import React, {Component} from 'react';
import {Text, View} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';
import PropTypes from 'prop-types';

import SeparatorStyles from './Separator.styles';

class Separator extends Component {

  static propTypes = {
    customWrapperStyle: PropTypes.instanceOf(Object),
  };

  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View style={[{paddingTop: 50}, this.props.customWrapperStyle]}>
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
