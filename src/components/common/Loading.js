import React from 'react'; 
import { Grid, CircularProgress } from '@material-ui/core';

const Loading = () => {
	return (
		<Grid container justify="center" alignItems="center">
			<Grid item>
				<CircularProgress />
			</Grid>
		</Grid>
	)
};

export default Loading;