import React, {Component} from 'react';
import { Platform, ScrollView } from "react-native";
import { Container } from 'native-base';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {STYLES} from "../../../config/constants/style";
import Message from '../../atoms/Message/Message';
import {MainHeader} from '../../molecules/MainHeader/MainHeader';
import BottomNavigation from "../../organisms/BottomNavigation/BottomNavigation";

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
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class SimpleLayout extends Component {
  componentWillReceiveProps({ scrollToY }) {
    if (!isNaN(scrollToY) && scrollToY !== this.props.scrollToY) {
      this.scrollView.scrollTo({ y: scrollToY, animated: true });
    }
  }

  render() {
    const { bottomNavigation, mainHeader, animatedHeading, background, contentSidePadding, bottomNavigationDimensions, keyboardHeight } = this.props;

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
      <Container>
        <MainHeader { ...mainHeaderProps } />
        <CelHeading { ...animatedHeadingProps } />

        <Message inverted={background}/>

        <ScrollView style={[SimpleLayoutStyle.content, contentStyles]} enableOnAndroid ref={component => { this.scrollView = component }} onScroll={() => this.props.scrollTo()}>
          { this.props.children }
        </ScrollView>

        {bottomNavigation !== false ? <BottomNavigation { ...bottomNavigation } /> : null}
      </Container>
    )
  }
}

export default SimpleLayout;
