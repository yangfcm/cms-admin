import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Typography, Container, Button } from '@material-ui/core';

import { RenderTextField } from '../form/Fields';
import Editor from '../form/Editor';

class PostForm extends React.Component {
	
	formSubmit = (formValues) => {
		this.props.onSubmit(formValues);
	}

	render() {
		const { handleSubmit } = this.props;
			return (
				<form onSubmit={ handleSubmit(this.formSubmit) }>
					<Field 
						name="title"
						id="title"
						type="text"
						label="Title"
						autoFocus
						component={RenderTextField}
					/>
					<Field
						name="content"
						component={Editor}
					/>
					<Container align="center" style={{marginTop: 4+'rem'}}>						
						<Button 
							type="submit"
							variant="outlined"
							color="primary"
						>Publish
						</Button>
						<Button 
							type="button"
							variant="outlined"
							color="secondary"
							style={{marginLeft: 1+'rem'}}
						>Save as Draft
						</Button>
					</Container>
				</form>
			);
	}
}

export default reduxForm({ form: 'post' })(PostForm);