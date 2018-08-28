import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { fonts } from '../styles/fonts';
import { colors } from '../styles/colors';
import copySVG from '../assets/copySVG';

// Renders an input displaying text and a button to save to clipboard.
export default class StaticTextCopy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
    }
  }

  render () {
    const { props, state } = this;
    const copyHandler = (e) => {
      e.clipboardData
    }
    const btnStyling = state.hovering
      ? Object.assign({}, styles.copyBtn, styles.hovering)
      : styles.copyBtn;
    return (
      <div style={ styles.main }
           onClick={ copyHandler }>
        <input readOnly
               value={props.value}
               style={ styles.input} />
        <CopyToClipboard text={props.value}>
          <div style={btnStyling}
               onMouseEnter={() => this.setState({hovering: true})}
               onMouseLeave={() => this.setState({hovering: false})}
               title={'copy'}>
            { copySVG() }
          </div>
        </CopyToClipboard>
      </div>
    );
  }
}

const styles = {
  main: {
    display: 'grid',
    gridTemplateColumns: `1fr 30px`,
    gridTemplateRows: `30px`,
    gridGap: '5px',
    fontFamily: fonts.primary,
    fontWeight: 300,
    width: '100%',
    padding: '3px 0px',
  },
  input: {
    width: '100%',
    borderRadius: '6px',
    border: 'none',
  },
  copyBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'cente',
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    border: `1px ${colors.black} solid`,
    backgroundColor: colors.white,
    borderRadius: '6px',
    padding: '2px',
    transition: 'background-color 300ms ease',
  },
  hovering: {
    backgroundColor: colors.medBlue,
  }
}

StaticTextCopy.propTypes = {
  value: PropTypes.string.isRequired,
}