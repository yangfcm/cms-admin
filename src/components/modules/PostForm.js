import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field, change, formValueSelector } from 'redux-form';
import { Typography, Container, Button, Grid } from '@material-ui/core';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';

import { RenderTextField, RenderSelect, RenderCreatableSelect } from '../form/Fields';
import Editor from '../form/Editor';
import { createPost } from '../../actions/post';
import { readCategories } from '../../actions/category';
import { readTags, createTag } from '../../actions/tag';
import { validatePostInput } from '../../utils/validate';

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

	componentWillUnmount() { 
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

	/**
	 * When creating a tag on form, add the tag into database.
	 * In order to achieve this, we need to customize the behavior of react select
	 */
	handleCreateOption = async (inputTag) => {
		// console.log(inputTag);
		await this.props.createTag({ name: inputTag });
		this.setTagOptions();
		const newTag = this.props.tag[this.props.tag.length - 1];	
		// The last one is the tag just created
		
		this.props.changeTagsValue('tags', [...this.props.tagsValue, {
			id: newTag._id,
			label: newTag.name,
			value: newTag.name
		}]);
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
							component={RenderTextField}
						/>
					</Grid>
					<Grid container spacing={2} style={{marginBottom: 3+'px'}}>
						<Grid item xs={12} sm={4}>
							<Field 
								name="category"
								id="category"
								label=""
								placeholder="Category"
								component={RenderSelect}
								options={ this.state.categoryOptions || [] }
							/>
						</Grid>
						<Grid item xs={12} sm={8}>
							<Field 
								name="tags"
								id="tags"
								label=""
								placeholder="Tags"
								isMulti={true}
								component={RenderCreatableSelect}
								options={this.state.tagOptions || []}
								handleCreateOption={this.handleCreateOption}
							/>
						</Grid>
					</Grid>				
					<Grid container style={{marginBottom: 10+'px'}}>
						<Button variant="outlined" color="default" >
							Featured Image&nbsp;&nbsp;<PanoramaOutlinedIcon></PanoramaOutlinedIcon>
						</Button>
					</Grid>
					<Field
						name="content"
						component={Editor} 
					/>
					<Container align="center" style={{paddingTop: 3+'rem'}}>						
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

const selector = formValueSelector('post');
const mapStateToProps = (state) => {
	const tagsValue = selector(state, 'tags');	// Get tags value from post form
	return {
		category: state.category,
		tag: state.tag,
		error: state.error,
		tagsValue: tagsValue || []
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		readCategories: () => dispatch(readCategories()),
		readTags: () => dispatch(readTags()),
		createTag: (data, callback) => dispatch(createTag(data, callback)),
		changeTagsValue: (field, value) => dispatch(change('post', field, value))
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	reduxForm({ 
		form: 'post', 
		fields: ['tags'],
		validate: validatePostInput,
		destroyOnUnmount: false,
		touchOnBlur: false,
		touchOnChange: true
	})
)(PostForm);
