
import * as types from './actionTypes'

const initState = {
    data: undefined,
};
export default function Saga(state = initState, action) {
    console.log("reducers::action::", action);
    switch (action.type) { 
        case types.HIDEN_TAB_BOTTOM:
            return { ...state, data: action.data };
        case types.SHOW_TAB_BOTTOM:
            return { ...state, data: action.data };
        default:
            return state;
    }
}
