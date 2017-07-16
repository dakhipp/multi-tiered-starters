import createBrowserHistory from 'history/createBrowserHistory'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'

const browserHistory = createBrowserHistory();
const routerStore = new RouterStore();

const history = syncHistoryWithStore(browserHistory, routerStore);

export default routerStore;
export { history };
