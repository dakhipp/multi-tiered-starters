import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { Provider } from 'mobx-react'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import { Router, Route } from 'react-router'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { green100, green500, green700 } from 'material-ui/styles/colors'
import injectTapEventPlugin from 'react-tap-event-plugin'

import DefaultLayout from './layouts/DefaultLayout'
import Home from './components/Home'
import About from './components/About'

import './registerServiceWorker';
import './index.css'

const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()

injectTapEventPlugin()

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
  routing: routingStore,
};

const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
  <Provider {...stores}>
  	<MuiThemeProvider muiTheme={muiTheme}>
	    <Router history={history}>
	      <DefaultLayout>
	        <Route exact path="/" component={Home} />
	        <Route path="/about" component={About} />
	      </DefaultLayout>
	    </Router>
	  </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
