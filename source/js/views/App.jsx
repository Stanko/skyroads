import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { routeCodes } from 'constants/routes';
import Navigation from 'components/global/Navigation';
import MainMenu from 'views/MainMenu';
import Editor from 'views/Editor';
import LevelList from 'views/LevelList';
import Level from 'views/Level';
import NotFound from 'views/NotFound';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navigation />

        <div className='Page'>
          <Switch>
            <Route exact path={ routeCodes.MAIN_MENU } component={ MainMenu } />
            <Route exact path={ routeCodes.LEVEL_LIST } component={ LevelList } />
            <Route exact path={ routeCodes.LEVEL } component={ Level } />
            <Route exact path={ routeCodes.EDITOR_NEW } component={ Editor } />
            <Route exact path={ routeCodes.EDITOR } component={ Editor } />
            <Route path='*' component={ NotFound } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
