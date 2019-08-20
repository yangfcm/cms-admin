import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button'; 
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const styles = (theme) => {
	return {
		'login--container': {
			marginTop: theme.spacing(10),
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center'
		},
		'login--avatar': {
			marginTop: theme.spacing(1),
			backgroundColor: theme.palette.secondary.main,
		},
		'login--form': {
			width: '100%',
			marginTop: theme.spacing(1)
		},
		'login--submit': {
			margin: theme.spacing(3, 0, 2)
		}
	}
}

class Login extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<Container maxWidth='xs'>
				<div className={classes['login--container']}>
					<Typography component="h1" variant="h4">
						CMS Admin
					</Typography>
					<Avatar className={classes['login--avatar']}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Log in
					</Typography>
					<form className={classes['login--form']}>
						<TextField 
							variant="outlined"
							required
							id="email"
							name="email"
							label="Email"
							autoFocus
							fullWidth
							margin="normal"
						/>
						<TextField 
							variant="outlined"
							id="password"
							required
							name="password"
							type="password"
							label="Password"
							fullWidth
							margin="normal"
							
						/>
						<Button 
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes['login--submit']}
						>Log In
						</Button>
					</form>
				</div> 
			</Container>
		)
	}
}

export default withStyles(styles)(Login);