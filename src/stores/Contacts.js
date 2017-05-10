import { observable } from 'mobx';

class Contacts {
  @observable all = [
    { id: 1, name: 'Josh I', email: 'josh@mail.com' },
    { id: 2, name: 'David O', email: 'david@mail.com' },
    { id: 3, name: 'Andrew N', email: 'vlad@mail.com' },
  ];
}

export default new Contacts();