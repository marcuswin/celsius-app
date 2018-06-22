import React, {Component} from 'react';
import { Text, View, Animated, Dimensions, Image } from 'react-native';
import WelcomeCarouselStyle from "./WelcomeCarousel.styles";

const SCREEN_WIDTH = Dimensions.get("window").width;
const xOffset = new Animated.Value(0);

const gifs = [
  require('../../../../assets/images/Welcome_Doggirl.gif'),
  require('../../../../assets/images/Welcome_Whale.gif'),
  require('../../../../assets/images/Welcome_Polar-Bear.gif'),
  require('../../../../assets/images/Welcome_Penguin.gif'),
];

const transitionAnimation = index => ({
  transform: [
    { perspective: 800 },
    {
      scale: xOffset.interpolate({
        inputRange: [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH
        ],
        outputRange: [1, 1, 1]
      })
    },
    {
      rotateX: xOffset.interpolate({
        inputRange: [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH
        ],
        outputRange: ["0deg", "0deg", "0deg"]
      })
    },
    {
      rotateY: xOffset.interpolate({
        inputRange: [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH
        ],
        outputRange: ["-0deg", "0deg", "0deg"]
      })
    }
  ]
});

export default class WelcomeCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeScreen: 0,
      screens: [
        {
          title: 'Welcome to Celsius',
          smallDescription: 'YOU\'RE ONE IN A MILLION',
          largeDescription: 'Let\'s get on the same team so crypto goes mainstream. Together, we can bring the next 100M people into Crypto (so you\'re not the only weirdo at parties).',
        },
        {
          title: 'Get a Loan in Dollars',
          smallDescription: 'NOW, YOU CAN HODL AND LIVE LARGE',
          largeDescription: 'Use our loan estimator to see how many dollars you could borrow against your crypto once we launch.',
        },
        {
          title: 'Earn Interest',
          smallDescription: 'PUT YOUR CRYPTO TO WORK',
          largeDescription: 'Find out how much interest you can earn as a Celsius member once we launch later this year.',
        },
        {
          title: 'Join the Queue',
          smallDescription: 'EARLY BIRDS GET THE LOAN!',
          largeDescription: 'Join the line now to be one of the first to get a loan or interest on your crypto.',
        }
      ]
    };
    this.handleScroll = this.handleScroll.bind(this)
    this.renderScreen = this.renderScreen.bind(this)
    this.setActiveScreen = this.setActiveScreen.bind(this)
  }


  setActiveScreen(e) {
    const { contentOffset, contentSize } = e.nativeEvent;
    this.setState({
      activeScreen: Math.floor(contentOffset.x * 4 / contentSize.width)
    })
  }

  handleScroll() {
    Animated.event(
      [{ nativeEvent: { contentOffset: { x: xOffset } } }],
      { useNativeDriver: true }
    )
  }

  renderScreen(screen, index) {

    return (
      <View style={WelcomeCarouselStyle.scrollPage} key={index}>
        <Animated.View style={[WelcomeCarouselStyle.screen, transitionAnimation(index)]}>

            <Image source={gifs[index]} style={WelcomeCarouselStyle.image} />

          <View style={[WelcomeCarouselStyle.circleWraper]}>
            <View style={index === 0 ? WelcomeCarouselStyle.circleActive : WelcomeCarouselStyle.circle}/>
            <View style={index === 1 ? WelcomeCarouselStyle.circleActive : WelcomeCarouselStyle.circle}/>
            <View style={index === 2 ? WelcomeCarouselStyle.circleActive : WelcomeCarouselStyle.circle}/>
            <View style={index === 3 ? WelcomeCarouselStyle.circleActive : WelcomeCarouselStyle.circle}/>
          </View>
          <Text style={WelcomeCarouselStyle.title}>{screen.title}</Text>
          <Text style={WelcomeCarouselStyle.smallDescription}>{screen.smallDescription}</Text>
          <Text style={WelcomeCarouselStyle.largeDescription}>{screen.largeDescription}</Text>
        </Animated.View>
      </View>
    )
  }

  render() {
    const { screens } = this.state;
    return (
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={this.handleScroll}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={this.setActiveScreen}
        showsHorizontalScrollIndicator={false}
        style={WelcomeCarouselStyle.scrollView}
      >

        { screens.map(this.renderScreen) }

      </Animated.ScrollView>
    );
  }
}


