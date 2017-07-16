import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react'
import { Devtools } from 'mobx-react-devtools';

const appState = observable({
	count: 0
});
appState.increment = function() {
	this.count++;
}
appState.decrement = function() {
	this.count--;
}

@observer 
export default class Counter extends React.Component {
	render() {
		return (
			<div>
				<Devtools />
				<p>Counter: {this.props.store.count}</p>
				<button onClick={this.increment}>+</button>
				<button onClick={this.decrement}>-</button>
			</div>
		)
	}
}