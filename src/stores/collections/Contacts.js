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

  @action add(data) {
    const existing = this.all;
    this.all = existing.concat(data)
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