import * as types from './actionTypes';
import {Appconst} from '../../utils/Appconst'

export function UpdateDataUser(data) {
    return (dispatch, getState) => {
        dispatch(updateData(data))
    }
}
export function RemoveDataUser() {
    return (dispatch, getState) => {
        dispatch(removeData())
    }
}
export function hidenTabBottom() {
    return (dispatch, getState) => {
        dispatch(hideAction())
    }
}
export function showTabBottom()
{
    return (dispatch, getState) => {
        dispatch(showAction())
    }
}
export function showNotification(data) {
    return (dispatch, getState) => {
        dispatch(showNotifi(data))
    }
}
const showNotifi = (data) =>(
    {
        type: types.SHOW_NOTIFICATION_BANNER,
        tag: Appconst.TagAction.SHOW_NOTIFICATION_BANNER,
        data:data
    }  
)
const hideAction= () =>(
    {
        type: types.HIDEN_TAB_BOTTOM,
        tag: Appconst.TagAction.HIDEN_TAB_BOTTOM
    }
)
const showAction = () => (
    {
        type: types.SHOW_TAB_BOTTOM,
        tag: Appconst.TagAction.SHOW_TAB_BOTTOM,
        //data: data,
    }
)
const updateData = data => (
    {
        type: types.UPDATE_DATA,
        data: data,
        tag: Appconst.TagAction.TAG_UPDATE_DATA
    }
)
const removeData = data => (
    {
        type: types.UPDATE_DATA,
        data: data,
        tag: Appconst.TagAction.TAG_UPDATE_DATA
    }
)
