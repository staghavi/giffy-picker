import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';

import StaticTextCopy from './StaticTextCopy';
import StarMeter from './star-meter/StarMeter';
import closeSVG from '../assets/closeSVG';

import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';
import { constants } from '../i18n/constants';
import { hexRGBA } from '../utility/utility';

// a full screen modal which displays the gif passed in and displays a link to copy.
export default class ItemModal extends Component {
	render () {
		const { props } = this;
		const STRINGS = constants.COMPONENTS.ITEM_MODAL;
		const styling = props.visible
			? Object.assign({}, styles.main, styles.showModal)
			: styles.main;
		const contentClickHandler = (e) => {
			e.stopPropagation();
		}
		return (
			<div style={ styling }
					 onClick={ props.hide }>
				<div style={ styles.content} 
				     onClick={ contentClickHandler }>
			    <picture style={ styles.srcWrap }>
				  		<source srcset={ props.gif.getIn(['images', 'original', 'webp']) }
				  						type="image/webp"
				  						style={ styles.webp }/>
				  		<img src={ props.gif.getIn(['images', 'original', 'url']) }
				  			   style={ styles.gif }/>
					</picture>
					<div style={ styles.details }>
						<center style={ styles.title }>
							{ props.gif.get('title', '--') }
						</center>
						<StaticTextCopy value={ props.gif.getIn(['images', 'original', 'url']) }
														style={ styles.link }
														key={ STRINGS.LINK }/>
						<StarMeter callback={(rating) => props.setRating(rating)}
											 starCount={5}
											 key="rating-meter"
											 currRating={ props.gif.get('stars', 0)}
											 row={true}/>
					</div>
					<button onClick={ props.hide }
				  				style={ styles.hideBtn }>
				  	{ closeSVG() }
				  </button>
				</div>
			</div>
		);
	}
}

const values = {
	width: '100vw',
	height: '100vh',
	padding: '5px',
}

const styles = {
	main: {
		position: 'fixed',
		left: 0,
		top: 0,
		width: values.width,
		height: values.height,
		backgroundColor: 'rgba(0,0,0,0)',
		transform: 'scale(0)',
		transition: 'transform 300ms ease, backgroundColor 300ms ease',

		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	showModal: {
		transform: 'scale(1)',
		backgroundColor: 'rgba(0,0,0,.2)',
	},
	hideBtn: {
		backgroundColor: 'none',
		border: 'none',
		padding: 0,
		margin: 0,
		borderRadius: '50%',
		position: 'absolute',
		right: '5px',
		top: '8px',
		cursor: 'pointer',
	},
	content: {
		position: 'relative',
		minWidth: '320px',
		maxWidth: '50%',
		minHeight: '320px',
		maxHeight: '50%',
		backgroundColor: 'none',
		borderRadius: '12px',

		display: 'grid',
		gridTemplateColumns: '100%',
		gridTemplateRows: 'minmax(320px, 1fr) 120px',
		justifyItems: 'center',
		alignItems: 'center',
		justifyContent: 'center',
	},
	srcWrap: {
		position: 'relative',
		minWidth: '320px',
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: hexRGBA(colors.blue, .95),
		borderRadius: '26px 18px 0 0',
		borderTop: `5px ${colors.lightBlue} solid`,
		borderRight: `2px ${colors.lightBlue} solid`,
		borderLeft: `3px ${colors.medBlue} solid`,
		padding: '5px',
	},
	webp: {
		objectFit: 'scale-down',
		borderRadius: '12px',
	},
	gif: {
		maxWidth: '100%',
		maxHeight: `100%`,
		borderRadius: '12px',
	},
	details: {
		overflowY: 'auto',
		overFlowX: 'hidden',
		position: 'relative',
		height: '100%',
		width: '100%',
		padding: '8px',
		backgroundColor: colors.darkPeach,
		borderRadius: '0 0 12px 16px',
		borderRight: `2px ${colors.medPeach} solid`,
		borderLeft: `3px ${colors.darkerPeach} solid`,

		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
    fontFamily: fonts.secondary,
		fontSize: '1.2em',
	},
	link: {
		wordBreak: 'break-all',
	},
}

ItemModal.propTypes = {
	gif: PropTypes.instanceOf(Map).isRequired,
	visible: PropTypes.bool.isRequired,
	hide: PropTypes.func.isRequired,
}