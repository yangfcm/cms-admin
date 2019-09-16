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
		'saved' - New/edit post is saved successfully
		'failed' - Operation failed for whatever reason
		*/ 
	}

	componentDidMount = async () => {
		console.log(this.props.match.params.id);
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

	onSubmit = (formValues) => {
		console.log(formValues);
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
					<PostForm onSubmit={this.onSubmit} editPost={this.state.postData} /> 
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