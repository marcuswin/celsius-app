import ACTIONS from '../../config/constants/ACTIONS';

function initialState() {
    return {
        branchHashes: ['helloworld1234567890'],
    };
}

export default function transfersReducer(state = initialState(), action) {

    switch (action.type) {
      case ACTIONS.BRANCH_LINK_REGISTERED:
        if (action.link.link_type === 'TRANSFER_RECEIVED') {
          return {
            ...state,
            branchHashes: [ ...state.branchHashes, action.link.transfer_hash ]
          };
        }

    default:
        return { ...state };
    }
}
