import { combineReducers } from 'redux';

import nav from './nav/navReducer';
import api from './api/apiReducer';
import ui from './ui/uiReducer';
import users from './users/usersReducer';
import generalData from './generalData/generalDataReducer';
import wallet from './wallet/walletReducer';
import interest from './interest/interestReducer';
import branch from './branch/branchReducer';
import transfers from './transfers/transfersReducer';
import cameraRoll from './cameraRoll/cameraRollReducer';
import loans from './loans/loansReducer';
// NOTE(fj): plop reduxGen importing new Reducer here

export default combineReducers({
  api,
  nav,
  users,
  ui,
  generalData,
  wallet,
  interest,
  branch,
  transfers,
  cameraRoll,
  loans,
  // NOTE(fj): plop reduxGen inserting new Reducer here
});
