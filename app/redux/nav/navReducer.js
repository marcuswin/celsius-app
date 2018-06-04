import AppNavigator from '../../config/Navigator';

const initialState = {
  index: 0,
  routes: [{ key: 'Init', routeName: 'Welcome' }],
};



export default (state = initialState, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};
