import React, { Component } from "react";

import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import EmptyState from "../../atoms/EmptyState/EmptyState";

class StaticScreen extends Component {
  render() {
    const { header, emptyState } = this.props;
    return (
      <RegularLayout header={header}>
        <EmptyState {...emptyState} />
      </RegularLayout>
    );
  }
}

export default StaticScreen;
