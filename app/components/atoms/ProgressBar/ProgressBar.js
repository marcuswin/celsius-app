import React, {Component} from 'react';
import { View, Animated } from "react-native";

import {STYLES} from "../../../config/constants/style";


class ProgressBar extends Component {
  static defaultProps = {
    height: 10,
    width: "50%",
    borderWidth: 2,
    borderRadius: 4,
    borderColor: STYLES.PRIMARY_BLUE,
    barColor: "rgba(255,255,255, 0.7)"
  };

  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
    };
  }
  // lifecycle methods
  componentWillMount() {
    this.animation = new Animated.Value
    (this.props.progress);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.progress !== this.props.progress) {
      Animated.timing(this.animation, {
        toValue: this.props.progress,
        duration: this.props.duration
      }).start()
    }
  }

  // event hanlders
  // rendering methods
  render() {
    const {height, borderColor, borderWidth, borderRadius, barColor, width} = this.props;

    const widthInterpolated = this.animation.interpolate({
      inputRange: [0,1],
      outputRange: ["0%", "100%"],
      extrapolate: "clamp"
    })

    return (
      <View style={{width, height}}>
        <View style={{flex: 1, borderColor, borderWidth, borderRadius, backgroundColor: "rgba(255,255,255, 0.2)"}}>
          <Animated.View
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: widthInterpolated,
              backgroundColor: barColor,
              borderRadius: 4,
            }}
          />
        </View>
      </View>
    );
  }
}

export default ProgressBar;
