import React, {Component} from 'react';
import { Container } from 'native-base';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../../redux/actions";

import BottomNavigation from "../../organisms/BottomNavigation/BottomNavigation";


@connect(
  state => ({
    bottomNavigationDimensions: state.ui.dimensions.bottomNavigation,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class BasicLayout extends Component {
  render() {
    const { bottomNavigation, bottomNavigationDimensions } = this.props;
    let marginBottom;

    if (bottomNavigation) {
      marginBottom = bottomNavigationDimensions.height;
    } else {
      marginBottom = 0;
    }

    return (
      <Container style={{ marginBottom }}>
        { this.props.children }
        { bottomNavigation ? <BottomNavigation /> : null }
      </Container>
    )
  }
}

export default BasicLayout;
