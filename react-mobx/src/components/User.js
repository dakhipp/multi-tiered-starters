import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('testStore') @observer
export default class User extends React.Component {
	componentDidMount() {
		this.props.testStore.user();
	}

	componentWillUnmount() {
		this.props.testStore.reset();
	}

	render() {
		const { result } = this.props.testStore;
		return (
			<div>
				<h1 style={{color:'blue'}}>User</h1>
				<p>{result}</p>
			</div>
		)
	}
}
