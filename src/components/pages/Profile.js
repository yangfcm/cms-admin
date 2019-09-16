import React from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';

import PageTitle from '../common/PageTitle';

class Profile extends React.Component {

	render() {
		return (
			<React.Fragment>
				<PageTitle>My Profile</PageTitle>
			</React.Fragment>
		)
	}
}

export default Profile;