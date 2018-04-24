import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Block from 'components/editor/Block';

export default class Map extends Component {
  static propTypes = {
    map: PropTypes.array.isRequired,
  }

  renderBlocks(row, y) {
    return row.map((block, index) => {
      return (
        <Block
          key={ index }
          block={ block }
          x={ index }
          y={ y }
        />
      );
    });
  }

  renderRows() {
    const {
      map,
    } = this.props;

    console.log(JSON.stringify(map, null, 2));

    return map.map((row, index) => {
      return (
        <div key={ index } className='Map-row'>
          { this.renderBlocks(row, index) }
        </div>
      );
    });
  }

  render() {
    return (
      <div className='Map'>
        { this.renderRows() }
      </div>
    );
  }
}
