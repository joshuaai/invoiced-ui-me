import React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

import Guest from './Guest';
import Member from './Member';
import './index.css';

@inject('user') @observer
class Application extends React.Component {
  
  componentWillMount() {
    this.props.user.signIn();
  }

  guestOrMember() {
    const { user } = this.props;

    if (user.signedIn) {
      return (<Member />);
    }

    return (<Guest />);
  }

  render() {
    return (
      <div id='Layout' className='layout'>
        <div className='pure-menu pure-menu-horizontal pure-menu-fixed mainNav'>
          <Link to='/' className='pure-menu-heading heading'>My Kips</Link> 
          {this.guestOrMember()}
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contacts">Contacts</Link></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default { Application };