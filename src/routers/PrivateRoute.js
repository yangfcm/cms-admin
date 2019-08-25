import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { checkAuth } from '../actions/auth';

class PrivateRoute extends React.Component {

	componentDidMount = () => {
		// console.log('check auth,', this.props);
		this.props.checkAuth();
	}
	
	render() {
		const {
			auth: { auth, error},
			checkAuth,
			component: Component, 
			...rest
		} = this.props;
		// console.log(auth);
		if(auth === null && error === null) { 	// Initial state
			return <div>Loading...</div>;
		}

		if(!!error || !auth.data) {	// Auth failed
			// console.log(auth);  
			return <Redirect to="/login" />
		}
		
		return (
			<Route component={
				(props) => ( <div><Component {...props} /></div> )
			} 
			{...rest}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, { checkAuth })(PrivateRoute);