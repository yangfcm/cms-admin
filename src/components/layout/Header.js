import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AppBar from '@material-ui/core/AppBar'; 
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import AssistantRoundedIcon from '@material-ui/icons/AssistantRounded';
import Avatar from '../common/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	appBar: {
		zIndex: 99999
	},
	toolbar: {
		paddingRight: 24
	},
	title: {
		flexGrow: 1
	},
	greeting: {
		marginRight: 10,
		textTransform: 'capitalize',
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	}
}));

const ElevationScroll = (props) => {
	const { children, window } = props;
	const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Header = (props) => {
	const { admin } = props.auth.auth.data;
	const classes = useStyles();
	return (
		<React.Fragment>
		<ElevationScroll {...props}>
			<AppBar className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						color="inherit"
					>
						<AssistantRoundedIcon />
					</IconButton>	{/* Menu button */}	
					<Typography 
						commponent="h1"
						variant="h6"
						noWrap
						className={classes.title}
					>
						<span style={{textTransform: "capitalize"}}>
							CMS Admin
						</span>
					</Typography>	{ /* Title */}
					<Typography
						className={classes.greeting} 
						variant="body2"
						noWrap
					> Welcome, {admin.firstname} {admin.lastname}
					</Typography>
					<Avatar loginUser = {admin}/> 
				</Toolbar>
			</AppBar>
		</ElevationScroll>
		</React.Fragment>
	)
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, null)(withRouter(Header));