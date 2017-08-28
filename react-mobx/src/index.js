import React from 'react'
import ReactDOM from 'react-dom'
import promiseFinally from 'promise.prototype.finally';
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'
import { Router, Route } from 'react-router'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { green100, green500, green700 } from 'material-ui/styles/colors'
import injectTapEventPlugin from 'react-tap-event-plugin'

import DefaultLayout from './layouts/DefaultLayout'
import Home from './components/Home'
import AboutMe from './components/AboutMe'
import Open from './components/Open'
import User from './components/User'
import Admin from './components/Admin'
import Login from './components/Login'
import Register from './components/Register'

import routerStore, { history } from './stores/routerStore';
import authStore from './stores/authStore';
import commonStore from './stores/commonStore';
import testStore from './stores/testStore';
import usersStore from './stores/usersStore';

import './registerServiceWorker'
import './css/index.css'

promiseFinally.shim();
injectTapEventPlugin()
useStrict(true);

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
    primary3Color: green100,
  },
}, {
  avatar: {
    borderColor: null,
  },
  // userAgent: req.headers['user-agent'] // needed for server rendering,
});

// can add other stores to share properties globaly using @inject and @observer
const stores = {
  routerStore,
  authStore,
  commonStore,
  testStore,
  usersStore,
};

ReactDOM.render(
  <Provider {...stores}>
  	<MuiThemeProvider muiTheme={muiTheme}>
	    <Router history={history}>
	      <DefaultLayout>
	        <Route exact path="/" component={Home} />
	        <Route path="/about" component={AboutMe} />
	        <Route path="/open" component={Open} />
	        <Route path="/user" component={User} />
	        <Route path="/admin" component={Admin} />
	        <Route path="/login" component={Login} />
	        <Route path="/register" component={Register} />
	      </DefaultLayout>
	    </Router>
	  </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
