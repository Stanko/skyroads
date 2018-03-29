import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Map from 'components/editor/Map';

@connect(state => ({
  map: state.editor.get('map'),
}))
export default class Editor extends Component {
  static propTypes = {
    map: PropTypes.array.isRequired,
  }

  render() {
    const {
      map,
    } = this.props;

    return (
      <div className='Editor'>
        <Map map={ map } />
      </div>
    );
  }
}
