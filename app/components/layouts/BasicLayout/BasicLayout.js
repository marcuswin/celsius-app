import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as appActions from "../../../redux/actions";
import {COLORS} from "../../../config/constants/style";
import Message from "../../atoms/Message/Message";

@connect(
  state => ({
    bottomNavigationDimensions: state.ui.dimensions.bottomNavigation,
    activeScreen: state.nav.routes[state.nav.index].routeName,
    hasBottomNavigation: state.ui.hasBottomNavigation,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BasicLayout extends Component {
  static propTypes = {
    background: PropTypes.oneOf(Object.keys(COLORS)),
  }

  constructor (props) {
    super(props);

    this.state = {
      screen: props.activeScreen,
    }
  }

  render() {
    const { hasBottomNavigation, bottomNavigationDimensions, background } = this.props;
    let marginBottom;

    if (hasBottomNavigation) {
      marginBottom = bottomNavigationDimensions.height;
    } else {
      marginBottom = 0;
    }

    const backgroundColor = background ? { backgroundColor: COLORS[background] } : {};

    return (
      <Container style={[{ marginBottom, flex: 1 }, backgroundColor]}>
        <Message />
        { this.props.children }
      </Container>
    )
  }
}

export default BasicLayout;
