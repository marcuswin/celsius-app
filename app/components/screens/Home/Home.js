import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get';

import Loader from '../../atoms/Loader/Loader';
import API from "../../../config/constants/API";
import apiUtil from '../../../utils/api-util';
import * as actions from "../../../redux/actions";
import ManagePortfolio from '../ManagePortfolio'
import PortfolioOverview from "../../screens/PortfolioOverview"

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    portfolio: state.portfolio.portfolio,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => bindActionCreators(actions, dispatch),
)

class HomeScreen extends Component {
  componentDidMount() {
    const { getPortfolio } = this.props;
    getPortfolio();
  }

  render() {
    const isLoading = apiUtil.areCallsInProgress([API.GET_PORTFOLIO_REQUEST, API.GET_SUPPORTED_CURRENCIES], this.props.callsInProgress);
    if (isLoading) {
      return <Loader />
    }
    const portfolioData = get(this.props.portfolio, 'data', []);
    return (!isLoading && !isEmpty(portfolioData)) ? <PortfolioOverview /> : <ManagePortfolio />
  }
}

export default HomeScreen;
