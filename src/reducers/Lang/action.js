import * as Types from "./actionType";

import Reactotron from 'reactotron-react-native';

export function language(lang)
{
    Reactotron.log({ACTIONREDUC:lang})
  return (dispatch, getState) => {
    var result = dispatch(resultSuccess(lang));
    return result;
  }
}
const resultSuccess = data => ({
  type: Types.CHANGE_LANG,
  language: data
});
  