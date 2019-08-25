import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button'; 
// import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { login } from '../../actions/auth';
import { RenderTextField } from '../form/Fields';
import { validateLoginInput } from '../../utils/validate';

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

	formSubmit = async (values) => {
		await this.props.login({
			email: values.email,
			password: values.password
		}, () => {
			// console.log('login', this.props.history);
			this.props.history.push('/dashboard');
		});
		if(this.props.loginError) {
			throw new SubmissionError({
				password: this.props.loginError,
				_error: 'Fail to login'
			})
		}
	}

	render() {
		const { handleSubmit, classes } = this.props; 
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
					<form 
						className={classes['login--form']}
						onSubmit={ handleSubmit(this.formSubmit) }
					>
						<Field 
							name="email"
							id="email"
							type="text"
							label="Email"
							autoFocus={true}
							required={false}
							component={RenderTextField}
						/>
						<Field 
							name="password"
							id="password"
							type="password"
							label="Password"
							required={false}
							component={RenderTextField}
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

const mapStateToProps = (state) => {
	return {
		loginError: state.auth.error
	}
}

export default compose(
	connect(mapStateToProps, { login }),
	reduxForm({ 
		form: 'loginForm',
		validate: validateLoginInput
	})
)(withStyles(styles)(Login));