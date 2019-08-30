import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { Typography, Container, Button } from '@material-ui/core';

import { createPost } from '../../actions/post';
import PageTitle from '../common/PageTitle';
import { RenderTextField } from '../form/Fields';
import Editor from '../form/Editor';

class NewPost extends React.Component {

	formSubmit = (formValues) => {
		console.log(formValues);
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<React.Fragment>
				<PageTitle>Write a new Post</PageTitle>
				<Container maxWidth='md'>
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
				</Container>
				
			</React.Fragment>
		)
	}
}

export default reduxForm({ form: 'newPost'})(NewPost);