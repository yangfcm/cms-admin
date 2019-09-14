import React from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';

import { readPosts } from '../../actions/post';
import PageTitle from '../common/PageTitle';

class Posts extends React.Component {

	componentDidMount() {
		
	}

	render() {
		return (
			<React.Fragment>
				<PageTitle>Posts List</PageTitle>
				<Container maxWidth='lg'>
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

export default connect(mapStateToProps, { readPosts })(Posts);