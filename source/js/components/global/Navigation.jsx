import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'constants/routes';
import HUD from 'components/game/HUD';

const menuItems = [
  {
    label: 'Main Menu',
    link: routeCodes.MAIN_MENU,
  },
  {
    label: 'Levels',
    link: routeCodes.LEVEL_LIST,
  },
  {
    label: 'Editor',
    link: routeCodes.EDITOR_NEW,
  },
];

export default class Navigation extends Component {
  renderLinks() {
    return menuItems.map(item => {
      return (
        <NavLink
          key={ item.link }
          activeClassName='Navigation-link--active'
          className='Navigation-link'
          exact
          to={ item.link }
        >
          { item.label }
        </NavLink>
      );
    });
  }

  render() {
    return (
      <div className='Navigation'>
        { this.renderLinks() }
        <HUD />
      </div>
    );
  }
}
