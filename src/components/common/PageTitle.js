import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( theme => (
	{
		title: {
			textTransform: 'capitalize'
		}
	}
));

const PageTitle = (props) => {
	const classes = useStyles();
	return ( 
		<Typography 
			variant="h5" 
			component="h1"
			align="center" 
			gutterBottom
			className={classes.title}
		>
			{props.children}
		</Typography> 
	);
}

export default PageTitle;