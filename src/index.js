import 'purecss/build/pure.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import stores from './stores';

import c from './components';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Root = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={c.Layout.Application} />
        <Route path='/sign_in' component={c.Sessions.New} />
        <Route exact path='/contacts' component={c.Contacts.Collection} />
        <Route path='/contacts/:contactId' component={c.Contacts.Show} />
      </Switch>
    </div>
  )
}

ReactDOM.render(
  <Provider {...stores}>
    <Router><Root /></Router>
  </Provider>, 
  document.getElementById('root')
);
