import AppNavigator from '../../config/Navigator';

const initialState = {
  index: 0,
  routes: [{ key: 'Init', routeName: 'BankAccountInfo' }],
};

export default (state = initialState, action) =>
  AppNavigator.router.getStateForAction(action, state);
