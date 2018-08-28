import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import { constants } from '../i18n/constants';
import { fonts } from '../styles/fonts';

export default class Loader extends Component {
    render () {
        const { props } = this;
        const STRINGS = constants.COMPONENTS.LOADER;

        const styling = props.show
          ? Object.assign({}, styles.main, styles.show)
          : styles.main;
        return (
            <div style={ styling }>
                { STRINGS.LOADING }
            </div>
        );
    }
}

const styles = {
    main: {
      fontFamily: fonts.secondary,
      height: '95px',
      width: '150px',
      fontWeight: 'bold',
      letterSpacing: '2px',
      paddingBottom: '5px',

      position: 'fixed',
      top: '-75px',
      left: 'calc(50% - 75px)',

      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',

      backgroundColor: 'white',
      borderRadius: '0px 0px 6px 6px',
      transform: 'translateY(0px)',
      transition: 'transform 200ms ease',

      animation: '1000ms ease rainbowBg',
      animationIterationCount: 'infinite',
      opacity: 0,
    },
    show: {
      transform: 'translateY(75px)',
      opacity: 1,
    }
}

Loader.propTypes = {
    show: PropTypes.bool.isRequired,
}