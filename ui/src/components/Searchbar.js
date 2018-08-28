import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';
import searchSVG from '../assets/searchSVG';

// Searchbar uses a strict alphanumeric filter.
export default class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: '',
    }
  }

  render () {
    const { props, state } = this;
    const handleInput = (e) => {
       const value = e.target.value;
       this.setState({keywords: value.replace(/[^A-Za-z0-9\s]/g, '')});
    }
    const submit = () => {
      const query = state.keywords.trim();
      if (query.length < 1) {
        this.setState({keywords: ''});
        return;
      };
      props.onSearch(state.keywords)
    }
    const checkSubmit = (e) => {
      if (e.key == 'Enter') submit();
    }
    return (
      <div style={ styles.main }>
        <input type="text"
               key="searchInput"
               value={ state.keywords }
               onChange={ handleInput }
               onKeyPress={ checkSubmit }
               style={ styles.input }
               autoFocus/>
        <button style={ styles.btn }
                onClick={ submit }>
          { searchSVG(styles.icon) }
        </button>
      </div>
    );
  }
}

const values = {
  width: '100%',
  height: '40px',
  iconWidth: '40px',
}

const styles = {
  main: {
    width: values.width,
    height: values.height,
    backgroundColor: colors.white,
    borderRadius: '12px',

    display: 'flex',
  },
  input: {
    height: values.height,
    width: `calc(${values.width} - ${values.iconWidth})`,
    backgroundColor: 'transparent',
    appearance: 'none',
    outline: 'none',
    border: 'none',
    fontSize: '26px',
    fontFamily: fonts.primary,
    fontWeight: 300,
    padding: '3px 10px',
  },
  btn: {
    width: values.iconWidth,
    backgroundColor: 'transparent',
    height: values.iconWidth,
    appearance: 'none',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',

  },
  icon: {
    stroke: colors.black,
  }
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
}