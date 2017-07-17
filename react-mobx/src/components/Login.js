import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { whyRun } from 'mobx';

import TextField from 'material-ui/TextField';

@inject('authStore') @observer
export default class Login extends React.Component {
	constructor() {
		super();

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmitForm = this.handleSubmitForm.bind(this);
	}

	componentWillUnmount() {
		this.props.authStore.reset();
	}

	handleUsernameChange(e) {
		this.props.authStore.setUsername(e.target.value);
  }

  handlePasswordChange(e) {
		this.props.authStore.setPassword(e.target.value);
  }

	handleSubmitForm(e) {
    e.preventDefault();
    this.props.authStore.login()
  };


	render() {
		whyRun();
    const { values, inProgress } = this.props.authStore;

		return (
			<div>
				<h1>Login</h1>
				<Link to="/register">
          Don't have an account?
        </Link>
        <form onSubmit={this.handleSubmitForm}>
			    <TextField
			      hintText="Username"
			      value={values.username}
            onChange={this.handleUsernameChange}
			    />
			    <br />
			    <TextField
			      hintText="Password"
			      value={values.password}
            onChange={this.handlePasswordChange}
			    />
			    <br />
			    <button 
			    	type="submit"
			    	disabled={inProgress}
			    >
			    	Submit
			    </button>
				</form>
			</div>
		);
	}
}
