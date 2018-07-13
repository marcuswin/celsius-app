import React, {Component} from 'react';
import { Platform, ScrollView } from "react-native";
import { Container } from 'native-base';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {STYLES} from "../../../config/constants/style";
import Message from '../../atoms/Message/Message';
import {MainHeader} from '../../molecules/MainHeader/MainHeader';

import * as actions from "../../../redux/actions";
import SimpleLayoutStyle from "./SimpleLayout.styles";
import CelHeading from "../../atoms/CelHeading/CelHeading";

const defaultMainHeader = {
  backButton: true,
  customStyle: {backgroundColor: STYLES.PRIMARY_BLUE},
}

const defaultAnimatedHeading = {
  containerCustomStyles: {backgroundColor: STYLES.PRIMARY_BLUE},
}

@connect(
  state => ({
    bottomNavigationDimensions: state.ui.dimensions.bottomNavigation,
    scrollToY: state.ui.scrollTo,
    keyboardHeight: state.ui.keyboardHeight,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class SimpleLayout extends Component {
  constructor (props) {
    super(props);
    props.setScrollPosition(0);

    this.state = {
      screen: props.activeScreen,
    }
  }

  componentDidMount() {
    const {bottomNavigation, displayBottomNavigation} = this.props;

    displayBottomNavigation(!(bottomNavigation === false));
  }

  componentWillReceiveProps({ scrollToY, activeScreen }) {
    const {bottomNavigation, displayBottomNavigation} = this.props;
    const {screen} = this.state;

    if (!isNaN(scrollToY) && scrollToY !== this.props.scrollToY) {
      this.scrollView.scrollTo({ y: scrollToY, animated: true });
    }

    if (activeScreen === screen && activeScreen !== this.props.activeScreen) {
      this.scrollView.scrollTo({ y: 0, animated: false });
      displayBottomNavigation(!(bottomNavigation === false));
    }
  }

  render() {
    const {
      bottomNavigation,
      mainHeader,
      animatedHeading,
      background,
      contentSidePadding,
      bottomNavigationDimensions,
      keyboardHeight
    } = this.props;

    const mainHeaderProps = { ...defaultMainHeader, ...mainHeader };
    const animatedHeadingProps = { ...defaultAnimatedHeading, ...animatedHeading };
    const contentSidePaddingValue = (contentSidePadding || contentSidePadding === 0) ? contentSidePadding : 36;
    const contentStyles = {};
    contentStyles.backgroundColor = background || undefined;

    if (bottomNavigation === false) {
      contentStyles.marginBottom = 0;
    } else {
      contentStyles.marginBottom = bottomNavigationDimensions.height;
    }

    contentStyles.paddingRight = contentSidePaddingValue;
    contentStyles.paddingLeft = contentSidePaddingValue;

    // add margin to Android when keyboard is open
    contentStyles.marginBottom = Platform.OS === 'android' && keyboardHeight ? keyboardHeight : contentStyles.marginBottom;

    return (
      <Container style={{flex: 1,}}>
        <MainHeader { ...mainHeaderProps } />
        <CelHeading { ...animatedHeadingProps } />

        <Message inverted={background}/>

        <ScrollView
          style={[SimpleLayoutStyle.content, contentStyles]}
          enableOnAndroid
          ref={component => { this.scrollView = component }}
          onScroll={() => this.props.scrollTo()}
          scrollEventThrottle={0}
          onScrollEndDrag={e => { this.props.setScrollPosition(e.nativeEvent.contentOffset.y) }}
        >
          { this.props.children }
        </ScrollView>
      </Container>
    )
  }
}

export default SimpleLayout;
