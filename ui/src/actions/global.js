import {
	WIPE_STATE,

	GET_GIFS_REQUEST,
	GET_GIFS_SUCCESS,
	GET_GIFS_FAILED,

	GET_TREND_REQUEST,
	GET_TREND_SUCCESS,
	GET_TREND_FAILED,

	GET_RATED_REQUEST,
	GET_RATED_SUCCESS,
	GET_RATED_FAILED,

	GET_RATINGS_REQUEST,
	GET_RATINGS_SUCCESS,
	GET_RATINGS_FAILED,

	SET_RATING,
	SET_RATING_REQUEST,
	SET_RATING_SUCCESS,
	SET_RATING_FAILED,

	SET_ACTIVE_ITEM,
	NEW_SEARCH,
	END_OF_GIFS,
	LOAD,
	SET_MODE,
} from './types';

import { fromJS, Map } from 'immutable';
import { constants } from '../i18n/constants';

const APP_KEY = constants.APP_STORAGE_KEY;

export function wipeState() {
	return {
		type: WIPE_STATE
	}
}

export function fetchRatings() {
	return {
		type: GET_RATINGS_REQUEST,
	}
}
export function fetchRatingsSuccess(ratings) {
	return {
		type: GET_RATINGS_SUCCESS,
		payload: {
			ratings,
		}
	}
}
export function fetchRatingsFailed() {
	return {
		type: GET_RATINGS_FAILED,
	}
}

export function setRating(id, rating) {
	return {
		type: SET_RATING,
		payload: {
			id,
			rating,
		}
	}
}
export function setRatingRequest() {
	return {
		type: SET_RATING_REQUEST,
	}
}
export function setRatingSuccess(ratings) {
	return {
		type: SET_RATING_SUCCESS,
		payload: {
			ratings
		}
	}
}
export function setRatingFailed() {
	return {
		type: SET_RATING_FAILED,
	}
}

export function setMode(mode) {
	return {
		type: SET_MODE,
		payload: {
			mode,
		}
	}
}

export function fetchGifs() {
	return {
		type: GET_GIFS_REQUEST
	}
}
export function fetchGifsSuccess(gifs) {
	return {
		type: GET_GIFS_SUCCESS,
		payload: {
			gifs,
		}
	}
}
export function fetchGifsFailed() {
	return {
		type: GET_GIFS_FAILED
	}
}


export function fetchTrending() {
	return {
		type: GET_TREND_REQUEST
	}
}
export function fetchTrendingSuccess(gifs) {
	return {
		type: GET_TREND_SUCCESS,
		payload: {
			gifs,
		}
	}
}
export function fetchTrendingFailed() {
	return {
		type: GET_TREND_FAILED
	}
}

// rated gifs
export function fetchRated() {
	return {
		type: GET_RATED_REQUEST
	}
}
export function fetchRatedSuccess(gifs) {
	return {
		type: GET_RATED_SUCCESS,
		payload: {
			gifs,
		}
	}
}
export function fetchRatedFailed() {
	return {
		type: GET_RATED_FAILED
	}
}



export function setActiveItem(item) {
	return {
		type: SET_ACTIVE_ITEM,
		payload: {
			item,
		}
	}
}

export function endOfGIFS() {
	return {
		type: END_OF_GIFS,
	}
}

export function newSearch(keywords) {
	const whitespaceReg = /\s+/;
	return {
		type: NEW_SEARCH,
		payload: {
			keywords: keywords.split(whitespaceReg).join('+'),
		}
	}
}

export function load() {
	return {
		type: LOAD,
	}
}

