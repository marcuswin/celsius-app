import { combineReducers } from 'redux';
import nav from './nav/navReducer';
import api from './api/apiReducer';
import ui from './ui/uiReducer';
import loanRequests from './loanRequests/loanRequestsReducer';
import users from './users/usersReducer';
import earnInterest from './earnInterest/earnInterestReducer';

export default combineReducers({
  api,
  nav,
  loanRequests,
  users,
  ui,
  earnInterest
});
