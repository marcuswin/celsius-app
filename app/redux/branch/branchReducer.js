import ACTIONS from '../../config/constants/ACTIONS';

const initialState = {};

export default function branchReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.BRANCH_LINK_REGISTERED:
      return state;
    default:
      return state;
  }
}
