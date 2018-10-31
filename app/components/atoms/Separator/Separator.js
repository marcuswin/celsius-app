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
    color: PropTypes.string,
    separatorColor: PropTypes.string,
    separatorSize: PropTypes.number
  };

  static defaultProps = {
    margin: '0 0 0 0',
  };

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { children, margin, color, separatorColor, separatorSize} = this.props;
    const separatorStyles = [SeparatorStyles.dummyBorder];
    const textStyles = [SeparatorStyles.middleBorderText];

    const marginStyles = stylesUtil.getMargins(margin);

    if (!children) return <View style={[SeparatorStyles.separator, marginStyles]} />;

    if (color)  textStyles.push({color});
    if (separatorColor)  separatorStyles.push({backgroundColor: separatorColor});
    const size = separatorSize || 2;

    return (
      <View style={marginStyles}>
        <Grid>
          <Col style={SeparatorStyles.centeredColumn}>
            <View style={separatorStyles}/>
          </Col>
          <Col style={SeparatorStyles.textColumn} size={size}>
            <Text style={textStyles}>{ this.props.children }</Text>
          </Col>
          <Col style={SeparatorStyles.centeredColumn}>
            <View style={separatorStyles}/>
          </Col>
        </Grid>
      </View>
    );
  }
}

export default Separator;
