import React, { Component } from 'react';
import PropTypes from 'prop-types';

const convertColor = (color) => {
  return `#${ color.toString(16) }`; // eslint-disable-line no-bitwise
};

const FULL_HEIGHT = 30;

export default class SolidBlock extends Component {
  static propTypes = {
    color: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  render() {
    const {
      color,
      height,
    } = this.props;

    const blockHeight = height * FULL_HEIGHT;

    return (
      <svg width='60px' height='80px' viewBox='0 0 60 80'>
        <g fillRule='evenodd'>
          <rect fill={ convertColor(color) } x='0' y='0' width='60' height='80' />
          <rect fill='rgba(0,0,0,0.1)' x='0' y={ 80 - blockHeight } width='60' height={ blockHeight } />
        </g>
      </svg>
    );
  }
}
