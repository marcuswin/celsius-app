// TODO(fj): probably trash in v3

import React, { Component } from "react";
import { Text, View, Animated, ScrollView, Dimensions, Image } from "react-native";
import WelcomeCarouselStyle from "./WelcomeCarousel.styles";
import OnBoardingCurrencyInterestRateInfoTable
  from "../../organisms/OnBoardingCurrencyInterestRateInfoTable/OnBoardingCurrencyInterestRateInfoTable";
import { heightPercentageToDP, widthPercentageToDP } from "../../../utils/scale";

const { width } = Dimensions.get("window");

const scroll = () => (
    <ScrollView
      // style={WelcomeCarouselStyle.table}
      showsVerticalScrollIndicator={false}
    >
      <OnBoardingCurrencyInterestRateInfoTable/>
    </ScrollView>
  );

const imageOne = () => (
  <ScrollView
    scrollEnabled={false}
  >
    <Image style={{ height: heightPercentageToDP("40.4%"), width: widthPercentageToDP("65%")}} source={require('../../../../assets/images/interactivePart3x.png')}/>
  </ScrollView>
);

const imageTwo = () => (
  <ScrollView
    scrollEnabled={false}
  >
    <Image style={{ resizeMode: 'contain',height: heightPercentageToDP("44.4%"), width: widthPercentageToDP("75%")}} source={require('../../../../assets/images/Conversation3x.png')}/>
  </ScrollView>
);

export default class WelcomeCarousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      xOffset: new Animated.Value(0),
      screens: [
        {
          image: scroll(),
          title: "Earn Interest",
          // smallDescription: "GET COINS FOR YOUR COINS",
          largeDescription: "Earn up to 7%APR* on your favorite digital assets. Interest is distributed every Monday. We know, Mondays have never looked so good.",
          disclaimer: "*interest rates are subject to change"
        },
        {
          image: imageOne(),
          title: "Get a Loan in Dollars",
          // smallDescription: "YOU CAN HODL AND LIVE LARGE",
          largeDescription: "Fiat loans start at just 5%APR*. We are committed to offering the best interest rates you can find. Apply easily in the app and get your loan today!",
          disclaimer: "*interest rates are subject to change"
        },
        {
          image: imageTwo(),
          title: "Send Instantly with CelPay",
          // smallDescription: "NOW, YOU CAN HODL AND LIVE LARGE",
          largeDescription: "Owe your friend $3? Pay them back with your favorite asset via CelPay, whether they have a wallet or not.",
          disclaimer: " "
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
          {screens.map((source, index) => {
              const opaque = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0, 1, 0],
                extrapolate: "clamp"
              });
              return (
                <View key={screens[index].title} style={WelcomeCarouselStyle.scrollPage}>
                  <Animated.View style={[WelcomeCarouselStyle.contentWrapper, {opacity: opaque}]}
                  >
                    {source.image}
                  </Animated.View>
                  <Animated.View style={{opacity: opaque}}>
                    <Text style={WelcomeCarouselStyle.title}>{source.title}</Text>
                    <Text style={WelcomeCarouselStyle.largeDescription}>{source.largeDescription}</Text>
                    <Text style={WelcomeCarouselStyle.disclaimer}>{source.disclaimer}</Text>
                  </Animated.View>
                </View>
              )
            }
          )}
        </ScrollView>
        <View
          style={WelcomeCarouselStyle.circleWrapper}
        >
          {screens.map((_, index) => {
              const opacity = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0.2, 0.6, 0.2],
                extrapolate: "clamp"
              });
              return (
                <Animated.View
                  key={screens[index].title}
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


