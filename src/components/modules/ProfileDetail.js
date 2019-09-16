import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import FaceIcon from '@material-ui/icons/Face';
import Avatar from '../common/Avatar';

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

const ProfileDetail = (props) => {
	const { profile, classes } = props;
	return (
		<React.Fragment>
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
		</React.Fragment>
	);
};

export default withStyles(styles)(ProfileDetail);