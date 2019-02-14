// TODO(fj): check all props
// TODO(fj): check if this can be simplified
// TODO(fj): check needs of v3 designs
// TODO(fj): move scroll logic to basic layout or main layout

import React, { Component } from 'react';
import { Platform, ScrollView, View } from "react-native";
// import { Container } from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { STYLES } from "../../../config/constants/style";
import Message from '../../atoms/Message/Message';
import { MainHeader } from '../../molecules/MainHeader/MainHeader';

import * as appActions from "../../../redux/actions";
import SimpleLayoutStyle from "./SimpleLayout.styles";
import CelHeading from "../../atoms/CelHeading/CelHeading";
import TabNavigation from "../../molecules/TabNavigation/TabNavigation";

const defaultMainHeader = {
  backButton: true,
  customStyle: { backgroundColor: STYLES.PRIMARY_BLUE },
}

const defaultAnimatedHeading = {
  containerCustomStyles: { backgroundColor: STYLES.PRIMARY_BLUE },
}

@connect(
  state => ({
    bottomNavigationDimensions: state.ui.dimensions.bottomNavigation,
    hasBottomNavigation: state.ui.hasBottomNavigation,
    scrollToY: state.ui.scrollTo,
    keyboardHeight: state.ui.keyboardHeight,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class SimpleLayout extends Component {
  constructor(props) {
    super(props);
    props.actions.setScrollPosition(0);

    this.state = {
      screen: props.activeScreen,
    }
  }

  componentWillReceiveProps({ scrollToY, activeScreen }) {
    const { screen } = this.state;

    if (!isNaN(scrollToY) && scrollToY !== this.props.scrollToY) {
      this.scrollView.scrollTo({ y: scrollToY, animated: true });
    }

    if (activeScreen === screen && activeScreen !== this.props.activeScreen) {
      this.scrollView.scrollTo({ y: 0, animated: false });
    }
  }

  render() {
    const {
      hasBottomNavigation,
      mainHeader,
      animatedHeading,
      background,
      contentSidePadding,
      bottomNavigationDimensions,
      keyboardHeight,
      actions,
      tabs,
    } = this.props;

    const mainHeaderProps = { ...defaultMainHeader, ...mainHeader };
    const animatedHeadingProps = { ...defaultAnimatedHeading, ...animatedHeading };
    const contentSidePaddingValue = (contentSidePadding || contentSidePadding === 0) ? contentSidePadding : 36;
    const contentStyles = {};
    contentStyles.backgroundColor = background || undefined;

    if (!hasBottomNavigation) {
      contentStyles.marginBottom = 0;
    } else {
      contentStyles.marginBottom = bottomNavigationDimensions.height;
    }

    contentStyles.paddingRight = contentSidePaddingValue;
    contentStyles.paddingLeft = contentSidePaddingValue;

    // add margin to Android when keyboard is open
    contentStyles.marginBottom = Platform.OS === 'android' && keyboardHeight ? keyboardHeight : contentStyles.marginBottom;

    return (
      <Container style={{ flex: 1 }}>
        <MainHeader {...mainHeaderProps} />
        <Message />
        <CelHeading {...animatedHeadingProps} />
        {!!tabs && <TabNavigation tabs={tabs} />}

        <ScrollView
          style={[SimpleLayoutStyle.content, contentStyles]}
          enableOnAndroid
          ref={component => { this.scrollView = component }}
          onScroll={() => actions.scrollTo()}
          scrollEventThrottle={0}
          onScrollEndDrag={e => { actions.setScrollPosition(e.nativeEvent.contentOffset.y) }}
        >
          {this.props.children}
          <View style={{ height: 50 }} />
        </ScrollView>
      </Container>
    )
  }
}

export default SimpleLayout;
