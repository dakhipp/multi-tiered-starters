import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('commonStore') 
@observer
export default class AboutMe extends React.Component {
	render() {
		return (
			<div>
				<h1 style={{color:'blue'}}>About Me</h1>
				<p>Name: {this.props.commonStore.iam ? this.props.commonStore.iam.name : 'n/a'}</p>
				<p>Username: {this.props.commonStore.iam ? this.props.commonStore.iam.username : 'n/a'}</p>
				<p>Phone Number: {this.props.commonStore.iam ? this.props.commonStore.iam['phone_number'] : 'n/a'}</p>
				<p>Email: {this.props.commonStore.iam ? this.props.commonStore.iam.email : 'n/a'}</p>
			</div>
		)
	}
}
