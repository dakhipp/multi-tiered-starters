import React from 'react'

import {observable} from 'mobx';

import UsersList from '../components/UsersList';

export default class UsersContainer extends React.Component {
	@observable users = [];

	constructor(props) {
		super(props)

		this.addUsers = this.addUsers.bind(this);
	}

	addUsers() {
		this.users.push({name: 'test', age: '?'})
	}

	render() {
		return (
			<div>
				<button onClick={this.addUsers}>Touch Me</button>
				<UsersList users={this.users} />
			</div>
		)
	}
}
