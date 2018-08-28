import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import { colors } from '../../styles/colors';
import starSVG from '../../assets/starSVG';

export default class Star extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render () {
		const { props } = this;
		const size = { height: props.h, width: props.w };
		const styling = props.active
			? Object.assign({}, styles.main, size, styles.active)	
			: Object.assign({}, styles.main, size);
		const svgConfig = {
			style: styles.main,
			onClick: () => props.onClick(),
			onMouseEnter: () => props.onMouseEnter(),
			onMouseLeave: () => props.onMouseLeave(),
			width: props.w,
			height: props.h,
			stroke: 'none',
			strokeWidth: 1,
			fill: props.isHoverActive
					? colors.orange
					: props.isActive
						? colors.yellow
						: colors.blueGrey,
		}
		return starSVG(svgConfig);
	}
}

const values = {
}

const styles = {
	main: {
		cursor: 'pointer',
	}
}

Star.propTypes = {
	isActive: PropTypes.bool.isRequired,
	isHoverActive: PropTypes.bool.isRequired,
	onMouseEnter: PropTypes.func.isRequired,
	onMouseLeave: PropTypes.func.isRequired,
	onClick: PropTypes.func.isRequired,
	w: PropTypes.number.isRequired,
	h: PropTypes.number.isRequired,
}