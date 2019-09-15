import React from 'react';
import { connect } from 'react-redux';
import { Container, AppBar, Tabs, Tab, Typography, Box, Badge } from '@material-ui/core'; 
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import moment from 'moment';

import { 
	readPosts,
	deletePost,
	updatePost,
} from '../../actions/post';
import { clearError } from '../../actions/error';
import PageTitle from '../common/PageTitle';
import Loading from '../common/Loading';
import Avatar from '../common/Avatar';
import Alert from '../modals/Alert';
import Confirm from '../modals/Confirm';
import tableIcons from '../common/TableIcons';

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;
	return (
		<Typography 
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tabpanel-${index}`}
			{...other}
		>
			<Box>{children}</Box>
		</Typography>
	)
}

const a11yProps = (index) => {
	return {
		id: `tabpanel-${index}`,
		'aria-controls': `tabpanel-${index}`
	}
}

const styles = (theme) => {
	return {
		badgeSpacing: { 
			marginTop: theme.spacing(1),
			padding: theme.spacing(0, 2),
		} 
	}
}

class Posts extends React.Component {

	state = {
		postsColumns: [
			{ title: 'Title', field: 'title',
				render: rowData => {
					return rowData.isTop ? 
						<Badge style={{paddingRight: 1+'rem'}} color="secondary" badgeContent="top">{rowData.title}</Badge> : 
						rowData.title 
				}
			},
			{ title: 'Category', 
				field: 'category',
				render: rowData => {
					return rowData.category ? rowData.category.name : 'No Category'
				}
			},
			{
				title: 'Author',
				field: 'author',
				render: rowData => {
					return rowData.author ? <Avatar loginUser={rowData.author} color="orange" /> :'No avatar'
				}
			},
			{ title: 'Created At', 
				field: 'createdAt',
				render: rowData => {
					return moment(rowData.createdAt*1000).format('Do MMM YYYY');
				}
			},
			{ title: 'Updated At', 
				field: 'updatedAt',
				render: rowData => {
					return moment(rowData.updatedAt*1000).format('Do MMM YYYY');
				}
			},
			{ title: 'Status', field: 'status',
				render: rowData => {
					return rowData.status === '1' ? <Typography color="primary">Published</Typography> : <Typography color="inherit">Draft</Typography>
				}
			}
		],
		postsData: null,
		trashColumns: [
			{ title: 'Title', field: 'title'},
			{ title: 'Category', 
				field: 'category',
				render: rowData => {
					return rowData.category ? rowData.category.name : 'No Category'
				}
			},
			{
				title: 'Author',
				field: 'author',
				render: rowData => {
					return rowData.author ? <Avatar loginUser={rowData.author} color="orange" /> :'No avatar'
				}
			},
			{ title: 'Deleted At', 
				field: 'updatedAt',
				render: rowData => {
					return moment(rowData.updatedAt*1000).format('Do MMM YYYY');
				}
			}
		],
		trashData: null,
		value: 0,
		openConfirmDeleteModal: false,	// Open or not open the modal to confirm post deletion
		postIdToDelete: null		// id of the post to delete
	}

	filterData = () => {
		// Filter out normal posts and deleted posts(in trash) and put them in different state
		if(this.props.post && this.props.post.length >= 0) {
			this.setState({
				postsData: this.props.post.filter((post) => {
					return post.status === '1' || post.status === '2';
				}),
				trashData: this.props.post.filter((post) => {
					return post.status === '3';
				})
			});
		}
	}

	componentDidMount = async() => {
		await this.props.readPosts(); 
		this.filterData();
	}

	handleCloseAlert = () => {
		this.props.clearError();
	}
	handleMoveToTrash = async (ev, rowData) => {
		await this.props.updatePost(rowData._id, {
			status: '3'
		}); 
		if(this.props.error.errorMsg) {
			return;
		} 
		this.setState((state, props) => {
			return {
				postsData: props.post.filter((post) => {
					return post.status === '1' || post.status === '2';
				}),
				trashData: [...state.trashData, rowData]
			}
		})
	}
	handleEdit = (ev, rowData) => {
		console.log(rowData);
	}
	handleDeletePermanently = async () => {
		await this.props.deletePost(this.state.postIdToDelete);
		if(this.props.error.errorMsg) {
			this.setState({
				openConfirmDeleteModal: false,
				postIdToDelete: null
			});
			return;
		}
		this.setState((state, props) => {
			return {
				trashData: props.post.filter((post) => {
					return post.status === '3';
				}),
				openConfirmDeleteModal: false,	// close confirm modal
				postIdToDelete: null
			};
		})
	}
	handleRestoreFromTrash = async (ev, rowData) => {
		await this.props.updatePost(rowData._id, {
			status: '2'
		}); 
		if(this.props.error.errorMsg) {
			return;
		} 
		this.setState((state, props) => {
			return {
				trashData: props.post.filter((post) => {
					return post.status === '3';
				}),
				postsData: [...state.postsData, rowData]
			}
		})
	}

	render() {
		console.log(this.state);
		const { error, classes } = this.props;
		if(!this.state.postsData) {
			// Is fetching data
			return <Loading />
		}
		return (
			<React.Fragment>
				<PageTitle>Posts Admin</PageTitle>
				<Container maxWidth='lg'>
					<AppBar position="static">
						<Tabs 
							value={this.state.value} 
							onChange={(e, newValue) => {this.setState({value: newValue})}}
						>							
							<Tab 
								label={<Badge className={classes.badgeSpacing} color="secondary" badgeContent={this.state.postsData ? this.state.postsData.length.toString() : '0'}>Posts</Badge>} 
								{...a11yProps(0)} 
							/> 
							<Tab 
								label={<Badge className={classes.badgeSpacing} color="secondary" badgeContent={this.state.trashData ? this.state.trashData.length.toString() : '0'}>Trash</Badge>} 
								{...a11yProps(1)} /> 
						</Tabs>
					</AppBar>
					<TabPanel value={this.state.value} index={0} >
						<MaterialTable 
							title=""
							icons={tableIcons}
							columns={this.state.postsColumns}
							data={this.state.postsData}
							actions={[
								{icon: tableIcons.Edit, tooltip: 'Edit', onClick: this.handleEdit },
								{icon: tableIcons.Delete, tooltip: 'Move to Trash', onClick: this.handleMoveToTrash}
							]} 
						/>
					</TabPanel>
					<TabPanel value={this.state.value} index={1} >
						<MaterialTable 
							style={{paddingLeft: 1+'rem', paddingRight: 1+'rem'}}
							title=""
							icons={tableIcons}
							columns={this.state.trashColumns}
							data={this.state.trashData} 
							actions={[
								{	icon: tableIcons.DeleteForever, 
									tooltip: 'Delete Permanently', 
									onClick: (ev, rowData) => { this.setState({ openConfirmDeleteModal: true, postIdToDelete: rowData._id })} },
								{	icon: tableIcons.Restore, 
									tooltip: 'Restore', 
									onClick: this.handleRestoreFromTrash}
							]}
						/>
					</TabPanel>
					
				</Container>

				<Alert 
					isOpen= {error.type==='post' && error.errorMsg}
					message={error.errorMsg}
					onCloseAlert={this.handleCloseAlert}
				/>
				<Confirm 
					isOpen = {this.state.openConfirmDeleteModal}
					message="Are you sure to delete the post permanently?"
					onCloseConfirm={() => { this.setState({ 
						openConfirmDeleteModal: false,
						postIdToDelete: null
					}) } }
					onConfirm={this.handleDeletePermanently}
				/>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		post: state.post,
		error: state.error
	}
}

export default connect(mapStateToProps, { 
	readPosts,
	deletePost,
	updatePost,
	clearError
})(withStyles(styles)(Posts));