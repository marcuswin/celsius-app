import React, {Component} from 'react';
import { Container, Content } from 'native-base';
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
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class SimpleLayout extends Component {
  render() {
    const { bottomNavigation, mainHeader, animatedHeading, background, contentSidePadding, bottomNavigationDimensions } = this.props;

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

    return (
      <Container>
        <MainHeader { ...mainHeaderProps } />
        <CelHeading { ...animatedHeadingProps } />

        <Message inverted={background}/>

        <Content style={[SimpleLayoutStyle.content, contentStyles]}>
          { this.props.children }
        </Content>

        {bottomNavigation !== false ? <BottomNavigation { ...bottomNavigation } /> : null}
      </Container>
    )
  }
}

export default SimpleLayout;
