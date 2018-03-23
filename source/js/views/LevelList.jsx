import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getRoute, routeCodes } from 'constants/routes';

export default class LevelList extends Component {
  render() {
    return (
      <div className='LevelList'>
        <h1>LevelList</h1>
        <NavLink
          exact
          to={ getRoute(routeCodes.LEVEL, { levelId: 1 }) }
        >
          1
        </NavLink>
      </div>
    );
  }
}
