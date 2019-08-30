import React from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';

import { createPost } from '../../actions/post';
import PageTitle from '../common/PageTitle';
import PostForm from '../modules/PostForm';

class NewPost extends React.Component {

	onSubmit = (formValues) => {
		console.log(formValues);
	}

	render() { 
		return (
			<React.Fragment>
				<PageTitle>Write a new Post</PageTitle>
				<Container maxWidth='md'>
					<PostForm onSubmit={this.onSubmit} />
				</Container>				
			</React.Fragment>
		)
	}
}

export default NewPost;