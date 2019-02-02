import React, { Component } from "react";

import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import LoadingState from "../../atoms/LoadingState/LoadingState";

class LoadingScreen extends Component {
  static defaultProps = {}
  render() {
    const { header, loadingState } = this.props;
    return (
      <RegularLayout header={header}>
        <LoadingState { ...loadingState } />
      </RegularLayout>
    );
  }
}

export default LoadingScreen;
