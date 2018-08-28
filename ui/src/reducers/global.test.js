import { List, Map, fromJS } from 'immutable';
import globalReducer from './global';
import assert from 'assert';
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
import { constants } from '../i18n/constants';
import giphyMockResp from '../test/giphyMockResp';
import ratingsMock from '../test/ratingsMock';

const initialState = fromJS({
  gifs: List([]),
  isFetching: false,
  activeItem: Map({}),
  keywords: '',
  endOfGIFS: false,
  mode: constants.MODES.TRENDING,
  ratings: Map({}),
});

const giphyResp = fromJS(giphyMockResp);
const ratingsResp = fromJS(ratingsMock);

const request = initialState.merge({
  isFetching: true,
}).toJS();
const failedRequest = initialState.merge({
  isFetching: false,
}).toJS();

const fetchGifsSucess = initialState.merge({
  gifs: giphyResp.get('data')
                 .map(el => el.set('stars', 0)),
  isFetching: false,
}).toJS();

const fetchRatingsSucess = initialState.merge({
  ratings: ratingsResp,
  isFetching: false,
}).toJS();


const setRating = initialState.merge({
  gifs: giphyResp.get('data')
                 .map(el => el.set('stars', el.get('id') === 'dGJ81LuuTSO0U' ? 5 : 0)),
  isFetching: false,
}).toJS();

const setActiveItem = initialState.merge({
  gifs: giphyResp.get('data')
                 .map(el => el.set('stars', 0)),
  activeItem: giphyResp.get('data')
                       .map(el => el.set('stars', 0))
                       .find(el => el.get('id') === 'dGJ81LuuTSO0U', this, Map({})),
}).toJS();

const newSearch = initialState.merge({
  keywords: 'test',
  gifs: List([]),
  endOfGIFS: false,
  mode: constants.MODES.SEARCH,
}).toJS();


