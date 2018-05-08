import { combineReducers } from 'redux';

import nav from './nav/navReducer';
import api from './api/apiReducer';
import ui from './ui/uiReducer';
import loanRequests from './loanRequests/loanRequestsReducer';
import portfolio from './portfolio/portfolioReducer';
import users from './users/usersReducer';
import earnInterest from './earnInterest/earnInterestReducer';
// NOTE(fj): plop reduxGen importing new Reducer here

export default combineReducers({
  api,
  nav,
  loanRequests,
  users,
  ui,
  earnInterest,
  portfolio,
  // NOTE(fj): plop reduxGen inserting new Reducer here
});
