import axios from 'axios';
import { fromJS, Map } from 'immutable';

const GIPHY_KEY = '2WZXiLLchVGJyESBXOZmb0xtGISaIwb7';
const GIPHY_HOSTNAME = 'http://api.giphy.com';
const GP_SERVER_HOSTNAME = 'http://localhost:8090';

// returns gifs given an array of keywords
export async function searchGiphy(keywords, limit, offset) {
	try {
		const resp = await axios.get(
			`${GIPHY_HOSTNAME}/v1/gifs/search?q=${keywords}&limit=${limit}&offset=${offset}&api_key=${GIPHY_KEY}`,
		);
		return fromJS(resp.data);
	} catch (err) {
		return Map({ error: err });
	}
}

// returns a set of gifs given their ids.
export async function getGiphys(ids) {
	try {
		const resp = await axios.get(
			`${GIPHY_HOSTNAME}/v1/gifs?ids=${ids}&api_key=${GIPHY_KEY}`,
		);
		return fromJS(resp.data);
	} catch (err) {
		return Map({ error: err });
	}
}

// return top n trending gifs
export async function getTrending(n) {
	try {
		const resp = await axios.get(
			`${GIPHY_HOSTNAME}/v1/gifs/trending?api_key=${GIPHY_KEY}&limit=${n}`,
		);
		return fromJS(resp.data);
	} catch (err) {
		return Map({ error: err });
	}
}

// returns map of current ratings
export async function getRatings() {
	try {
		const resp = await axios.get(
			`${GP_SERVER_HOSTNAME}/api/ratings`,
		);
		return fromJS(resp.data);
	} catch (err) {
		return Map({ error: err });
	}
}

// sets the rating for a gif given id and rating.
// returns new ratings map
export async function setRating(id, rating) {
	try {
		const resp = await axios.post(
			`${GP_SERVER_HOSTNAME}/api/ratings`,
			{
				id,
				rating,
			}
		);
		return fromJS(resp.data);
	} catch (err) {
		return Map({ error: err });
	}
}





