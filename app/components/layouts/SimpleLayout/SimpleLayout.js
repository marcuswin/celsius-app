import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Container, Content, View } from 'native-base';

import device from '../../../utils/device-util'
import {STYLES} from "../../../config/constants/style";
import {Message} from '../../atoms/Message/Message';
import {MainHeader} from '../../molecules/MainHeader/MainHeader';
import BottomNavigation from "../../organisms/BottomNavigation/BottomNavigation";
import Avatar from "../../atoms/Avatar/Avatar";

import SimpleLayoutStyle from "./SimpleLayout.styles";
import CelHeading from "../../atoms/CelHeading/CelHeading";

const width = Dimensions.get("window").width;
const avatarSize = width / 2;

const styles = StyleSheet.create({
  imageWrapper: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: avatarSize,
    left: 0,
    top: 50,
    position: 'absolute',
  },
  imageCircleWrapper: {
    height: avatarSize,
    width: avatarSize,
    borderRadius: avatarSize,
    backgroundColor: STYLES.GRAY_3,
  },
  rectangleElement: {
    position: 'absolute',
    height: avatarSize / 2,
    bottom: 0,
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
  const marginTop = width < 340 ? (avatarSize / 2) - 30 : avatarSize / 2; // todo - should be better handling smaller screen
  contentStyles.marginTop = props.showAvatar ? marginTop : undefined;

  return (
    <Container>
      <MainHeader { ...mainHeaderProps } />
      <CelHeading { ...animatedHeadingProps } />

      {!props.showAvatar && <Message />}

      <Content style={[SimpleLayoutStyle.content, contentStyles]}>
        { props.children }
      </Content>
      {props.showAvatar &&
        <View style={styles.imageWrapper}>
          <View style={styles.rectangleElement} />
          <View style={styles.imageCircleWrapper}>
            <Avatar />
          </View>
        </View>
      }
      {props.showAvatar && <View style={styles.errorWrapper}><Message /></View>}
      {bottomNavigation !== false ? <BottomNavigation { ...bottomNavigation } /> : null}
    </Container>
  )
}

export default SimpleLayout;
