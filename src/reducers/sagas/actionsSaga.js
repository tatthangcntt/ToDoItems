import * as types from './actionTypes'
import { put, takeLatest,take,call, takeEvery } from 'redux-saga/effects';

export function* fetchShowTabBottom() {
    try {
        //const showTabBottom = yield Api.showTabBottom(); 
        console.log("fetchShowTabBottom");
        yield put({type: types.SHOW_TAB_BOTTOM,data:"fetchShowTabBottom::Saga"});     
    } catch (error) {        
        yield put({ type: types.HIDEN_TAB_BOTTOM, error });
    }
}
// export function* watchFetchShowTabBottom() { 
//     yield takeEvery(types.SHOW_TAB_BOTTOM, fetchShowTabBottom);
// }
// function* fetchHidenTabBottom() {
//     try {
//         const constHidenTabBottom = yield Api.hidenTabBottom();
//         console.log("constHidenTabBottom",constHidenTabBottom);
        
//         yield put(constHidenTabBottom);     
//     } catch (error) {        
//         yield put({ type: types.HIDEN_TAB_BOTTOM, error });
//     }
// }
// export function* watchHidenBottom() { 
//     yield takeLatest(types.HIDEN_TAB_BOTTOM, fetchHidenTabBottom);
// }


// //Add new movie
// function* addNewMovie(action) {            
//     try {
//         const result = yield Api.insertNewMovieFromApi(action.newMovie);
//         if (result === true) {
//             yield put({ type: FETCH_MOVIES, sort: 'desc'});     
//         }
//     } catch (error) {        
//         //do nothing
//     }
// }
// export function* watchAddNewMovie() {            
//     yield takeLatest(ADD_MOVIE, addNewMovie);
// }