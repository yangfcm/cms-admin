import React from 'react';
import Drawer from '@material-ui/core/Drawer'; 
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';

import ListItemLink from '../common/ListItemLink'; 

const useStyles = makeStyles(theme => ({
	toolbar: theme.mixins.toolbar,
	'active-link': {
		color: theme.palette.primary.main,
		'& > *': {
			color: 'inherit'
		}
	},
}) );

const Sidebar = (props) => { 
	const classes = useStyles(); 

	const drawer = (
		<List>				
			<ListItemLink button to="/dashboard" activeClassName={classes['active-link']}>
				<ListItemIcon><DashboardOutlinedIcon /></ListItemIcon>
				<ListItemText primary="Dashboard" />
			</ListItemLink>
			<ListItemLink button to="/new" activeClassName={classes['active-link']}>
				<ListItemIcon><CreateOutlinedIcon /></ListItemIcon>
				<ListItemText primary="New Post" />
			</ListItemLink>
			<ListItemLink button to="/posts" activeClassName={classes['active-link']}>
				<ListItemIcon><LibraryBooksOutlinedIcon /></ListItemIcon>
				<ListItemText primary="Posts" />
			</ListItemLink>
			<ListItemLink button to="/categories" activeClassName={classes['active-link']}>
				<ListItemIcon><CategoryOutlinedIcon /></ListItemIcon>
				<ListItemText primary="Categories" />
			</ListItemLink>
		</List>
	)

	return ( 
		<div>
			<div className={classes.toolbar}></div> 
			<Drawer variant="permanent">
				<div className={classes.toolbar} />
				{drawer}
			</Drawer> 
		</div>
	);
}

export default Sidebar;