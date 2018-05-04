import React from 'react';
import { StatusBar } from 'react-native';
import { Container, Content } from 'native-base';

import {STYLES} from "../../../config/constants/style";
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
  const { bottomNavigation, statusBar, mainHeader, animatedHeading } = props;

  const mainHeaderProps = { ...defaultMainHeader, ...mainHeader };
  const statusBarProps = { ...defaultStatusBar, ...statusBar };
  const animatedHeadingProps = { ...defaultAnimatedHeading, ...animatedHeading };

  return (
    <Container>
      <StatusBar { ...statusBarProps } />
      <MainHeader { ...mainHeaderProps } />
      <AnimatedHeading { ...animatedHeadingProps } />

      <Content style={SimpleLayoutStyle.content}>
        { props.children }
      </Content>

      <BottomNavigation { ...bottomNavigation } />
    </Container>
  )
}

export default SimpleLayout;
