import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Loading from '../common/Loading';
import ProfileDetail from '../modules/ProfileDetail';
import ChangePassword from '../modules/ChangePassword';
import ProfileForm from '../modules/ProfileForm';


class Profile extends React.Component {
	state = {
		profile: null,	// User's profile
		isEditingProfile: false,
		isChangingPassword: false
	}

	componentDidMount = async() => {
		if(this.props.auth) {
			this.setState({
				profile: this.props.auth.auth.data.admin
			});
		}
	}
	
	handleBackToProfile = () => {
		this.setState({
			isEditingProfile: false,
			isChangingPassword: false
		})
	}

	handleChangePassword = (formValues) => {
		console.log(formValues);
	}

	render() {
		const { profile, isChangingPassword, isEditingProfile } = this.state;
		if(!profile) {
			return <Loading />
		}
		return (
			<React.Fragment>
				<Container maxWidth="sm">
					{ !isEditingProfile && <ProfileDetail profile={profile} /> }

					{ !isEditingProfile &&
					<Grid container justify="space-around">
						<Button 
							variant="outlined"
							onClick={() => {this.setState({ isEditingProfile: true, isChangingPassword: false })}}
						>Edit Profile</Button>
						<Button variant={isChangingPassword ? 'contained' : 'outlined'}
							onClick={() => { 
								this.setState((state) => { return { isEditingProfile: false, isChangingPassword: !state.isChangingPassword } }) 
							}}>
							Change Password
						</Button>
					</Grid> 
					}					
					<br />
					{ isChangingPassword &&
						<ChangePassword /> }
					{ isEditingProfile && 
						<ProfileForm 
							profile={profile} 
							handleBackToProfile={this.handleBackToProfile}
						/>}
				</Container>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}
export default connect(mapStateToProps)(Profile);