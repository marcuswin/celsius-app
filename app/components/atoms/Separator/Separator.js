import React, {Component} from 'react';
import {Text, View} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';
import PropTypes from 'prop-types';

import SeparatorStyles from './Separator.styles';

class Separator extends Component {
  static propTypes = {
    customWrapperStyle: PropTypes.instanceOf(Object),
    // TODO(fj): add margin, the same as CelButton
  };

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { children } = this.props;

    if (!children) return <View style={SeparatorStyles.separator} />;


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

export default Separator;
