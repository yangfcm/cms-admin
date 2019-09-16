import React from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';

import { createPost } from '../../actions/post';
import PageTitle from '../common/PageTitle';
import PostForm from '../modules/PostForm';

class NewPost extends React.Component {

	state = {
		postStatus: null
		/* its value is one of these: 
		'isDoing' - App is communicating with server and waiting for server's response
		'published' - New post is published successfully  
		'saved' - New/edit post is saved successfully
		'failed' - Operation failed for whatever reason
		*/ 
	}

	componentDidMount() {
	}

	resetPostStatus = () => {
		// console.log('reset');
		this.setState({
			postStatus: null
		})
	}

	onSubmit = async (formValues) => {		
		this.setState({
			postStatus: 'isDoing'
		});
		console.log(formValues);
		const {	
			title,
			content,
			category,
			tags,
			featuredImage,
			isTop,
			status,
		} = formValues;	// Collect data from form
		const categoryData = category.id;	
		// Because data in 'category' from form is an object, we need to get its id from object
		const tagsData = [];
		tags.forEach((tag) => {
			tagsData.push(tag.id);
		})
		// Because data in 'tags' from form is an array with object, we need to create a new array to hold each element's id
		// console.log(categoryData, tagsData);

		const formData = {
			title,
			content,
			category: categoryData,
			tags: tagsData,
			featuredImage,
			isTop,
			status,
			author: this.props.auth.auth.data.admin._id
		}
		await this.props.createPost(formData);

		if(this.props.post && this.props.post.length>=1 && !this.props.error.errorMsg) {
			// Create(publish or save) post successfully
			switch(status) {
				case '1':
					this.setState({
						postStatus: 'published'
					});
					break;
				case '2':
					this.setState({
						postStatus: 'saved'
					});
					break;
				default:
					return;
			}
		} else {
			// Operation failed
			this.setState({
				postStatus: 'failed'
			})
		} 
	}

	render() { 
		return (
			<React.Fragment>
				<PageTitle>Write a new Post</PageTitle>
				<Container maxWidth='md'>
					<PostForm 
						onSubmit={this.onSubmit} 
						postStatus={this.state.postStatus} 
						resetPostStatus={this.resetPostStatus}
					/>
				</Container>				
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {		
		post: state.post,
		error: state.error,
		auth: state.auth
	}	
}

export default connect(mapStateToProps, { createPost })(NewPost);