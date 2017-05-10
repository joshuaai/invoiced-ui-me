import React from 'react';
import { observer } from 'mobx-react';

import Nav from './Nav';
import Contact from './Contact';

import './Collection.css';

@observer(['contacts'])
class Collection extends React.Component {
  componentWillMount() {
    this.props.contacts.fetchAll();
  }

  addContact = (e) => {
    e.preventDefault();

    this.props.contacts.add({
      name: this.refs.name.value,
      email: this.refs.email.value, 
    });

    this.refs.name.value = null;
    this.refs.email.value = null;
  };

  newContact = () =>
    <div className='pure-g'>
      <div className='pure-u-12-24'>
        <form className='pure-form' onSubmit={this.addContact}>
          <fieldset>
            <legend>New Contact</legend>

            <input ref='email' type='email' placeholder='example@example.com' />
            <input ref='name' type='text' placeholder='Name' />

            <button type="submit" className="pure-button pure-button-primary">Add</button>
          </fieldset>
        </form>
      </div>
    </div>;

  render() {
    const { all, isLoading } = this.props.contacts;

    return (
      <div id='Collection'>
        <Nav />
        {this.newContact()}
        <div className='pure-g'>
          {all.slice().map(info =>
            <Contact key={info.id} {...info} />
          )}
        </div>
      </div>
    );
  }
}

export default Collection;