import React from 'react';
import { Modal, Grid, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'; 

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #aaa',
    boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		width: '50%',
		minHeight: '20%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
  },
}));

const Confirm = ({ message, isOpen, onCloseConfirm, onConfirm }) => {
	const classes = useStyles();
	return (
		<Modal
			open={!!isOpen}
			style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
			onClose={() => { onCloseConfirm() }}
			disableBackdropClick
		>
			<Grid className={classes.paper} container direction="column" justify="space-around">
				<Grid item>
					<Grid container justify="center" alignItems="center">
						<Typography color="secondary" variant="h5">{ message }</Typography>					
					</Grid>
				</Grid>
				<Grid item>
					<Button color="primary" onClick={() => { onConfirm() }}>Confirm</Button>
					<Button color="default" onClick={() => {onCloseConfirm()}}>Cancel</Button>
				</Grid>
			</Grid>
		</Modal>
	)
}

export default Confirm;