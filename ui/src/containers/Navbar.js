import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';

import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';

import LogoMenu from './LogoMenu';
import Searchbar from '../components/Searchbar';

import { 
  newSearch,
  setMode,
  load,
} from '../actions/global';
import { constants } from '../i18n/constants';

class Navbar extends Component {
  render () {
    const { props } = this;
    const modes = constants.NAVBAR.LONG_MENU_ITEMS.map(el =>{
      const clickHandler = (el) => {
        props.setMode(el);
        props.load();
      }
      const styling = props.currentMode === el
        ? Object.assign({}, styles.modeItem, styles.currentMode)
        : styles.modeItem;
      return (
        <button onClick={ () => clickHandler(el) }
                style={ styling }
                key={ el }> 
          { el }
        </button>)
    });
    const longNav = (
      <nav style={ styles.longNav }>
        <LogoMenu menu={ false }/>
        <Searchbar key="searchBar"
                   onSearch={ (keywords) => props.newSearch(keywords) }/>
        <div style={ styles.modes }>
          { modes }
        </div>
      </nav>
    );
    const shortNav = (
      <nav style={ styles.shortNav }>
        <LogoMenu menu={ true }/>
        <Searchbar key="searchBar"
                   onSearch={ (keywords) => props.newSearch(keywords) }/>
      </nav>
    )
    const nav = props.pWidth > 650
      ? longNav
      : shortNav;
    return (nav);
  }
}

const values = {
  width: '100vw',
  height: '50px',
}

const styles = {
  shortNav: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: values.width,
    height: values.height,
    backgroundColor: colors.lightPurple,
    boxShadow: '0 0 0 4px rgba(0,0,0,.4)',

    display: 'grid',
    gridTemplateColumns: '60px 1fr',
    gridTemplateRows: values.height,
    gridGap: '5px',
    padding: '5px 10px',
  },
  longNav: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: values.width,
    height: values.height,
    backgroundColor: colors.lightPurple,
    boxShadow: '0 0 0 4px rgba(0,0,0,.4)',

    display: 'grid',
    gridTemplateColumns: 'minmax(280px, 1fr) minmax(200px, 1fr) minmax(100px, 1fr)',
    gridTemplateRows: values.height,
    gridGap: '5px',
    padding: '5px 10px',
  },
  modes: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  modeItem: {
    outline: 'none',
    cursor: 'pointer',
    border: `1px ${colors.orange} solid`,
    color: colors.yellow,
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    letterSpacing: '1px',
    height: '40px',
    padding: '3px 5px',
    fontFamily: fonts.secondary,
    fontSize: '1rem',
    borderRadius: '6px',
    margin: '0 5px',
  },
  currentMode: {
    boxShadow: '0 0 0 3px rgba(255,255,255,.6)',
  }
}

Navbar.propTypes = {
  pWidth: PropTypes.number.isRequired, //width of parent
}

function mapStateToProps(state) {
  return {
    currentMode: state.global.get('mode'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    newSearch,
    setMode,
    load,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
