import {
    ETH_AMOUNT,
    BECOME_KING
} from '../actions/types';

const initialState = {
   ethAmount: 0,
   becomeKing: null
};

export default function (state = initialState, action) {
    switch (action.type) {
    case ETH_AMOUNT:
        return {
            ...state,
            ethAmount: action.payload
        };
    case BECOME_KING:
        return {
            ...state,
            becomeKing: action.payload
        };
    default:
        return state;
    }
}
