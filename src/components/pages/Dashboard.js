import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => {
	return { 	
		toolbar: theme.mixins.toolbar,
	}
}

class Dashboard extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<div>
				<div className={classes.toolbar}></div>
				Dashboard page {process.env.REACT_APP_API_URL}
			</div>
		) ;
	}
}

export default withStyles(styles)(Dashboard);