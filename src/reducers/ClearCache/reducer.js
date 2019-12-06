import * as types from './actionType'

import Reactotron from 'reactotron-react-native';
const initState = {
   isClear: "",
};

export default function clearCache(state = initState, action) {
    switch (action.type) {
        case types.CLEAR_CACHE:
                Reactotron.log({HUHU:action.isClear})
        return { ...state, isClear:action.isClear};
        
        default:
        return state;
    }
}