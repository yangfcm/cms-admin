import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Container, Typography, Button, Modal, Grid } from '@material-ui/core';

import { RenderTextField } from '../form/Fields';

class ProfileForm extends React.Component {

	formSubmit = (formValues) => {
		console.log(formValues);
	}

	render() {
		const { handleSubmit, handleBackToProfile } = this.props;
		return (
			<Container>
				<form onSubmit={handleSubmit(this.formSubmit)}>
					<Field 
						name="firstName"
						id="firstName"
						type="text"
						label="First Name"
						component={RenderTextField}
					/>
					<Field 
						name="lastName"
						id="lastName"
						type="text"
						label="Last Name"
						component={RenderTextField}
					/>
					<Field 
						name="username"
						id="username"
						type="text"
						label="Username"
						component={RenderTextField}
					/>
					<br /><br />
					<Button 
						variant="outlined"
						color="default"
					> Upload Avatar</Button>
					<br /><br />
					<Grid container justify="space-around">
						<Button variant="outlined" color="primary">
							Update
						</Button>
						<Button 
							variant="outlined" 
							color="default"
							onClick={handleBackToProfile }
						>
							Cancel
						</Button>
					</Grid>
				</form>
			</Container>
		)
	}
}

export default reduxForm({
	form: 'editProfile',
	touchOnBlur: false,
	touchOnChange: false
})(ProfileForm);