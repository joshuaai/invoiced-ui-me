import { observable, action } from 'mobx';
import { withRouter } from 'react-router-dom';

import Api from '../Helpers';

class User {

  sessions = '/auth/login';

  @observable isLoading = false;
  @observable signedIn = false;
  @observable email = null;

  @action setIsLoading(status) { 
    this.isLoading = status;
  }

  @action setSignedIn(status, email) {
    this.signedIn = status;
    if (status && email) {
      this.email = email;
    }
  }

  signIn(email = null, password = null) {
    const store = {
      authentication_token: localStorage.getItem('token'),
      email: localStorage.getItem('email'),
    }

    if (store.email && store.authentication_token) {
      this.signInFromStorage(store.email);
    } else if (email && password) {
      this.createSession(email, password);
    }
  }

  @action async signInFromStorage(email) {
    const response = await Api.get(this.sessions);
    const status = await response.status;

    if (status === 200) {
      this.email = email;
      this.signedIn = true;
      this.isLoading = false;
    } else {
      this.signOut();
    }
  }

  async createSession(email, password) {
    this.setIsLoading(true);

    const response = await Api.post(
      this.sessions,
      { email, password }
    );

    const status = await response.status;

    if (status === 200) {
      const body = await response.json();
      const { user } = body;

      localStorage.setItem('token', body.auth_token);
      localStorage.setItem('email', body.email);

      this.setIsLoading(false);
      this.setSignedIn(true, body.email);

      withRouter( (history) => { history.push('/') } );
    } else {
      console.log('error');
    }
  }

  async destroySession() {
    this.setIsLoading(true);

    const response = await Api.delete(this.sessions);
    const status = await response.status;

    if (status === 200) {
      this.setIsLoading(false);
      this.signOut();
    }
  }

  @action signOut() {
    localStorage.removeItem('email');
    localStorage.removeItem('token');

    this.email = null;
    this.signedIn = false;
    this.isLoading = false;
    withRouter( (history) => { history.push('/sign_in') } );
  }
}

export default new User();