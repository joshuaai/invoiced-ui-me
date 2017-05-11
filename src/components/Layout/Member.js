import React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

import './index.css';

@inject('user') @observer
class Member extends React.Component {

  render() {
    return (
      <ul className='pure-menu-list'>
        <li className='pure-menu-item'>
          <Link to='/users/sign_in' className='pure-menu-link links'>Hi, {this.props.user.email}</Link>
        </li>
        <li className='pure-menu-item'>
          <a href='#' className='pure-menu-link links'>Sign Out</a>
        </li>
      </ul>
    );
  }
}

export default Member;