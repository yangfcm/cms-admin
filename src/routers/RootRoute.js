// import React from 'react';
// import { connect } from 'react-redux';
// import { Route, Redirect } from 'react-router-dom';

// import { checkAuth } from '../actions/auth';

// const RootRoute = ({
// 	isAuthenticated,
// 	checkAuth
// }) => {
// 	checkAuth();
// 	return (
// 		<Route component={
// 			() => (
// 				isAuthenticated ? <Redirect to="/dashboard" /> : <Redirect to="/login" />
// 			)
// 		} />
// 	);
// }

// const mapStateToProps = (state) => {
// 	return {
// 		isAuthenticated: !!state.auth.token && !state.error 
// 	}
// }

// export default connect(mapStateToProps, { checkAuth })(RootRoute);