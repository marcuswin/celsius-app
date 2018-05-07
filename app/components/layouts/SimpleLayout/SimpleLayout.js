import React from 'react';
import { StatusBar } from 'react-native';
import { Container, Content } from 'native-base';

import {STYLES} from "../../../config/constants/style";
import {Message} from '../../atoms/Message/Message';
import {MainHeader} from '../../molecules/MainHeader/MainHeader';
import {AnimatedHeading} from '../../molecules/AnimatedHeading/AnimatedHeading';
import BottomNavigation from "../../organisms/BottomNavigation/BottomNavigation";

import SimpleLayoutStyle from "./SimpleLayout.styles";

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
  const { bottomNavigation, statusBar, mainHeader, animatedHeading, background } = props;

  const mainHeaderProps = { ...defaultMainHeader, ...mainHeader };
  const statusBarProps = { ...defaultStatusBar, ...statusBar };
  const animatedHeadingProps = { ...defaultAnimatedHeading, ...animatedHeading };

  return (
    <Container>
      <StatusBar { ...statusBarProps } />
      <MainHeader { ...mainHeaderProps } />
      <AnimatedHeading { ...animatedHeadingProps } />

      <Message />

      <Content style={[SimpleLayoutStyle.content, { backgroundColor: background }]}>
        { props.children }
      </Content>

      { bottomNavigation !== false ? <BottomNavigation { ...bottomNavigation } /> : null }
    </Container>
  )
}

export default SimpleLayout;
