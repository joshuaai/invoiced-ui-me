import React from 'react';
import { observer } from 'mobx-react';

import './Contact.css';

import { Link } from 'react-router-dom';

@observer(['contacts'])
class Contact extends React.Component {
  removeContact = (e) => {
    e.preventDefault();
    this.props.contacts.remove(this.props.id);
  }

  render() {
    return (
      <div className='pure-u-1-3'>
        <h2>
          <Link to={`/contacts/${this.props.id}`}>
            {this.props.name}
          </Link>
        </h2>
        <p>{this.props.email}</p>
        <a href='#' className='pure-button removeButton' onClick={this.removeContact}>Remove</a>
      </div>
    )
  }
}

export default Contact;