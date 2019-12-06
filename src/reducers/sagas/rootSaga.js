import { takeEvery,fork,takeLatest,call, put, take} from 'redux-saga/effects';
import { fetchShowTabBottom, watchFetchShowTabBottom } from './actionsSaga';
import * as types from './actionTypes'
// import { watchHidenBottom } from './actionsSaga';
export default function* rootSaga() {
    yield [
      take(fetchShowTabBottom )
    ];
    //yield[takeLatest(types.SHOW_TAB_BOTTOM, fetchShowTabBottom)]
}