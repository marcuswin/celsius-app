import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Platform, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Text} from "native-base";

import AnimatedHeadingStyle from './AnimatedHeading.styles';
import {FONT_SCALE} from "../../../config/constants/style";

class AnimatedHeading extends Component {
  static propTypes = {
    text: PropTypes.string,
    containerCustomStyles: PropTypes.instanceOf(Object),
    textCustomStyles: PropTypes.instanceOf(Object),
    subheading: PropTypes.string,
    setHeaderHeight: PropTypes.func,
  };

  constructor() {
    super();

    this.state = {
      height: 100,
      fontSize: FONT_SCALE * 40,
      showSubheading: true
    };
  }


  componentDidUpdate = () => {
    // TODO (fj): remove action completely
    // const {setHeaderHeight} = this.props;
    // if (setHeaderHeight) {
    //   this.element.measure((x, y, width, height) => setHeaderHeight(height, true));
    // }
  };

  offset = 0;

  animateHeading = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > this.offset ? 'down' : 'up';
    this.offset = currentOffset;

    if (Platform.os === 'ios') {
      if (currentOffset > 50 && currentOffset < 100) {
        if (direction === 'down') {
          this.setState({fontSize: FONT_SCALE * 30, height: 50, showSubheading: false});
        } else {
          this.setState({fontSize: FONT_SCALE * 40, height: 100, showSubheading: true});
        }
      }
    }
  };

  renderSubheading = subheading => {
    if (subheading) {
      return <Text
        style={{
          color: '#fff',
          fontSize: FONT_SCALE * 21,
          opacity: 0.7,
          fontFamily: 'agile-light',
          marginBottom: 10,
        }}>{subheading.toUpperCase()}</Text>
    }
  };

  render() {
    const {text, containerCustomStyles, textCustomStyles, subheading} = this.props;
    const {height, fontSize, showSubheading} = this.state;

    return (
      <View ref={el => {
        this.element = el
      }}>
        <Animatable.View transition="height" style={[AnimatedHeadingStyle.container, {height}, containerCustomStyles]}>
          <Animatable.Text transition="fontSize" easing="ease-in-out" duration={50}
                           style={[AnimatedHeadingStyle.text, {fontSize}, textCustomStyles]}>
            {text}
          </Animatable.Text>
          {showSubheading ? this.renderSubheading(subheading) : null}
        </Animatable.View>
      </View>
    );
  }
}

export {AnimatedHeading};
