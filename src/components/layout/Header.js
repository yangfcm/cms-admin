import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
	AppBar, 
	Typography, 
	IconButton, 
	Toolbar, 
	useScrollTrigger,
	Fade,
	Paper,
	Popover ,
	List,
	ListItem,
	ListItemIcon,
	ListItemText
} from '@material-ui/core'; 
import { makeStyles } from '@material-ui/core/styles';
import AssistantRoundedIcon from '@material-ui/icons/AssistantRounded';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import Avatar from '../common/Avatar'; 
import Confirm from '../modals/Confirm';
import { logout } from '../../actions/auth';

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
		marginRight: 15,
		textTransform: 'capitalize',
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	},
	avatarButton: {
		marginRight: 20
	},
	popup: {
		paddingTop: 12
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
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [isOpen, setIsOpen] = React.useState(false);

	const handleClickAvatar = (ev) => {
		// console.log(ev);
		setAnchorEl(anchorEl ? null : ev.currentTarget);
	}
	const handleClose = () => {
		setAnchorEl(null);
	}
	const open = !!anchorEl;
	const id = open ? 'admin-popper' : undefined;

	const handleGoToProfile = () => {
		props.history.push('/profile');
	}
	const handleLogout = async () => {
		await props.logout(() => {
			console.log('logout');
			props.history.push('/login');
		});
	}

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
					<IconButton className={classes.avatarButton} onClick={handleClickAvatar} style={{padding: 0}}> 
						<Avatar loginUser={admin}/> 
					</IconButton>
					<Popover 
						id={id} 
						open={open} 
						anchorEl={anchorEl} 
						onClose={handleClose}
						anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
						transformOrigin={{vertical:'top', horizontal: 'center'}} 
					>
						<Paper className={classes.popup}>
							<List>
								<ListItem button onClick={handleGoToProfile}>
									<ListItemIcon>
										<AccountCircleOutlinedIcon />
									</ListItemIcon>
									<ListItemText primary="My Profile" />
								</ListItem>
								<ListItem button onClick={() => { setIsOpen(true)}}> 
										<ListItemIcon>
											<ExitToAppOutlinedIcon />
										</ListItemIcon>												
										<ListItemText primary="Log Out" /> 
								</ListItem>
							</List>
						</Paper>  
					</Popover>
				</Toolbar>
			</AppBar>
		</ElevationScroll>
		<Confirm 
			isOpen={isOpen} 
			message="Are you sure to logout?" 
			onCloseConfirm={() => {setIsOpen(false)}}
			onConfirm={handleLogout}
		/>
		</React.Fragment>
	)
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, { logout })(withRouter(Header));