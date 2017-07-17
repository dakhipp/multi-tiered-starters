import React from 'react'

import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react';

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

import CloseIcon from 'material-ui/svg-icons/content/clear';

@inject('authStore', 'commonStore') @observer
export default class DefaultLayout extends React.Component {
	constructor(props) {
		super(props)
    this.state = {
    	open: false
    }

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  toggleDrawer() {
  	this.setState({
  		open: !this.state.open
  	})
  }

  closeDrawer() {
  	this.setState({
  		open: false
  	})
  }

  handleLogout() {
  	this.props.authStore.logout();
  }

	render() {
		let loginLogout = null;
		if(this.props.commonStore.iam) {
			loginLogout = (
				<MenuItem onClick={this.closeDrawer}>
		    	<Link 
		    		to="/"
		    		onClick={this.handleLogout}
		    		style={style.link}
		    	>Logout</Link>
		    </MenuItem>
			)
		} else {
			loginLogout = (
				<div>
					<MenuItem onClick={this.closeDrawer}>
		      	<Link 
		      		to="/login"
		      		style={style.link}
		      	>Login</Link>
		      </MenuItem>
		      <MenuItem onClick={this.closeDrawer}>
		      	<Link 
		      		to="/register"
		      		style={style.link}
		      	>Register</Link>
		      </MenuItem>
		    </div>
			)
		}

		return (
    	<div>
	      <AppBar
			    title="App Shell"
			    iconClassNameRight="muidocs-icon-navigation-expand-more"
			    onLeftIconButtonTouchTap={this.toggleDrawer}
			  />
			  <Drawer 
			    open={this.state.open} 
			    docked={false} 
			    onRequestChange={this.closeDrawer}
			  >
			  	<div style={style.headerContainer}>
				  	<h2>App Shell</h2>
				  	<CloseIcon onClick={this.closeDrawer} />
	  			</div>
	        <MenuItem onClick={this.closeDrawer}>
	        	<Link 
	        		to="/"
	        		style={style.link}
	        	>Home (User Search)</Link>
	        </MenuItem>
	        <MenuItem onClick={this.closeDrawer}>
	        	<Link 
	        		to="/about"
	        		style={style.link}
	        	>About Me</Link>
	        </MenuItem>
	        <MenuItem onClick={this.closeDrawer}>
	        	<Link 
	        		to="/open"
	        		style={style.link}
	        	>Scope Test Open</Link>
	        </MenuItem>
	        <MenuItem onClick={this.closeDrawer}>
	        	<Link 
	        		to="/user"
	        		style={style.link}
	        	>Scope Test User</Link>
	        </MenuItem>
	        <MenuItem onClick={this.closeDrawer}>
	        	<Link 
	        		to="/admin"
	        		style={style.link}
	        	>Scope Test Admin</Link>
	        </MenuItem>
	        { loginLogout }
	      </Drawer>
	      <div style={style.pageContainer}>
		      {this.props.children}
  			</div>
      </div>
	  )
	}
}

const style = {
	headerContainer: {
		display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '10px',
    paddingRight: '10px',
	},
	link: {
		display: 'block',
	},
	pageContainer: {
		paddingLeft: '5px',
		paddingRight: '5px',
	}
}
