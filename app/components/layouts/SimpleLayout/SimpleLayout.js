import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Container, Content, View } from 'native-base';

import {STYLES} from "../../../config/constants/style";
import {Message} from '../../atoms/Message/Message';
import {MainHeader} from '../../molecules/MainHeader/MainHeader';
import {AnimatedHeading} from '../../molecules/AnimatedHeading/AnimatedHeading';
import BottomNavigation from "../../organisms/BottomNavigation/BottomNavigation";
import Avatar from "../../atoms/Avatar/Avatar";

import SimpleLayoutStyle from "./SimpleLayout.styles";


const styles = StyleSheet.create({
  imageWrapper: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: 210,
    left: 0,
    top: 100,
    position: 'absolute',
  },
  imageCircleWrapper: {
    height: 200,
    width: 200,
    borderRadius: 210 / 2,
    backgroundColor: STYLES.GRAY_3,
  },
  rectangleElement: {
    position: 'absolute',
    height: 100,
    top: 110,
    width: '100%',
    backgroundColor: STYLES.GRAY_3,
  },
  errorWrapper: {
    top: 50,
    position: 'absolute',
    width: '100%',
  }
});


const defaultMainHeader = {
  backButton: true,
  customStyle: {backgroundColor: STYLES.PRIMARY_BLUE},
}

const defaultStatusBar = {
  barStyle: 'dark-content',
}

const defaultAnimatedHeading = {
  containerCustomStyles: {backgroundColor: STYLES.PRIMARY_BLUE},
}

const SimpleLayout = (props) => {
  const { bottomNavigation, statusBar, mainHeader, animatedHeading, background, contentSidePadding } = props;

  const mainHeaderProps = { ...defaultMainHeader, ...mainHeader };
  const statusBarProps = { ...defaultStatusBar, ...statusBar };
  const animatedHeadingProps = { ...defaultAnimatedHeading, ...animatedHeading };
  const contentSidePaddingValue = (contentSidePadding || contentSidePadding === 0) ? contentSidePadding : 36;

  const contentStyles = {};
  contentStyles.backgroundColor = background || undefined;
  contentStyles.marginBottom = bottomNavigation === false ? 0 : 90;
  contentStyles.paddingRight = contentSidePaddingValue;
  contentStyles.paddingLeft = contentSidePaddingValue;

  return (
    <Container>
      <StatusBar { ...statusBarProps } />
      <MainHeader { ...mainHeaderProps } />
      <AnimatedHeading { ...animatedHeadingProps } />

      {!props.showAvatar && <Message />}

      <Content style={[SimpleLayoutStyle.content, contentStyles]}>
        { props.children }
      </Content>
      {props.showAvatar && <View style={styles.imageWrapper}><View style={styles.rectangleElement} /><View style={styles.imageCircleWrapper}><Avatar /></View></View>}
      {props.showAvatar && <View style={styles.errorWrapper}><Message /></View>}
      {bottomNavigation !== false ? <BottomNavigation { ...bottomNavigation } /> : null}
    </Container>
  )
}

export default SimpleLayout;
