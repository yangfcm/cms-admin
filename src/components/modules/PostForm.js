import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { Typography, Container, Button, Grid } from '@material-ui/core';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';

import { RenderTextField, RenderSelect, RenderCreatableSelect } from '../form/Fields';
import Editor from '../form/Editor';
import { createPost } from '../../actions/post';
import { readCategories } from '../../actions/category';
import { readTags } from '../../actions/tag';

class PostForm extends React.Component {
	state = {
		categoryOptions: null,
		tagOptions: null
	};

	componentDidMount = async () => {
		if(!this.props.category || this.props.category.length === 0) {
			// console.log('read category');
			await this.props.readCategories();
		}
		if(!this.props.tag || this.props.tag.length === 0) {
			// console.log('read tag');
			await this.props.readTags();
		}		
		this.setCategoryOptions();
		this.setTagOptions(); 
	}

	formSubmit = (formValues) => {
		this.props.onSubmit(formValues);
	}

	setCategoryOptions = () => {
		if(this.props.category && this.props.category.length > 0 ) {
			const categoryArr = this.props.category;
			const categoryOptions = []
			for(let i = 0; i < categoryArr.length; i++) {
				categoryOptions.push({
					id: categoryArr[i]._id,
					label: categoryArr[i].name,
					value: categoryArr[i].name
				})
			}
			this.setState({	categoryOptions	});
		}
	}

	setTagOptions = () => {
		if(this.props.tag && this.props.tag.length > 0) {
			const tagArr = this.props.tag;
			const tagOptions = [];
			for(let i = 0; i < tagArr.length; i++) {
				tagOptions.push({
					id: tagArr[i]._id,
					label: tagArr[i].name,
					value: tagArr[i].name
				})
			}
			this.setState({	tagOptions });
		}
	}

	render() {
		const { handleSubmit } = this.props;
		// console.log(this.state.tagOptions);
			return (
				<form onSubmit={ handleSubmit(this.formSubmit) }>
					<Grid container style={{marginBottom: 10+'px'}}>
						<Field 
							name="title"
							id="title"
							type="text"
							label="Title"
							autoFocus
							component={RenderTextField}
						/>
					</Grid>
					<Grid container spacing={4} style={{marginBottom: 3+'px'}}>
						<Grid item xs={12} sm={6}>
							<Field 
								name="category"
								id="category"
								label=""
								placeholder="Category"
								component={RenderSelect}
								options={ this.state.categoryOptions || [] }
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Field 
								name="tags"
								id="tags"
								label=""
								placeholder="Tags"
								isMulti={true}
								component={RenderCreatableSelect}
								options={this.state.tagOptions || []}
							/>
						</Grid>
					</Grid>				
					
					<Field
						name="content"
						component={Editor}
					/>
					<Container align="center" style={{marginTop: 4+'rem'}}>						
						<Button 
							type="submit"
							variant="outlined"
							color="primary"
						>
							<PublishOutlinedIcon></PublishOutlinedIcon>
							Publish
						</Button>
						<Button 
							type="button"
							variant="outlined"
							color="secondary"
							style={{marginLeft: 1+'rem'}}
						>
							<SaveOutlinedIcon></SaveOutlinedIcon>
							Save
						</Button>
					</Container>
				</form>
			);
	}
}

const mapStateToProps = (state) => {
	return {
		category: state.category,
		tag: state.tag,
		error: state.error 
	}
}

export default compose(
	connect(mapStateToProps, { readCategories, readTags }),
	reduxForm({ form: 'post' })
)(PostForm);