import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import EmptyState from "../../atoms/EmptyState/EmptyState";
// import StaticScreenStyle from "./StaticScreen.styles";

@connect(
  () => ({
    // map state to props
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class StaticScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
