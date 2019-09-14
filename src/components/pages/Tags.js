import React from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';

import { 
	readTags,
	createTag,
	deleteTag, 
} from '../../actions/tag';
import PageTitle from '../common/PageTitle';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';

class Tags extends React.Component {
	
	componentDidMount = async() => {
		await this.props.readTags();
	}

	render() {
		const { tag, error } = this.props;
		if( (!tag || tag.length === 0) && (!error.type && !error.errorMsg)) {
			// Is fetching data
			return <Loading />
		}
		if(error.type==='tag' && error.errorMsg) {
			return <ErrorMessage message="Error: Failed to fetch data." />
		}
		return (
			<React.Fragment>
				<PageTitle>Tags List</PageTitle>
				<Container maxWidth="lg">
				</Container>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		tag: state.tag,
		error: state.error,
		auth: state.auth
	}
}

export default connect(mapStateToProps, {
	readTags,
	createTag,
	deleteTag, 
})(Tags);