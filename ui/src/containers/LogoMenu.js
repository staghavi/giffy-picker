import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';

import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';
import { constants } from '../i18n/constants';

import { setMode, load } from '../actions/global';

// Just a logo when in long mode.
// A full screen menu appears in short mode when clicked.
class LogoMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    }
  }

  render () {
    const { props, state } = this;
    const sizeStyle = {
      fontSize: `${props.size || 35}px`,
      lineHeight: `${props.size || 35+10}px`
    };
    const MENU_ITEMS = fromJS(constants.NAVBAR.SHORT_MENU_ITEMS);
    const styling = props.menu
      ? Object.assign({}, styles.main, sizeStyle, styles.shortStyle)
      : Object.assign({}, styles.main, sizeStyle);
    const menuClickHandler = () => {
      if (!props.menu) return;
      this.setState({showMenu: true})
    }
    const itemClickHandler = (e, el) => {
      e.stopPropagation();
      if (el !== 'BACK') {
        props.setMode(el);
        props.load();
      };
      this.setState({showMenu: !this.state.showMenu});
    }
    const menuItems = MENU_ITEMS.map(el =>
      <li style={ styles.menuItem }
          onClick={ (e) => itemClickHandler(e, el) }
          key={el}>
        { el }
      </li>);
    const menu = state.showMenu
      ? <ul style={ styles.menu }> { menuItems } </ul>
      : <span></span>;
    return (
      <div style={ styling } onClick={ menuClickHandler }>
        <div> { props.menu ? constants.LOGO_SHORT : constants.LOGO_LONG } </div>
        { menu }
      </div>
    );
  }
}

const values = {
}

const styles = {
  main: {
    userSelect: 'none',
    position: 'relative',
    fontFamily: fonts.logo,
    color: colors.yellow,
  },
  menu: {
    width: '100vw',
    height: '100vh',
    padding: '5px 0px',
    position: 'fixed',
    left: 0,
    top: 0,
    listStyle: 'none',
    backgroundColor: colors.purple,
    margin: 0,
  },
  menuItem: {
    fontFamily: fonts.secondary,
    height: '70px',
    fontSize: '2em',
    width: '100%',
    borderBottom: `2px ${colors.peach} solid`,
    padding: '5px',
    margin: 0,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shortStyle: {
    cursor: 'pointer',
  },
}

LogoMenu.propTypes = {
  size: PropTypes.number.isRequired,
  menu: PropTypes.bool.isRequired, //short or long version
}


function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setMode,
    load,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoMenu);
