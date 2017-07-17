import { observable, action } from 'mobx';
import agent from '../agent';

class TestStore {
  @observable inProgress = false;
  @observable errors = undefined;

  @observable result = undefined;

  @action open() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.Test.open()
      .then(action((res) => {
      	if(res.success) {
      		this.result = 'Success';
      	} else {
      		this.result = 'Failed';
      	}
      }))
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        this.result = err.response.body.message;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  @action user() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.Test.user()
      .then(action((res) => {
      	if(res.success) {
      		this.result = 'Success';
      	} else {
      		this.result = 'Failed';
      	}
      }))
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        this.result = err.response.body.message;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  @action admin() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.Test.admin()
      .then(action((res) => {
      	if(res.success) {
      		this.result = 'Success';
      	} else {
      		this.result = 'Failed';
      	}
      }))
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        this.result = err.response.body.message;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  @action reset() {
  	this.result = undefined;
  }
}

export default new TestStore();