/*  MOCK INFO */
let state = globalReducer(undefined, {});
describe('global reducer', () => {
    beforeEach(() => {
        state = globalReducer(undefined, {});
    });

    describe('inital state', () => {
        it('should be a Map', () => {
            assert.strictEqual(Map.isMap(state), true);
        });
    });

    // GIPHY FETCHING START
    describe('GET_GIFS_REQUEST', () => {
        it('show pending search gifs state', () => {
            state = fireAction(state, { type: GET_GIFS_REQUEST });
            assert.deepEqual(state.toJS(), request);
        });
    });
    describe('GET_GIFS_SUCCESS', () => {
        it('show resolved state after gifs fetched', () => {
            state = fireAction(state, { type: GET_GIFS_REQUEST });
            assert.deepEqual(state.toJS(), request);
            state = fireAction(state, {
                type: GET_GIFS_SUCCESS,
                payload: { gifs: giphyResp.get('data') },
            });
            assert.deepEqual(state.toJS(), fetchGifsSucess);
        });
    });
    describe('GET_GIFS_FAILED', () => {
        it('show failed gifs fetch state', () => {
            state = fireAction(state, { type: GET_GIFS_REQUEST });
            assert.deepEqual(state.toJS(), request);
            state = fireAction(state, { type: GET_GIFS_FAILED });
            assert.deepEqual(state.toJS(), failedRequest);
        });
    });
    // GIPHY FETCHING END

    // GIPHY TRENDING START
    describe('GET_TREND_REQUEST', () => {
        it('show pending trending gifs state', () => {
            state = fireAction(state, { type: GET_TREND_REQUEST });
            assert.deepEqual(state.toJS(), request);
        });
    });
    describe('GET_TREND_SUCCESS', () => {
        it('show resolved state after gifs fetched', () => {
            state = fireAction(state, { type: GET_TREND_REQUEST });
            assert.deepEqual(state.toJS(), request);
            state = fireAction(state, {
                type: GET_TREND_SUCCESS,
                payload: { gifs: giphyResp.get('data') },
            });
            assert.deepEqual(state.toJS(), fetchGifsSucess);
        });
    });
    describe('GET_TREND_FAILED', () => {
        it('show failed trending fetch state', () => {
            state = fireAction(state, { type: GET_TREND_REQUEST });
            assert.deepEqual(state.toJS(), request);
            state = fireAction(state, { type: GET_TREND_FAILED });
            assert.deepEqual(state.toJS(), failedRequest);
        });
    });
    // TRENDING FETCHING END

    // RATED FETCHING START
    describe('GET_RATED_REQUEST', () => {
        it('show pending rated gifs state', () => {
            state = fireAction(state, { type: GET_RATED_REQUEST });
            assert.deepEqual(state.toJS(), request);
        });
    });
    describe('GET_RATED_SUCCESS', () => {
        it('show resolved state after gifs fetched', () => {
            state = fireAction(state, { type: GET_RATED_REQUEST });
            assert.deepEqual(state.toJS(), request);
            state = fireAction(state, {
                type: GET_RATED_SUCCESS,
                payload: { gifs: giphyResp.get('data') },
            });
            assert.deepEqual(state.toJS(), fetchGifsSucess);
        });
    });
    describe('GET_RATED_FAILED', () => {
        it('show failed rated fetch state', () => {
            state = fireAction(state, { type: GET_RATED_REQUEST });
            assert.deepEqual(state.toJS(), request);
            state = fireAction(state, { type: GET_RATED_FAILED });
            assert.deepEqual(state.toJS(), failedRequest);
        });
    });
    // RATED FETCHING END

    // RATINGS FETCHING START
    describe('GET_RATINGS_REQUEST', () => {
        it('show pending fetch ratings state', () => {
            state = fireAction(state, { type: GET_RATINGS_REQUEST });
            assert.deepEqual(state.toJS(), request);
        });
    });
    describe('GET_RATINGS_SUCCESS', () => {
        it('show resolved state after ratings fetched', () => {
            state = fireAction(state, { type: GET_RATINGS_REQUEST });
            assert.deepEqual(state.toJS(), request);
            state = fireAction(state, {
                type: GET_RATINGS_SUCCESS,
                payload: { ratings: ratingsResp },
            });
            assert.deepEqual(state.toJS(), fetchRatingsSucess);
        });
    });
    describe('GET_RATINGS_FAILED', () => {
        it('show failed ratings fetch state', () => {
            state = fireAction(state, { type: GET_RATINGS_REQUEST });
            assert.deepEqual(state.toJS(), request);
            state = fireAction(state, { type: GET_RATINGS_FAILED });
            assert.deepEqual(state.toJS(), failedRequest);
        });
    });
    // RATINGS FETCHING END

    // SET RATING FETCHING START
    describe('SET_RATING_REQUEST', () => {
        it('show pending fetch rating state', () => {
            state = fireAction(state, { type: SET_RATING_REQUEST });
            assert.deepEqual(state.toJS(), request);
        });
    });
    describe('SET_RATING_SUCCESS', () => {
        it('show resolved state after setting rating fetched', () => {
            state = fireAction(state, { type: SET_RATING_REQUEST });
            assert.deepEqual(state.toJS(), request);
            state = fireAction(state, {
                type: SET_RATING_SUCCESS,
                payload: { ratings: ratingsResp },
            });
            assert.deepEqual(state.toJS(), fetchRatingsSucess);
        });
    });
    describe('SET_RATING_FAILED', () => {
        it('show failed set rating fetch state', () => {
            state = fireAction(state, { type: SET_RATING_REQUEST });
            assert.deepEqual(state.toJS(), request);
            state = fireAction(state, { type: SET_RATING_FAILED });
            assert.deepEqual(state.toJS(), failedRequest);
        });
    });
    // SET RATING FETCHING END

    describe('SET_RATING', () => {
        it('show setting rating of a gif with id: dGJ81LuuTSO0U to 5', () => {
            state = fireAction(state, {
                type: GET_GIFS_SUCCESS,
                payload: { gifs: giphyResp.get('data') },
            });
            assert.deepEqual(state.toJS(), fetchGifsSucess);
            state = fireAction(state, {
              type: SET_RATING,
              payload: {
                id: 'dGJ81LuuTSO0U',
                rating: 5,
              }
            });
            assert.deepEqual(state.toJS(), setRating);
        });
    });

    describe('SET_ACTIVE_ITEM', () => {
        it('set active item to gif with id: dGJ81LuuTSO0U', () => {
            state = fireAction(state, {
                type: GET_GIFS_SUCCESS,
                payload: { gifs: giphyResp.get('data') },
            });
            assert.deepEqual(state.toJS(), fetchGifsSucess);
            state = fireAction(state, {
              type: SET_ACTIVE_ITEM,
              payload: {
                item: giphyResp.get('data')
                               .map(el => el.set('stars', 0))
                               .find(el => el.get('id') === 'dGJ81LuuTSO0U', this, Map({})),
              }
            });
            assert.deepEqual(state.toJS(), setActiveItem);
        });
    });

    describe('NEW_SEARCH', () => {
        it('initiate a new search wiping old gifs for keyword "test"', () => {
            state = fireAction(state, {
                type: GET_GIFS_SUCCESS,
                payload: { gifs: giphyResp.get('data') },
            });
            assert.deepEqual(state.toJS(), fetchGifsSucess);
            state = fireAction(state, {
              type: NEW_SEARCH,
              payload: {
                keywords: "test",
              }
            });
            assert.deepEqual(state.toJS(), newSearch);
        });
    });

    describe('END_OF_GIFS', () => {
        it('set end of gifs flag', () => {
            state = fireAction(state, {
              type: END_OF_GIFS,
            });
            assert.deepEqual(state.toJS(), state.set('endOfGIFS', true).toJS());
        });
    });

    describe('SET_MODE', () => {
        it('set mode to RATED', () => {
            state = fireAction(state, {
              type: SET_MODE,
              payload: {
                mode: constants.MODES.RATED
              }
            });
            assert.deepEqual(state.toJS(), state.set('mode', constants.MODES.RATED).toJS());
        });
    });
});

function fireAction(currentState, action) {
  return globalReducer(currentState, action);
}
