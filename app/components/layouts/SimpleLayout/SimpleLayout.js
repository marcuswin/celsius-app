import React from 'react';
import { Container, Content } from 'native-base';

import device from '../../../utils/device-util'
import {STYLES} from "../../../config/constants/style";
import {Message} from '../../atoms/Message/Message';
import {MainHeader} from '../../molecules/MainHeader/MainHeader';
import BottomNavigation from "../../organisms/BottomNavigation/BottomNavigation";

import SimpleLayoutStyle from "./SimpleLayout.styles";
import CelHeading from "../../atoms/CelHeading/CelHeading";

const defaultMainHeader = {
  backButton: true,
  customStyle: {backgroundColor: STYLES.PRIMARY_BLUE},
}

const defaultAnimatedHeading = {
  containerCustomStyles: {backgroundColor: STYLES.PRIMARY_BLUE},
}

const SimpleLayout = (props) => {
  const { bottomNavigation, mainHeader, animatedHeading, background, contentSidePadding } = props;

  const mainHeaderProps = { ...defaultMainHeader, ...mainHeader };
  const animatedHeadingProps = { ...defaultAnimatedHeading, ...animatedHeading };
  const contentSidePaddingValue = (contentSidePadding || contentSidePadding === 0) ? contentSidePadding : 36;
  const contentStyles = {};
  contentStyles.backgroundColor = background || undefined;

  if (bottomNavigation === false) {
    contentStyles.marginBottom = 0;
  } else {
    contentStyles.marginBottom = device.isiPhoneX() ? 90 : 60;
  }

  contentStyles.paddingRight = contentSidePaddingValue;
  contentStyles.paddingLeft = contentSidePaddingValue;
  return (
    <Container>
      <MainHeader { ...mainHeaderProps } />
      <CelHeading { ...animatedHeadingProps } />

      <Message/>

      <Content style={[SimpleLayoutStyle.content, contentStyles]}>
        { props.children }
      </Content>

      {bottomNavigation !== false ? <BottomNavigation { ...bottomNavigation } /> : null}
    </Container>
  )
}

export default SimpleLayout;
