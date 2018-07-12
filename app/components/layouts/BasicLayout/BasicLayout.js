import React, {Component} from 'react';
import { Container } from 'native-base';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../../../redux/actions";

@connect(
  state => ({
    bottomNavigationDimensions: state.ui.dimensions.bottomNavigation,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)
class BasicLayout extends Component {
  constructor (props) {
    super(props);

    this.state = {
      screen: props.activeScreen,
    }
  }

  componentDidMount() {
    const {bottomNavigation, displayBottomNavigation} = this.props;

    displayBottomNavigation(!!bottomNavigation);
  }

  componentWillReceiveProps({ activeScreen }) {
    const {bottomNavigation, displayBottomNavigation} = this.props;
    const {screen} = this.state;

    if (activeScreen === screen && activeScreen !== this.props.activeScreen) {
      displayBottomNavigation(!!bottomNavigation);
    }
  }

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
      </Container>
    )
  }
}

export default BasicLayout;
