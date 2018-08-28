import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { colors } from '../styles/colors';
import { constants } from '../i18n/constants';
import StarMeter from './star-meter/StarMeter';

// An item displays a GIF and a meter to rate it.
export default class Item extends Component {
	render () {
		const { props } = this;
		return (
			<div style={ styles.main }>
				<div style={ styles.sidebar }>
					<StarMeter callback={(rating) => props.setRating(rating)}
										 starCount={5}
										 key="rating-meter"
										 currRating={ props.gif.get('stars', 0)}/>
				</div>
				<picture style={ styles.srcWrap }
						 		 onClick={ props.onClick }>
			  		<img src={ props.gif.getIn(['images', 'downsized', 'url']) }
			  			 	 style={ styles.gif }/>
				</picture>
			</div>
		);
	}
}

const values = {
	width: `${constants.COMPONENTS.ITEM.SIZE.w}px`,
	height: `${constants.COMPONENTS.ITEM.SIZE.h}px`,
	padding: '8px',
	sidebarWidth: '30px',
}

const styles = {
	main: {
		position: 'relative',
		width: values.width,
		height: values.height,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		borderRadius: '24px 3px 18px 12px',
	},
	sidebar: {
		backgroundColor: colors.darkPeach,
		width: values.sidebarWidth,
		height: values.height,
		borderRadius: '24px 0 0 12px',
		borderTop: `4px  ${colors.medPeach}  solid`,
		borderLeft: `2px ${colors.darkerPeach} solid`,
	},
	srcWrap: {
		position: 'relative',
		width: `calc(${values.width} - ${values.sidebarWidth})`,
		height: values.height,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '0 18px 18px 0',
		backgroundColor: colors.blue,
		padding: values.padding,
		borderTop: `4px ${colors.lightBlue} solid`,
		borderRight: `1px ${colors.lightBlue} solid`,
		cursor: 'pointer',
	},
	webp: {
		objectFit: 'scale-down',
		borderRadius: '12px',
	},
	gif: {
		maxWidth: '100%',
		maxHeight: `calc(${values.height} - ${values.padding} - ${values.padding})`,
		borderRadius: '12px',
	},

	
}

Item.propTypes = {
	gif: PropTypes.instanceOf(Map).isRequired,
	onClick: PropTypes.func.isRequired,
}