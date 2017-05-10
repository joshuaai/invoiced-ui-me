import { observable, action } from 'mobx';

class Contacts {
  @observable all = [];
  @observable isLoading = false;

  @action async fetchAll() {
    this.isLoading = false;
    const response = await fetch('https://kips.herokuapp.com/products');
    const status = await response.status;

    if (status === 200) {
      this.all = await response.json();
    }
  }

  @action async add(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      headers, 
      body: JSON.stringify(data),
    };

    const request = new Request('https://kips.herokuapp.com/products', options );
    const response = await fetch(request);
    const status = await response.status;

    if (status === 201) {
      this.fetchAll();
    }
  }

  @action find(contactId) {
    return (
      this.all.slice().filter(
        c => c.id === parseInt(contactId, 10)
      )[0]
    );
  }

  @action remove(contactId) {
    const existing = this.all;
    this.all = existing.filter(
      c => c.id !== contactId
    );
  }
}

export default new Contacts();