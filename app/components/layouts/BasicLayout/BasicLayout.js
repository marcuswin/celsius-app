import React, {Component} from 'react';
import { Container } from 'native-base';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as appActions from "../../../redux/actions";

@connect(
  state => ({
    bottomNavigationDimensions: state.ui.dimensions.bottomNavigation,
    activeScreen: state.nav.routes[state.nav.index].routeName,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BasicLayout extends Component {
  constructor (props) {
    super(props);

    this.state = {
      screen: props.activeScreen,
    }
  }

  componentDidMount() {
    const {bottomNavigation, actions} = this.props;

    actions.displayBottomNavigation(!!bottomNavigation);
  }

  componentWillReceiveProps({ activeScreen }) {
    const {bottomNavigation, actions} = this.props;
    const {screen} = this.state;

    if (activeScreen === screen && activeScreen !== this.props.activeScreen) {
      actions.displayBottomNavigation(!!bottomNavigation);
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
      <Container style={{ marginBottom, flex: 1 }}>
        { this.props.children }
      </Container>
    )
  }
}

export default BasicLayout;
