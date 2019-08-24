import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Login from '../components/pages/Login';
import Dashboard from '../components/pages/Dashboard';

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/login" component={Login} />
				<PrivateRoute path="/dashboard" component={Dashboard} />
				<Route path="/" component={Login} />
			</Switch>
		</BrowserRouter>
	)
}

export default AppRouter