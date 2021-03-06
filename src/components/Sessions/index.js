import React from 'react';
import { observer, inject } from 'mobx-react';

import './index.css';

@inject('user') @observer
class New extends React.Component {
  
  submitForm = (e) => {
    e.preventDefault();

    const { user } = this.props;

    user.signIn(
      this.email.value,
      this.password.value,
    );

  }

  render() {
    return (
      <div className='signInForm'>
        <form className='pure-form pure-form-stacked' onSubmit={this.submitForm}>
          <label>Email</label>
          <input type='email' ref={node => { this.email = node; }}
                placeholder='email' className='pure-input-1' />
          <label>Password</label>
          <input type='password' ref={node => { this.password = node; }} className='pure-input-1'/>
          <button className='pure-button pure-input-1 signInButton'>
            Sign In
          </button>
        </form>
      </div>
    );
  }
}

export default { New };