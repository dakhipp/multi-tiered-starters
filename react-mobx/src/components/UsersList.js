import React from 'react'
import { inject, observer } from 'mobx-react'

@inject('usersStore') @observer
export default class UsersList extends React.Component {
	constructor(props) {
		super(props);
		
		this.renderList = this.renderList.bind(this);
	}

	componentWillMount() {
		this.props.usersStore.getAll();	
	}

	renderList() {
		const { users } = this.props.usersStore;

		return users.map((user, i) => {
			return (
				<div key={i}>
					<p>Username: {user.username}</p>
				</div>
			);
		});
	}

	render() {
		const { users } = this.props.usersStore;

		return (
			<div>
				<h2>User List:</h2>
				{ users.length ? this.renderList() : "Loading..." }
			</div>
		);
	}
}
