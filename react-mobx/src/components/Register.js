import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import TextField from 'material-ui/TextField';

@inject('authStore') @observer
export default class Register extends React.Component {
	constructor() {
		super();

		this.submitForm = (name, username, email, password, phone) => ev => {
      ev.preventDefault();
      this.props.onSubmit(name, username, email, password, phone);
    }
	}

	componentWillUnmount() {
		this.props.authStore.reset();
	}

	handleNameChange = e => this.props.authStore.setName(e.target.value);
	handleUsernameChange = e => this.props.authStore.setUsername(e.target.value);
  handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
  handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
  handlePhoneChange = e => this.props.authStore.setPhone(e.target.value);
	handleSubmitForm = (e) => {
    e.preventDefault();
    this.props.authStore.register()
  };

	render() {
    const { values, errors, inProgress } = this.props.authStore;

    console.log(errors);

		return (
			<div>
				<h1>Register</h1>
				<Link to="/login">
          Have an account?
        </Link>
				<form onSubmit={this.handleSubmitForm}>
					<TextField
			      hintText="Name"
			      value={values.name}
            onChange={this.handleNameChange}
			    />
			    <br />
			    <TextField
			      hintText="Email"
			      value={values.email}
            onChange={this.handleEmailChange}
			    />
			    <br />
			    <TextField
			      hintText="Username"
			      value={values.username}
            onChange={this.handleUsernameChange}
			    />
			    <br />
			    <TextField
			      hintText="Phone"
			      value={values.phone}
            onChange={this.handlePhoneChange}
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
