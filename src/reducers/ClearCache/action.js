import * as Types from "./actionType";

import Reactotron from 'reactotron-react-native';

export function clearCache(action)
{
    Reactotron.log({ACTIONREDUC:action})
  return (dispatch, getState) => {
    var result = dispatch(resultSuccess(action));
    return result;
  }
}
const resultSuccess = data => ({
  type: Types.CLEAR_CACHE,
  isClear: data
});
  