import { combineReducers } from 'redux';
import nav from './nav';
import api from './api';
import ui from './ui';
import loanRequests from './loanRequests';
import users from './users';
import earnInterest from './earnInterest';

export default combineReducers({
  api,
  nav,
  loanRequests,
  users,
  ui, 
  earnInterest
});
