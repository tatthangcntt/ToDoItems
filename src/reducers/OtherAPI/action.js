import * as Types from "./actionType";
import axios from "axios";
import MyRequest from "../../utils/MyRequest";
import axiosCancel from "../../utils/CustomRequest/index";
import { BaseScreen, Base } from "../../screens/BaseScreen";
import AlertCustom from "../../utils/AlertCustom"

axiosCancel(MyRequest.getInstance(), {debug: false})

// export function getData() {
//     return {
//         type: Types.FETCHING_DATA
//     }
// }
// export function getDataSuccess(data) {
//     return {
//         type: Types.FETCHING_DATA_SUCCESS,
//         data,
//     }
// }
// export function getDataFailure() {
//     return {
//         type: Types.FETCHING_DATA_FAILURE
//     }
// }

export function fetchData() { }
//
// search requestGetInfoSearch
export function requestOtherApi(url,tag,params) {
    return (dispatch, getState) => {
        dispatch(setTag(tag));
        console.log("url::", url);
        console.log("params::", params);
        var myRequest = MyRequest.getInstance()
            .post(url, formAppend(params,dispatch),{requestId: tag})
            .then(response =>returnResponse(response, dispatch))
            .catch(error =>returnError(error, dispatch));
        return myRequest;
    }
}
// get-info-add-product
export function requestGetInfoAddPrduct(params) {
    return (dispatch, getState) => {
        dispatch(setTag(Base.Appconst.TagRequest.TAG_GET_INFO_ADD_PRODUCT));
        var url = Base.KIEU_MAY_CHU+'get-info-add-product';
        var myRequest = MyRequest.getInstance()
            .post(url, formAppend(params,dispatch),{requestId: Base.Appconst.TagRequest.TAG_GET_INFO_ADD_PRODUCT})
            .then(response =>returnResponse(response, dispatch))
            .catch(error =>returnError(error, dispatch));
        return myRequest;
    }
}
// post tao sua san pham
export function requestAddProduct(params) {
    return (dispatch, getState) => {
        dispatch(setTag(Base.Appconst.TagRequest.TAG_ADD_PRODUCT));
        var url = Base.KIEU_MAY_CHU+'add-product';
        var myRequest = MyRequest.getInstance()
            .post(url, formAppend(params,dispatch),{requestId: Base.Appconst.TagRequest.TAG_ADD_PRODUCT})
            .then(response =>returnResponse(response, dispatch))
            .catch(error =>returnError(error, dispatch));
        return myRequest;
    }
}
// end API request
function formAppend(params = undefined,dispatch) {
    dispatch(isLoading(true));
    var form = new FormData();
    form.append("accessKey", "c074a260a644cecc6f757a35ed1e7511");
    if(params != undefined){
        for (var key in params) {
            if(key != 'images'){
                form.append(key,params[key]);
            }else{
                params.images.forEach(function(element) {
                    form.append('images[]',element);
                }, this);
            }
        };
    }
    return form;
}
export function deleteResult()
{
  return (dispatch, getState) => {
    dispatch(removeResult());
  }
}
function returnResponse(response,dispatch) {
    console.log("REPONSE REQUEST::",response);
    switch (response.data.status) {
      case true:
        dispatch(resultSuccess(response.data.data));
        break;
      case false:
        dispatch(resultError(response.data.msg));
        break;
      default:
      console.log("returnResponse::dèlate");
        dispatch(resultError(response.data.msg));
        break;
    } 
}
function returnError(error,dispatch) {
    console.log("REPONSE ERROR REQUEST::", error);
    if (axios.isCancel(error)) {
      dispatch(isLoading(false));
    } else {
        dispatch(resultError(Base.I18n.t("thong_bao_network_error")))
        // if (error.response.msg == undefined) {
        //     console.log("error.response");
        //     dispatch(resultError(Base.I18n.t("thong_bao_network_error")))
        //     // AlertCustom.AlertDefault(Base.I18n.t('thong_bao'),Base.I18n.t("thong_bao_network_error"),Base.I18n.t('dong'))
        // } else {
        //     console.log("error.response != error.response::", error.response);
        //     dispatch(resultError(error.response.message));
        // }
    }
}

const resultError = error => ({
    type: Types.REQUEST_ERROR,
    error: error
  });
  
  const setTag = sTag => ({
    type: Types.REQUSET_API_TAG,
    tag: sTag
  });
  const resultSuccess = data => ({
    type: Types.REQUEST_SUCCESS,
    data: data
  });
  
  const isLoading = isLoading => ({
    type: Types.REQUEST_LOADING,
    loading: isLoading
  });
  
  const removeResult = () => ({
    type:Types.REQUSET_API_DELETE,
})