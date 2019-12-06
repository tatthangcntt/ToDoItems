import * as types from './actionType'

import Reactotron from 'reactotron-react-native';
const initState = {
   language: "",
};

export default function ChangeLang(state = initState, action) {
    switch (action.type) {
        case types.CHANGE_LANG:
                Reactotron.log({HUHU:action.language})
        return { ...state, language:action.language};
        
        default:
        return state;
    }
}