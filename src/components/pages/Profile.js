import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Typography } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { withStyles } from '@material-ui/core/styles';

import FaceIcon from '@material-ui/icons/Face';
import Avatar from '../common/Avatar';
import Loading from '../common/Loading';

const styles = (theme) => ({
	gridTitle: {
		flex: 1
	},
	gridContent: {
		flex: 2
	},
	gridMargin: {
		marginBottom: 15
	}
})

class Profile extends React.Component {
	state = {
		profile: null
	}

	componentDidMount = async() => {
		if(this.props.auth) {
			this.setState({
				profile: this.props.auth.auth.data.admin
			});
		}
	}

	render() {
		const {classes} = this.props; 
		const { profile } = this.state;
		if(!profile) {
			return <Loading />
		}
		return (
			<React.Fragment>
				<Container maxWidth="xs">
					<Grid container direction="column" justify="center" alignItems="center">
						<Avatar loginUser={profile} color="orange" size="big"/>
						<Typography variant="h5" style={{marginTop: 15+'px'}}>
						 {profile.firstname} {profile.lastname}
						</Typography>
					</Grid>
					<br />
					<Grid container justify="space-between" className={classes.gridMargin}> 
						<Grid item className={classes.gridTitle}>
							<Grid container> {/* Email */}
								<Typography color="primary"><EmailIcon /></Typography>&nbsp;
								<Typography color="primary">Email </Typography>							
							</Grid>
						</Grid>
						<Grid item className={classes.gridContent}>
							<Grid container justify="center">
								<Typography>{profile.email}</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid container justify="space-between" className={classes.gridMargin}> 
						<Grid item className={classes.gridTitle}>
							<Grid container>	{ /* username */}
								<Typography color="primary"><PermContactCalendarIcon /></Typography>&nbsp;
								<Typography color="primary">Username </Typography>							
							</Grid>
						</Grid>
						<Grid item className={classes.gridContent}>
							<Grid container justify="center">
								<Typography>{profile.username}</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid container justify="space-between" className={classes.gridMargin}> 
						<Grid item className={classes.gridTitle}>
							<Grid container>	{ /* first name */}
								<Typography color="primary"><FaceIcon /></Typography>&nbsp;
								<Typography color="primary">First Name </Typography>							
							</Grid>
						</Grid>
						<Grid item className={classes.gridContent}>
							<Grid container justify="center">
								<Typography>{profile.firstname}</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid container justify="space-between" className={classes.gridMargin}> 
						<Grid item className={classes.gridTitle}> 
							<Grid container> { /* last name */}
								<Typography color="primary"><SupervisorAccountIcon /></Typography>&nbsp;
								<Typography color="primary">Last Name </Typography>							
							</Grid>
						</Grid>
						<Grid item className={classes.gridContent}>
							<Grid container justify="center">
								<Typography>{profile.lastname}</Typography>
							</Grid>
						</Grid>
					</Grid>
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
export default connect(mapStateToProps)(withStyles(styles)(Profile));