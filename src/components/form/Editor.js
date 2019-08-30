import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class Editor extends React.Component {
	state = {
		text: this.props.input.value
	}

	handleTextChange = (value) => {
		this.setState({
			text: value
		});
		this.props.input.value = this.state.text;
		this.props.input.onChange(this.props.input.value);
	}

	render() {
		return (
			<ReactQuill
				value={this.state.text}
				onChange={this.handleTextChange}
				modules={Editor.modules}
				formats={Editor.formats}
				placeholder="Write your post..."  
				style={{height: 20+'rem'}}
			/>
		)
	}
}

/* 
 * Quill modules to attach to editor
 */
Editor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}], [{ color: [] }, { background: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'] 
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/* 
 * Quill editor formats 
 */
Editor.formats = [
  'header', 'font', 'size', 'color', 'background',
  'bold', 'italic', 'underline', 'strike', 'blockquote', 'code',
  'list', 'bullet', 'indent',
  'link', 'image'
]

export default Editor;