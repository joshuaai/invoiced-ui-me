import React from 'react';
import { observer } from 'mobx-react';

@observer(['contacts'])
class Show extends React.Component {
  componentWillMount() {
    this.setState({
      contact: this.props.contacts.all.filter(c => c.id === parseInt(this.props.match.params.contactId, 10))[0],
    });
  }

  render() {
    return (
      <div id='Show'>
        <h1>{this.state.contact.name}</h1>
      </div>
    );
  }
}

export default Show;