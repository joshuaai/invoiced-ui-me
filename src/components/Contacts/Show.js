import React from 'react';
import { observer } from 'mobx-react';

import Nav from '../Layout';

@observer(['contacts'])
class Show extends React.Component {
  componentWillMount() {
    const contact = this.props.contacts.find(this.props.match.params.contactId);
    this.setState({ contact });
  }

  render() {
    return (
      <div id='Show'>
        <Nav.Application />
        <h1>{this.state.contact.name}</h1>
      </div>
    );
  }
}

export default Show;