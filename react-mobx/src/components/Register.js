import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import TextField from 'material-ui/TextField';

@inject('authStore') @observer
export default class Register extends React.Component {
	constructor() {
		super();

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handlePasswordConfChange = this.handlePasswordConfChange.bind(this);		
		this.handlePhoneChange = this.handlePhoneChange.bind(this);
		this.handleSubmitForm = this.handleSubmitForm.bind(this);
	}

	componentWillUnmount() {
		this.props.authStore.reset();
	}

	handleNameChange(e) {
		this.props.authStore.setName(e.target.value);
	}

	handleUsernameChange(e) {
		this.props.authStore.setUsername(e.target.value);
  }

  handleEmailChange(e) {
		this.props.authStore.setEmail(e.target.value);
  }

  handlePasswordChange(e) {
		this.props.authStore.setPassword(e.target.value);
  }

  handlePasswordConfChange(e) {
		this.props.authStore.setPasswordConf(e.target.value);
  }

  handlePhoneChange(e) {
		this.props.authStore.setPhone(e.target.value);
	}

	handleSubmitForm(e) {
    e.preventDefault();
    this.props.authStore.register()
  };

	render() {
    const { values, inProgress, errors } = this.props.authStore;

		return (
			<div>
				<h1>Register</h1>
				<p>{errors}</p>
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
			    <TextField
			      hintText="Password Confirmation"
			      value={values.password_conf}
            onChange={this.handlePasswordConfChange}
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
