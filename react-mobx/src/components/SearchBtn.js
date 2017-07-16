import React from 'react';

import FlatButton from 'material-ui/FlatButton';

export default class SearchBtn extends React.Component {
	constructor(props) {
		super(props);

		this.handleTap = this.handleTap.bind(this);
	}

	handleTap() {
		console.log('tap');
	}

	render() {
		return ( 
			<div>
				<FlatButton
					label="Search"
					primary={true}
					onTouchTap={this.handleTap}
				/>
			</div>
		);
	}
}
