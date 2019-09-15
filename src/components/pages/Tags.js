import React from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import MaterialTable from 'material-table';
import moment from 'moment';

import { 
	readTags,
	createTag,
	deleteTag, 
	updateTag
} from '../../actions/tag';
import { clearError } from '../../actions/error';
import PageTitle from '../common/PageTitle';
import Loading from '../common/Loading';
import Alert from '../modals/Alert';
import tableIcons from '../common/TableIcons'; 

class Tags extends React.Component {

	state = {
		columns: [
			{ title: 'Tag Name', field: 'name' },
			{ 
				title: 'Created At', 
				field: 'createdAt', 
				editable: 'never',
				render: rowData => { 
					return rowData ? moment(rowData.createdAt*1000).format('Do MMM YYYY') : null;
				}
			},
			{ 
				title: 'Updated At', 
				field: 'updatedAt', 
				editable: 'never', 
				render: rowData => { 
					return rowData ? moment(rowData.updatedAt*1000).format('Do MMM YYYY') : null;
				}
			}
		],
		data: null
	}
	
	componentDidMount = async() => {
		await this.props.readTags();
		this.setState({
			data: this.props.tag
		})
	}

	handleAddTag = (newData) => {
		return new Promise(async(resolve, reject) => {
			await this.props.createTag(newData);
			if(this.props.error.errorMsg) {
				reject();
			} else {
				this.setState({
					data: this.props.tag
				});
				resolve();
			}
		});
	}

	handleUpdateTag = (newData, oldData) => {
		return new Promise(async(resolve, reject) => {
			const data = this.state.data;
			const index = data.indexOf(oldData);
			data[index] = newData;
			await this.props.updateTag(oldData._id, newData);
			if(this.props.error.errorMsg) {
				reject();
			} else {
				this.setState({ data: this.props.tag });
				resolve();
			}
		});
	}

	handleDeleteTag = (oldData) => {
		return new Promise(async(resolve, reject) => {
			await this.props.deleteTag(oldData._id);
			if(this.props.error.errorMsg) {
				reject();
			} else {
				this.setState({
					data: this.props.tag
				});
				resolve();
			}
		});
	}

	handleCloseAlert = () => {
		this.props.clearError();
		this.setState({
			data: this.props.tag
		});
	}

	render() {
		const { error } = this.props;
		if(!this.state.data) {
			// Is fetching data
			return <Loading />
		} 
		return (
			<React.Fragment>
				<PageTitle>Tags Admin</PageTitle>
				<Container maxWidth="lg">
					<MaterialTable 
						title="Tags List"
						icons={tableIcons}
						columns={this.state.columns}
						data={this.state.data}
						editable={{
							onRowAdd: this.handleAddTag,
							onRowUpdate: this.handleUpdateTag,
							onRowDelete: this.handleDeleteTag
						}}
					/>
				</Container>

				<Alert
					isOpen={error.type==='tag' && error.errorMsg}
					message={error.errorMsg}
					onCloseAlert={this.handleCloseAlert}
				/>
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
	updateTag,
	clearError
})(Tags);