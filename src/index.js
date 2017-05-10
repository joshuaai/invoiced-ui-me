import 'purecss/build/pure.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './components/Layout';
import Collection from './components/Collection';
import Show from './components/Show'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Root = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Layout} />
        <Switch>
          <Route exact path='/contacts' component={Collection} />
          <Route path='/contacts/:contactId' component={Show} />
        </Switch>
      </Switch>
    </div>
  )
}

ReactDOM.render(
  <Router><Root /></Router>,  document.getElementById('root')
);
