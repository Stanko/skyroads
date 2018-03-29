import React, { Component } from 'react';
import PropTypes from 'prop-types';

const convertColor = (color) => {
  return `#${ color.toString(16) }`; // eslint-disable-line no-bitwise
};

export default class BaseTunnel extends Component {
  static propTypes = {
    color: PropTypes.number.isRequired,
    tunnelColors: PropTypes.array.isRequired,
    floor: PropTypes.bool,
  }

  render() {
    const {
      color,
      tunnelColors,
      floor,
    } = this.props;

    return (
      <svg width='60px' height='80px' viewBox='0 0 60 80'>
        <g fillRule='evenodd'>
          <rect fill={ convertColor(tunnelColors[0]) } x='0' y='0' width='60' height='80' />
          <path
            d='M1,80 C1,72.2680135 13.9837423,66 30,66 C46.0162577,66 59,72.2680135 59,80 L1,80 Z'
            fill={ floor ? convertColor(color) : '#333' }
          />
          <path
            d='M0,80 C0,71.7157288 13.4314575,65 30,65 C46.5685425,65 60,71.7157288 60,80 L57.9296719,80
              C56.9041789,72.7347244 44.7915061,67 30,67 C15.2084939,67 3.09582109,72.7347244 2.0703281,80
              L0,80 Z'
            fill={ convertColor(tunnelColors[1]) }
          />
        </g>
      </svg>
    );
  }
}
