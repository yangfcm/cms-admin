import React from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';

import { updatePost, readPost } from '../../actions/post';
import { clearError } from '../../actions/error';
import PageTitle from '../common/PageTitle';
import PostForm from '../modules/PostForm';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';

class EditPost extends React.Component {
	state = {
		postData: null,
		postStatus: null
		/* its value is one of these: 
		'isDoing' - App is communicating with server and waiting for server's response
		'published' - New post is published successfully
		'updated' - Post is updated successfully  
		'saved' - New/edit post is saved successfully
		'failed' - Operation failed for whatever reason
		*/ 
	}

	componentDidMount = async () => {
		// console.log(this.props.match.params.id);
		await this.props.readPost(this.props.match.params.id);
		if(this.props.error.errorMsg) {
			this.setState({
				postData: 'no data'
			})
			return;
		}
		this.setState({
			postData: this.props.post[0]
		})
	}

	componentWillUnmount = () => {
		this.props.clearError();
	}

	resetPostStatus = () => {
		// console.log('reset');
		this.setState({
			postStatus: null
		})
	}

	onSubmit = async (formValues) => {
		console.log(formValues);
		this.setState({
			postStatus: 'isDoing'
		});
		const {
			title,
			content,
			category,
			tags,
			featuredImage,
			isTop,
			status,
		} = formValues;
		const categoryData = category.id;
		const tagsData = [];
		if(tags) {
			tags.forEach((tag) => {
				tagsData.push(tag.id);
			});
		}
		
		const formData = {
			title,
			content,
			category: categoryData,
			tags: tagsData,
			featuredImage,
			isTop,
			status
		};
		const postId = this.props.match.params.id;
		await this.props.updatePost(postId, formData);

		if(this.props.post && this.props.post.length>=1 && !this.props.error.errorMsg) {
			// Post is updated successfully
			switch(status) {
				case '1':
					this.setState({
						postStatus: 'updated'
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
			this.setState({
				postStatus: 'failed'
			});
		}

	}

	render() {
		const { error, post } = this.props;
		console.log(this.state);
		if(!this.state.postData) {
			return <Loading />
		}
		if(this.state.postData==='no data') {
			return (
				<React.Fragment>					
					<ErrorMessage message={error.errorMsg} />
				</React.Fragment>
			)
		}
		return (
			<React.Fragment>
				<PageTitle>Edit Post</PageTitle>
				<Container maxWidth='md'>
					<PostForm 
						onSubmit={this.onSubmit} 
						editPost={this.state.postData} 
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
		error: state.error
	}
};

export default connect(
	mapStateToProps, { updatePost, readPost, clearError })(EditPost);