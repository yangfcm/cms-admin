import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { checkAuth } from '../actions/auth';

const PrivateRoute = ({
	isAuthenticated,
	checkAuth,
	component: Component, 
	...rest
}) => {
	checkAuth();
	return (
		<Route component={
			(props) => (
				!isAuthenticated ? <Redirect to="/login" /> :
				<div>
					<Component {...props} />
				</div>
			)
		} 
		{...rest}
		/>
	);
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: !!state.auth.token && !state.error 
	}
}

export default connect(mapStateToProps, { checkAuth })(PrivateRoute);