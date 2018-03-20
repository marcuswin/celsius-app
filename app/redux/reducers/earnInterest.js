import ACTIONS from '../../config/constants/ACTIONS';

const initialState = {
  interestData: undefined,
  interestDataQue: undefined
};

export default (state = initialState, action) => {
  const { interestData, interestDataQue } = action;

  switch(action.type) {
    case ACTIONS.CREATE_INTEREST_SUCCESS:
      return {
        ...state,
        interestData
      };

    case ACTIONS.ACCEPT_INTEREST_SUCCESS:
      return {
        ...state,
        interestDataQue,
      };

    default:
      return { ...state };

  }
}
