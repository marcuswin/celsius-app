import React from 'react';
import { Animated } from 'react-native';
import { widthPercentageToDP } from '../../../utils/styles-util';

export class FadeInView extends React.Component {
    state = {
        fadeAnim: new Animated.Value(0),
    };
    componentDidMount() {
        this.animate();
    }
    animate = () => {
        Animated.timing(// Animate over time
            this.state.fadeAnim, // The animated value to drive
            {
                toValue: widthPercentageToDP('100%') - 64 - 30, // minus because of the margins and paddings
                duration: 2500,
            }).start(this.changeColor); // Starts the animation
    };
    changeColor = () => {
        // this.props.changeColor();
        this.setState({ fadeAnim: new Animated.Value(0) });
        // setTimeout(this.animate, 1000)
        this.animate();
    };
    render() {
        const { fadeAnim } = this.state;
        return (<Animated.View // Special animatable View
            style={[this.props.style, {
                left: fadeAnim,
            },]}>
            {this.props.children}
        </Animated.View>);
    }
}
