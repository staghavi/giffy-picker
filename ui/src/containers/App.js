import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List, fromJS, Map } from 'immutable';
import Dimensions from 'react-dimensions';
import VisibilitySensor from 'react-visibility-sensor';

import Item from '../components/Item';
import ItemModal from '../components/ItemModal';
import Loader from '../components/Loader';
import Navbar from './Navbar';

import { colors } from '../styles/colors';
import {
	setActiveItem,
	load,
	setRating,
	saveRatings,
} from '../actions/global';
import { constants } from '../i18n/constants';
import { sortByRating } from '../utility/utility';

class App extends Component {
	render () {
		const { props, state } = this;
		const items = () => {
			const loadHandler = (isVisible) => {
				if (isVisible) props.load();
			}
			return props.gifs.sort(sortByRating).map((gif, i) => {
				if (i+1 === props.gifs.size) {
					return (
						<VisibilitySensor key={ gif.get('id')}
										  				onChange={ loadHandler }>
							<Item key={ gif.get('id') }
									  gif={ gif }
									  onClick={ () => props.setActiveItem(gif) }
									  setRating={ (rating) => props.setRating(gif.get('id'), rating)}/>
						</VisibilitySensor>);
				}
				return <Item key={ gif.get('id', i) }
								  	 gif={ gif }
								  	 onClick={ () => props.setActiveItem(gif) }
								  	 setRating={ (rating) => props.setRating(gif.get('id'), rating)}/>
			});
		}
		const activeItem = props.gifs.find(el => el.get('id') === props.activeItem.get('id'), this, Map({}));
		return (
			<div style={ styles.main }>
				<div style={ styles.gifs }
		 	 			 key="gif-grid">	
					{ items() }
				</div>
				<Loader show={ props.isFetching }/>
				<Navbar key="navbar"
								pWidth={ props.containerWidth }/>
				<ItemModal visible={ activeItem.size > 0 }
					   		   hide={ () => props.setActiveItem(Map({})) }
					   		   key="item-modal"
					   		   gif={ activeItem }
					   		   setRating={ (rating) => props.setRating(activeItem.get('id'), rating)}/>
			</div>
		);
	}
}

const values = {
	itemHeight: constants.COMPONENTS.ITEM.SIZE.h,
	itemWidth: constants.COMPONENTS.ITEM.SIZE.w,
}

const styles = {
	main: {
		width: '100vw',
		minWidth: '320px',
		minHeight: '400px',
		height: '100vh',

		position: 'relative',
		backgroundColor: colors.purple,
		overflow: 'auto',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	gifs: {
		position: 'relative',
		width: '100%',
		maxWidth: '1000px',
		overflow: 'visible',
		height: '100vh',
		padding: '90px 40px 40px 40px',
		backgroundColor: 'none',
		overflowAnchor: 'none',

		display: 'grid',
		gridGap: '40px',
		gridTemplateColumns: `repeat(auto-fill, ${values.itemWidth}px)`,
		gridTemplateRows: `repeat(auto-fill, ${values.itemHeight}px)`,
		justifyItems: 'center',
		alignItems: 'center',
		justifyContent: 'center',
	},
}

function mapStateToProps(state) {
	return {
		gifs: state.global.get('gifs', List([])),
		activeItem: state.global.get('activeItem', Map({})),
		isFetching: state.global.get('isFetching', false),
		ratings: state.global.get('ratings', Map({})),
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		setActiveItem,
		load,
		setRating,
		saveRatings,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dimensions()(App));