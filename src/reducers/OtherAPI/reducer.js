import * as types from './actionType'

const initState = {
   isLoading: false,
   success: undefined,
   error: undefined,
   tag:undefined,
};

export default function OtherAPI(state = initState, action) {

   switch (action.type) {
     case types.REQUEST_ERROR:
       return { ...state, isLoading: false, error: action.error,success: undefined };

     case types.REQUEST_LOADING:
       return { ...state, isLoading: action.loading, success: undefined, error: undefined };

     case types.REQUEST_SUCCESS:
       return { ...state, isLoading: false, success: action.data };

     case types.REQUSET_API_TAG:
       return { ...state, isLoading: true, tag: action.tag,  success: undefined, error: undefined };

     case types.REQUSET_API_DELETE:
      return {...state, isLoading: false, tag: action.tag,  success: undefined, error: undefined};

     
     default:
       return state;
   }
}