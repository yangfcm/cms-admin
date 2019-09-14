import React from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import MaterialTable from 'material-table';
import moment from 'moment';

import { 
	readCategories, 
	createCategory,
	deleteCategory,
	updateCategory } from '../../actions/category';
import { clearError } from '../../actions/error';
import PageTitle from '../common/PageTitle';
import Loading from '../common/Loading';
// import ErrorMessage from '../common/ErrorMessage';
import Alert from '../modals/Alert';
import tableIcons from '../common/TableIcons';

class Categories extends React.Component {

	state = {
		columns: [
			{ title: 'Category Name', field: 'name'},
			{ title: 'Description', field: 'description'}, 
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

	componentDidMount = async () => {
		await this.props.readCategories();
		this.setState({
			data: this.props.category
		})
	}

	// componentWillUnmount = () => {
	// 	this.props.clearError();
	// }

	handleAddCategory = (newData) => {
		return new Promise(async (resolve, reject) => { 
			await this.props.createCategory(newData);
			if(this.props.error.errorMsg) {
				reject();
			} else {
				this.setState({
					data: this.props.category
				});
				resolve();
			} 
		});
	}

	handleUpdateCategory = (newData, oldData) => {

		return new Promise(async(resolve, reject) => { 
			if(newData.name.trim().toLowerCase() === oldData.name.trim().toLowerCase()) {
				// If name isn't changed delete name property in newData to prevent duplication error.
				delete newData.name;
			} 
			const data = this.state.data;
			const index = data.indexOf(oldData);
			data[index] = newData;
			await this.props.updateCategory(oldData._id, newData); 
			if(this.props.error.errorMsg){ 
				reject();
			} else {
				this.setState({ data: this.props.category });
				resolve();
			}
		});
	}
	
	handleDeleteCategory = (oldData) => {
		return new Promise(async (resolve, reject) => {
			await this.props.deleteCategory(oldData._id);
			if(this.props.error.errorMsg) {
				reject();
			} else {
				this.setState({
					data: this.props.category
				});
				resolve();
			}
		})
	}

	handleCloseAlert = () => {
		this.props.clearError();
		this.setState({
			data: this.props.category
		});
	}

	render() {
		const {error} = this.props;
		if(!this.state.data) {
			// Is fetching data
			return <Loading />
		}
		// console.log(this.state);
		return ( 
			<React.Fragment>
				<PageTitle>Categories Admin</PageTitle>
				<Container maxWidth="lg">
					<MaterialTable 
						title="Categories List"
						icons={tableIcons}
						columns={this.state.columns}
						data={this.state.data}
						editable={{
							onRowAdd: this.handleAddCategory,
							onRowUpdate: this.handleUpdateCategory,
							onRowDelete: this.handleDeleteCategory 
						}}
					/> 
				</Container>
				<Alert 
					isOpen={error.type==='category' && error.errorMsg} 
					message={error.errorMsg} 
					onCloseAlert={this.handleCloseAlert}
				/>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		category: state.category,
		error: state.error,
		auth: state.auth
	}
}

export default connect(mapStateToProps, {
	readCategories,
	createCategory,
	deleteCategory,
	updateCategory,
	clearError
})(Categories);