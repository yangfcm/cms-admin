import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	body: {
		flexGrow: 1,
		padding: theme.spacing(3),
		marginLeft: 160+'px'
	}
}) );

const Body = (props) => {
	const classes = useStyles();

	return ( 
		<div className={classes.body}>{props.children}</div> 
	)
};

export default Body;