import React from 'react'

import Devtools from 'mobx-react-devtools';

import SearchBtn from './SearchBtn';

import UsersContainer from '../containers/UsersContainer';;

const Home = () => (
	<div>
		<h1 style={{color:'red'}}>Home</h1>
		<UsersContainer />

		<SearchBtn label="Search" primary={true} />

		<Devtools />
	</div>
)

export default Home
