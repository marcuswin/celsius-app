import React, {Component} from 'react';
import {Text, View} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';
import PropTypes from 'prop-types';

import SeparatorStyles from './Separator.styles';
import stylesUtil from '../../../utils/styles-util'

class Separator extends Component {
  static propTypes = {
    customWrapperStyle: PropTypes.instanceOf(Object),
    margin: PropTypes.string,
  };

  static defaultProps = {
    margin: '0 0 0 0',
  };

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { children, margin } = this.props;

    const marginStyles = stylesUtil.getMargins(margin);

    if (!children) return <View style={[SeparatorStyles.separator, marginStyles]} />;


    return (
      <View style={marginStyles}>
        <Grid>
          <Col style={SeparatorStyles.centeredColumn}>
            <View style={SeparatorStyles.dummyBorder}/>
          </Col>
          <Col style={SeparatorStyles.textColumn}>
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
