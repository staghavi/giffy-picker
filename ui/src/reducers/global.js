import { handleActions } from 'redux-actions';
import { fromJS, List, Map } from 'immutable';
import { constants } from '../i18n/constants';

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
	SET_MODE,
} from '../actions/types';

const initialState = fromJS({
	gifs: List([]),
	isFetching: false,
	activeItem: Map({}),
	keywords: '',
	endOfGIFS: false,
	mode: constants.MODES.TRENDING,
	ratings: Map({}),
});

const globalReducer = handleActions({
	[WIPE_STATE]: state => {
		return initialState;
	},
	[END_OF_GIFS]: state => {
		return state.set('endOfGIFS', true);
	},
	[NEW_SEARCH]: (state, action) => {
		return state.merge({
			keywords: action.payload.keywords,
			gifs: List([]),
			endOfGIFS: false,
			mode: constants.MODES.SEARCH,
		});
	},
	[GET_GIFS_REQUEST]: state => {
		return state.set('isFetching', true);
	},
	[GET_GIFS_SUCCESS]: (state, action) => {
		const withRatings = action.payload.gifs.map(gif =>
			gif.set('stars', state.getIn(['ratings', gif.get('id')], 0)));
		return state.merge({
			isFetching: false,
			gifs: state.get('gifs', List([]))
					   .push(...withRatings)
		});
	},
	[GET_GIFS_FAILED]: state => {
		return state.set('isFetching', false);
	},
	[GET_TREND_REQUEST]: state => {
		return state.set('isFetching', true);
	},
	[GET_TREND_SUCCESS]: (state, action) => {
		const withRatings = action.payload.gifs.map(gif => {
			return gif.set('stars', state.getIn(['ratings', gif.get('id')], 0));
		});
		return state.merge({
			isFetching: false,
			gifs: state.get('gifs', List([]))
			   		   .push(...withRatings)
		});
	},
	[GET_TREND_FAILED]: state => {
		return state.set('isFetching', false);
	},
	[GET_RATED_REQUEST]: state => {
		return state.set('isFetching', true);
	},
	[GET_RATED_SUCCESS]: (state, action) => {
		const withRatings = action.payload.gifs.map(gif => {
			return gif.set('stars', state.getIn(['ratings', gif.get('id')], 0));
		});
		return state.merge({
			isFetching: false,
			gifs: state.get('gifs', List([]))
			   		   .push(...withRatings)
		});
	},
	[GET_RATED_FAILED]: state => {
		return state.set('isFetching', false);
	},
	[GET_RATINGS_REQUEST]: state => {
		return state.set('isFetching', true);
	},
	[GET_RATINGS_SUCCESS]: (state, action) => {
		return state.merge({
			isFetching: false,
			ratings: action.payload.ratings
		});
	},
	[GET_RATINGS_FAILED]: state => {
		return state.set('isFetching', false);
	},
	[SET_RATING]: (state, action) => { // maybe ratings should always be checked instead.
		const gifIdx = state.get('gifs')
												.findIndex(gif => gif.get('id') === action.payload.id);
		return state.setIn(['gifs', gifIdx, 'stars'], action.payload.rating);
	},
	[SET_RATING_REQUEST]: state => {
		return state.set('isFetching', true);
	},
	[SET_RATING_FAILED]: state => {
		return state.set('isFetching', false);
	},
	[SET_RATING_SUCCESS]: (state, action) => {
		return state.merge({
			isFetching: false,
			ratings: action.payload.ratings
		});
	},
	[SET_ACTIVE_ITEM]: (state, action) => {
		return state.set('activeItem', action.payload.item);
	},
	[SET_MODE]: (state, action) => {
		return state.merge({
			gifs: List([]),
			mode: action.payload.mode,
			endOfGIFS: false,
		});
	}
}, initialState);

export default globalReducer;