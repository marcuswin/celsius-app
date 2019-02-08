import React, { Component } from 'react';
import PropTypes from 'prop-types';

import testUtil from "../../../utils/test-util";
import RegularLayout from '../RegularLayout/RegularLayout';
import { THEMES } from '../../../constants/UI';

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
