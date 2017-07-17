import { observable, action } from 'mobx';
import agent from '../agent';

import commonStore from './commonStore';
import routerStore from './routerStore';

class AuthStore {
  @observable inProgress = false;
  @observable errors = undefined;

  @observable values = {
  	name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
  };

  @action setName(name) {
    this.values.name = name;
  }

  @action setUsername(username) {
    this.values.username = username;
  }

  @action setEmail(email) {
    this.values.email = email;
  }

  @action setPassword(password) {
    this.values.password = password;
  }

  @action setPhone(phone) {
    this.values.phone = phone;
  }

  @action reset() {
  	this.values.name = '';
    this.values.username = '';
    this.values.email = '';
    this.values.password = '';
    this.values.phone = '';
  }

  @action login() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.Auth.login(this.values.username, this.values.password)
      .then((user) => {
      	routerStore.push('/');
      	commonStore.setIam(user);
      })
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  @action register() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.Auth.register(this.values.name, this.values.username, this.values.email, this.values.password, this.values.phone)
      .then((user) => {
      	routerStore.push('/');
      	commonStore.setIam(user);
     	})
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  @action logout() {
    commonStore.setIam(undefined);
    commonStore.forgetIam();
    routerStore.push('/');
  }
}

export default new AuthStore();
