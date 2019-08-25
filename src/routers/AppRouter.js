import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from './PrivateRoute';

import Login from '../components/pages/Login';
import Dashboard from '../components/pages/Dashboard';

const history = createBrowserHistory();
const AppRouter = () => {
	return (
		<Router history={history}>
			<Switch>
				<Route path="/login" component={Login} />
				<PrivateRoute path="/dashboard" component={Dashboard} />
				<Route path="/" component={Login} />
			</Switch>
		</Router>
	)
}

export default AppRouter