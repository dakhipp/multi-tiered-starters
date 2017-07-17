import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('testStore') @observer
export default class Admin extends React.Component {
	componentDidMount() {
		this.props.testStore.admin();
	}

	componentWillUnmount() {
		this.props.testStore.reset();
	}

	render() {
		return (
			<div>
				<h1 style={{color:'blue'}}>Admin</h1>
				<p>{this.props.testStore.result}</p>
			</div>
		)
	}
}
