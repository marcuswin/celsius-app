import ACTIONS from '../../config/constants/ACTIONS';
import { BRANCH_LINKS } from '../../config/constants/common';

function initialState() {
    return {
        branchHashes: ['helloworld1234567890'],
    };
}

export default function transfersReducer(state = initialState(), action) {

    switch (action.type) {
      case ACTIONS.BRANCH_LINK_REGISTERED:
        if (action.link.link_type === BRANCH_LINKS.TRANSFER_RECEIVED) {
          return {
            ...state,
            branchHashes: [ ...state.branchHashes, action.link.transfer_hash ]
          };
        }
        break;

    default:
        return { ...state };
    }
}
