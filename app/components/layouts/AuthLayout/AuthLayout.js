import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import AuthLayoutStyle from "./AuthLayout.styles";
import RegularLayout from '../RegularLayout/RegularLayout';
import { THEMES } from '../../../constants/UI';

@connect(
  state => ({
    style: AuthLayoutStyle(state.ui.theme),
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class AuthLayout extends Component {

  static propTypes = {
    header: PropTypes.instanceOf(Object).isRequired,
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children, header } = this.props
    const theme = THEMES.LIGHT
    const navHeader = {
      transparent: true,
      theme,
      ...header
    }

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { theme })
    );

    return (
      <RegularLayout header={navHeader} theme={theme}>
        {childrenWithProps}
      </RegularLayout>
    );
  }
}

export default testUtil.hookComponent(AuthLayout);
