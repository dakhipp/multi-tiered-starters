import React from 'react'
import { observer } from 'mobx-react'

@observer
export default class UsersList extends React.Component {
	render() {
		const userItem = this.props.users.map((user, i) => {
			return (
				<div key={i}>
					<p>{user.name}</p>
					<p>{user.age}</p>
				</div>
			);
		});
		return <div>{userItem}</div>
	}
}
