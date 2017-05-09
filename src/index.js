import 'purecss/build/pure.css';

import React from 'react';
import ReactDOM from 'react-dom';

import c from './components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Root = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/' component={c.Layout} />
          <Route path='/contact' component={c.Collection} />
        </Switch>
      </Router>
    </div>
  )
}

ReactDOM.render(
  <Root />,  document.getElementById('root')
);
