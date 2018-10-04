import React, { Component } from "react";
import { Text, View, Animated, Image } from "react-native";
import WelcomeCarouselStyle from "./WelcomeCarousel.styles";

const xOffset = new Animated.Value(0);

// const gifs = [
//   require("../../../../assets/images/Welcome_Doggirl.gif"),
//   require("../../../../assets/images/Welcome_Whale.gif"),
//   require("../../../../assets/images/Welcome_Polar-Bear.gif"),
//   require("../../../../assets/images/Welcome_Penguin.gif")
// ];

const images = [
  require("../../../../assets/images/Welcome_Doggirl.png"),
  require("../../../../assets/images/Welcome_Whale.png"),
  require("../../../../assets/images/Welcome_Polar-Bear.png"),
];

export default class WelcomeCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeScreen: 0,
      xOffset: 0,
      screens: [
        {
          title: "Welcome to Celsius",
          smallDescription: "YOU'RE ONE IN A MILLION",
          largeDescription: "Let's get on the same team so crypto goes mainstream. Together, we can bring the next 100M people into Crypto (so you're not the only weirdo at parties)."
        },
        {
          title: "Earn Interest",
          smallDescription: "PUT YOUR CRYPTO TO WORK",
          largeDescription: "Woohoo! Deposit BTC, ETH, LTC or XRP and get between 3-5% interest annually paid to you every Monday in the app."
        },
        {
          title: "Get a Loan in Dollars",
          smallDescription: "NOW, YOU CAN HODL AND LIVE LARGE",
          largeDescription: "Use our loan estimator to see how many dollars you could borrow at 9% interest against your crypto and apply for a loan."
        },
      ]
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.renderScreen = this.renderScreen.bind(this);
    this.renderScrollIndicators = this.renderScrollIndicators.bind(this);
  }

  handleScroll(e) {
    const { contentOffset, contentSize } = e.nativeEvent;
    const {screens} = this.state;

    const screenNumber = screens.length;

    let nextScreen;
    if (contentOffset.x - this.state.xOffset < 0) {
      nextScreen = Math.floor(contentOffset.x * screenNumber / contentSize.width);
    } else {
      nextScreen = Math.ceil(contentOffset.x * screenNumber / contentSize.width);
    }


    this.setState({
      activeScreen: nextScreen,
      xOffset: contentOffset.x,
    });

    Animated.event(
      [{ nativeEvent: { contentOffset: { x: xOffset } } }],
      { useNativeDriver: true }
    );
  }

  renderScrollIndicators() {
    const { activeScreen } = this.state;

    return (
        <View style={[WelcomeCarouselStyle.circleWrapper]}>
          <View style={[ activeScreen === 0 ? WelcomeCarouselStyle.circleActive : WelcomeCarouselStyle.circle ]}/>
          <View style={[ activeScreen === 1 ? WelcomeCarouselStyle.circleActive : WelcomeCarouselStyle.circle ]}/>
          <View style={[ activeScreen === 2 ? WelcomeCarouselStyle.circleActive : WelcomeCarouselStyle.circle ]}/>
        </View>

    )
  }

  renderScreen(screen, index) {

    return (
      <View style={WelcomeCarouselStyle.scrollPage} key={index}>

        <Image source={images[index]} style={WelcomeCarouselStyle.image}/>

        <Text style={WelcomeCarouselStyle.title}>{screen.title}</Text>
        <Text style={WelcomeCarouselStyle.smallDescription}>{screen.smallDescription}</Text>
        <Text style={WelcomeCarouselStyle.largeDescription}>{screen.largeDescription}</Text>

      </View>
    );
  }

  render() {
    const { screens } = this.state;

    return (
      <View>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={this.handleScroll}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {screens.map(this.renderScreen)}
        </Animated.ScrollView>

        {this.renderScrollIndicators()}

      </View>

    );
  }
}


