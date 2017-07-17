import { observable, action, reaction } from 'mobx';

class CommonStore {
  @observable appLoaded = false;

  @observable iam = JSON.parse(window.localStorage.getItem('iam'));

  constructor() {
    reaction(
      () => this.iam,
      iam => {
        if (iam) {
          window.localStorage.setItem('iam', JSON.stringify(iam));
        } else {
          window.localStorage.removeItem('iam');
        }
      }
    );
  }

  @action forgetIam() {
    this.iam = undefined;
  }

  @action setIam(iam) {
  	this.iam = iam;
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }
}

export default new CommonStore();
