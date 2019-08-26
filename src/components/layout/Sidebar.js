import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0
		}, 
	},
	drawerPadding: {
		paddingTop: theme.spacing(5)
	},
	toolbar: theme.mixins.toolbar
}) );

const Sidebar = (props) => {
	const { container } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [ mobileOpen, setMobileOpen ] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	}

	const drawer = (
		<div>
			<List>
				{
					['New Post', 'Posts', 'Categories'].map((text, index) => {
						return (
							<ListItem button key={index}>
								<ListItemText primary={text} />
							</ListItem>
						)
					})
				}
			</List>
		</div>
	)

	return ( 
		<Drawer 
			variant="permanent"
		>
			<div className={classes.toolbar}></div>
			{drawer}
		</Drawer>  
	);
}

export default Sidebar;