import React, { Component } from "react";
import { Text, View, Animated, ScrollView, Dimensions } from "react-native";
import WelcomeCarouselStyle from "./WelcomeCarousel.styles";

const { width } = Dimensions.get("window");

export default class WelcomeCarousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      xOffset: new Animated.Value(0),
      screens: [
        {
          image: require("../../../../assets/images/Welcome_Doggirl.png"),
          title: "Welcome to Celsius",
          smallDescription: "YOU'RE ONE IN A MILLION",
          largeDescription: "Let's get on the same team so crypto goes mainstream. Together, we can bring the next 100M people into Crypto (so you're not the only weirdo at parties)."
        },
        {
          image: require("../../../../assets/images/Welcome_Whale.png"),
          title: "Earn Interest",
          smallDescription: "PUT YOUR CRYPTO TO WORK",
          largeDescription: "Woohoo! Deposit BTC, ETH, LTC or XRP and get between 3-5% interest annually paid to you every Monday in the app."
        },
        {
          image: require("../../../../assets/images/Welcome_Polar-Bear.png"),
          title: "Get a Loan in Dollars",
          smallDescription: "NOW, YOU CAN HODL AND LIVE LARGE",
          largeDescription: "Use our loan estimator to see how many dollars you could borrow at 9% interest against your crypto and apply for a loan."
        }
      ]
    };
    this.handleScroll = this.handleScroll.bind(this);
  }


  handleScroll(e) {
    const { contentOffset } = e.nativeEvent;

    this.setState({
      xOffset: contentOffset.x
    });

    Animated.event(
      [{ nativeEvent: { contentOffset: { x: this.state.xOffset } } }],
      { useNativeDriver: true }
    );
  }

  render() {
    const position = Animated.divide(this.state.xOffset, width - 80);
    const { screens } = this.state;

    return (
      <View>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
        >
          {screens.map((source, i) => {
              const opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [0, 1, 0],
                extrapolate: "clamp"
              });
              const imageHeight = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [0, 150, 0],
                extrapolate: "clamp"
              });
              const imageWidth = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [0, 250, 0],
                extrapolate: "clamp"
              });
              return (
                <View style={WelcomeCarouselStyle.scrollPage}>
                  <View style={WelcomeCarouselStyle.image}>
                    <Animated.Image
                      style={{ opacity, height: imageHeight, width: imageWidth }}
                      source={source.image}
                    />
                  </View>
                  <View>
                    <Text style={WelcomeCarouselStyle.title}>{source.title}</Text>
                    <Text style={WelcomeCarouselStyle.smallDescription}>{source.smallDescription}</Text>
                    <Text style={WelcomeCarouselStyle.largeDescription}>{source.largeDescription}</Text>
                  </View>
                </View>
              );
            }
          )}
        </ScrollView>
        <View
          style={WelcomeCarouselStyle.circleWrapper}
        >
          {screens.map((_, i) => {
              const opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [0.2, 0.6, 0.2],
                extrapolate: "clamp"
              });
              return (
                <Animated.View
                  style={[WelcomeCarouselStyle.circle, { opacity }]}
                />
              );
            }
          )}
        </View>
      </View>
    );
  }
}


