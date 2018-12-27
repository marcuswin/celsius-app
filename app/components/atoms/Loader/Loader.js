// TODO(fj): write new for v3

import React from 'react';
import { View, Text } from 'react-native';
import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";

import Icon from "../../atoms/Icon/Icon";

const wrapperStyles = {
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 20,
};

let dotInterval;

class Loader extends React.Component {
  constructor() {
    super();

    this.state = {
      dots: '.',
      time: 0,
    }
  }
  componentWillMount() {
    dotInterval = setInterval(() => {
      if (this.state.dots === '. . .') {
        this.setState({ dots: '.' })
      } else {
        this.setState({ dots: `${this.state.dots} .` })
      }

      this.setState({ time: this.state.time + 0.5 })
    }, 500)
  }

  componentWillUnmount() {
    clearInterval(dotInterval);
    this.setState({ time: 0 })
  }
  render() {
    return (
      <View style={wrapperStyles}>
        <Icon
          name='CelsiusWithCircle'
          width='150'
          height='150'
          fill={'#c8c8c8'}
        />

        <View style={{ width: '100%', marginTop: 15 }}>
          <Text style={[globalStyles.normalText, { textAlign: 'center' }]}>Loading { this.state.dots }</Text>
          <Text style={[globalStyles.normalText, { textAlign: 'center' }]}>Please wait!</Text>
          { this.state.time > 10 &&  <Text style={[globalStyles.normalText, { textAlign: 'center', marginTop: 5 }]}>It seem that your internet connection is slow. This may take longer than expected!</Text> }
        </View>
      </View>
    )
  }
}

export default Loader;
