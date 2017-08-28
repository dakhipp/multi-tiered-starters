import { observable, action } from 'mobx';
import agent from '../agent';

class UserStore {
  @observable inProgress = false;
  @observable errors = undefined;

  @observable users = [];

  @action getAll() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.Users.getAll()
      .then(action((res) => {
      	this.users = res;
      }))
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        this.result = err.response.body.message;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }
}

export default new UserStore();
