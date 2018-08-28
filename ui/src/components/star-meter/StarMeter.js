import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';
import Star from './Star';

// StarMeter shows a row/column of stars.
// Clicking a star returns its number [1-n]
export default class StarMeter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hoverStar: 0,
		}
	}

	render () {
		const { props, state } = this;
		const stars = new Array(props.starCount).fill(0).map((el, i) => {
			const clickHandler = () => {
				this.props.callback(i+1);
			}
			const BASE_SIZE = 20;
			return (
				<Star key={ i }
						  isActive={ i+1 <= props.currRating }
						  isHoverActive={ i+1 <= state.hoverStar }
						  onClick={ clickHandler }
						  onMouseEnter={ () => this.setState({hoverStar: i+1}) }
						  onMouseLeave={ () => this.setState({hoverStar: 0}) }
						  w={ BASE_SIZE + (1.5*i) }
						  h={ BASE_SIZE + (1.5*i) }/>);
		});
		const rowCheck = props.row
			? Object.assign({}, styles.main, styles.row)
			: styles.main;
		const styling = props.style
			? Object.assign({}, rowCheck, props.style)
			: rowCheck;
		return (
			<div style={ styling }>
				{ stars }
				<div style={ styles.ratingReadout }>
					{ state.hoverStar || props.currRating || '-' }
				</div>
			</div>
		);
	}
}

const values = {
	width: '30px',
	height: '100%',
}

const styles = {
	main: {
		width: values.width,
		height: values.height,
		backgroundColor: 'transparent',

		display: 'flex',
		flexDirection: 'column-reverse',
		alignItems: 'center',

		padding: '0 3px 10px 0',
	},
	row: {
		flexDirection: 'row',
		width: values.height,
		height: values.width,
		padding: '3px',
	},
	ratingReadout: {
		fontFamily: fonts.secondary,
		color: colors.brown,
		fontSize: '24px',
	},
}

StarMeter.propTypes = {
	starCount: PropTypes.number.isRequired,
	callback: PropTypes.func.isRequired,
	currRating: PropTypes.number.isRequired,
	row: PropTypes.bool,
	style: PropTypes.object,
}