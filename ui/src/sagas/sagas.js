import {
		call,
		put,
		select,
		race,
		take,
} from "redux-saga/effects";
import { fromJS, List, Map } from 'immutable';

import {
	searchGiphy,
	getTrending,
  getGiphys,
  getRatings,
  setRating,
} from '../middleware/api';

import {
	fetchGifs,
	fetchGifsSuccess,
	fetchGifsFailed,

	fetchTrending,
	fetchTrendingSuccess,
	fetchTrendingFailed,

  fetchRated,
  fetchRatedSuccess,
  fetchRatedFailed,

  fetchRatings,
  fetchRatingsSuccess,
  fetchRatingsFailed,

  setRatingRequest,
  setRatingSuccess,
  setRatingFailed,

	endOfGIFS,
} from '../actions/global';

import {
	NEW_SEARCH,
	LOAD,
  SET_MODE,
  SET_RATING,
} from '../actions/types';

import { constants } from '../i18n/constants';


function* loadTrending() {
	try {
		// offset is not provided for the trending endpoint
		const LIMIT = 25;
		const offset = yield select(state => state.global.get('gifs', List([])).size);
    // call request
		yield put(fetchTrending());
		const resp = yield call(getTrending, LIMIT);
    // turn off infinite scrolling
		yield put(endOfGIFS());
		if (resp.get('error')) throw new Error('failed to fetch trending.');
    // call successful
		const gifs = resp.get('data', List([]));
		yield put(fetchTrendingSuccess(gifs));
	} catch (err) {
		console.error(err);
    // call failed
		yield put(fetchTrendingFailed());
	}
}

function* loadRatings() {
  try {
    // call request
    yield put(fetchRatings());
    const resp = yield call(getRatings);
    if (resp.has('error')) throw new Error('failed to fetch ratings.');
    // call successful
    yield put(fetchRatingsSuccess(resp));
  } catch (err) {
    console.error(err);
    // call failed
    yield put(fetchRatingsFailed());
  } 
}

function* initialLoad() {
  try {
    yield call(loadRatings);
    yield call(loadTrending);
  } catch (err) {
    console.error(err);
  } 
}

function* searchGifs() {
	const {w, h} = constants.COMPONENTS.ITEM.SIZE;
	// limit is based on max api output
	const LIMIT = 25
  	try {
	  	const offset = yield select(state => state.global.get('gifs', List([])).size);
	  	const keywords = yield select(state => state.global.get('keywords', ''));
      // call request
	  	yield put(fetchGifs());
	  	const resp = yield call(searchGiphy, keywords, LIMIT, offset);
	  	if (resp.has('error')) throw new Error('failed search gifs fetch');
      // call successful check if we've fetched all results
	  	const endOfResults = (
	  		(resp.get('data', List([])).size + offset) >=
	  		resp.getIn(['pagination', 'total_count'], 0)
	  	);
      // turn off inifinite scroll if all results fetched
	  	if (endOfResults) yield put(endOfGIFS());
		  const gifs = resp.get('data', List([]));
  		yield put(fetchGifsSuccess(gifs));
  	} catch (err) {
		  console.error(err);
      // call failed
  		yield put(fetchGifsFailed());
  }
}

function* ratedGifs() {
  try {
    // get list of rated ids
    const rated = yield select(state => {
      return state.global.get('ratings', Map({}))
                         .reduce((acc, val, key) => acc.push(key), List([]))
                         .toJS()
                         .join(',')
    });
    // call request
    yield put(fetchRated());
    const resp = yield call(getGiphys, rated);
    if (resp.has('error')) throw new Error('failed search for rated gifs');
    // call successful
    // turn off inifinite scroll as we're fetching everything
    yield put(endOfGIFS());
    const gifs = resp.get('data', List([]));
    yield put(fetchRatedSuccess(gifs));
  } catch (err) {
    // call failed
    console.error(err);
    yield put(fetchRatedFailed());
  }
}

function* newSearch() {
	try {
    yield take(NEW_SEARCH);
    yield call(searchGifs);
  } catch (err) {
    console.error(err);
  }
}

function* load() {
	// switch on what saga to call (fetchSearch vs fetchTrending) based on mode
	try {
    yield take(LOAD);
    const mode = yield select(state => state.global.get('mode'));
    const end = yield select(state => state.global.get('endOfGIFS'));
    if (end) return;
   	switch(mode) {
   		case constants.MODES.SEARCH:
   			yield call(searchGifs);
   			break;
   		case constants.MODES.TRENDING:
   			yield call(loadTrending);
   			break;
      case constants.MODES.RATED:
        	yield call(ratedGifs);
        	break;
   		default:
   			console.error('saga load: Search mode unknown');
   			break;
   	}
  } catch (err) {
    console.error(err);
  }
}

function* postRating() {
  while(true) {
    try {
      const action = yield take(SET_RATING);
      const {id, rating} = action.payload;
      // call setRatingReq
      yield put(setRatingRequest());
      // call api
      const resp = yield call(setRating, id, rating);
      // check error and throw
      if (resp.has('error')) throw new Error('failed search for rated gifs');
      // call success
      yield put(setRatingSuccess(resp));
    } catch (err) {
      // call failed
      console.error(err);
      yield put(setRatingFailed());
    }
  }
}

export function* rootSaga() {
	try {
		yield call(initialLoad);
		while (true) {
	    const tasks = {
        postRating: call(postRating),
		    newSearch: call(newSearch),
		    load: call(load),
	    };
	    yield race(tasks);
		}
	} catch (err) {
  	console.error(err);
  }
}

