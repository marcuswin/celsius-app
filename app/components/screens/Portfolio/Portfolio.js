import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get';

import Loader from '../../atoms/Loader/Loader';
import API from "../../../config/constants/API";
import apiUtil from '../../../utils/api-util';
import * as appActions from "../../../redux/actions";
import ManagePortfolio from '../ManagePortfolio/ManagePortfolio'
import PortfolioOverview from "../PortfolioOverview/PortfolioOverview"

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    portfolio: state.portfolio.portfolio,
    portfolioFormData: state.ui.portfolioFormData,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class PortfolioScreen extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.getPortfolio();
  }

  render() {
    const { portfolio, callsInProgress } = this.props;

    const portfolioData = get(portfolio, 'data', []);
    const isLoading = !portfolioData.length && apiUtil.areCallsInProgress([API.GET_PORTFOLIO_REQUEST, API.GET_SUPPORTED_CURRENCIES], callsInProgress);

    if (isLoading) return <Loader text="Loading Tracker Page" />

    return (!isLoading && !isEmpty(portfolioData)) ? <PortfolioOverview /> : <ManagePortfolio />
  }
}

export default PortfolioScreen;
