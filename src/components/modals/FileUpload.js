import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => {
	return {
		paper: {
			backgroundColor: theme.palette.background.paper,
    	border: '2px solid #aaa',
    	boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
			[theme.breakpoints.down('md')]: {
				width: '70%',
			},
			[theme.breakpoints.up('md')]: {
				width: '50%'
			},
			minHeight: '20%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center'
		}
	}
}

class FileUpload extends React.Component {
	state = {
		src: null,
	};

	handleSelectFile = (e) => {
		if(e.target.files && e.target.files.length > 0) {
			const reader = new FileReader();
			reader.addEventListener('load', () => {
				this.setState({
					src: reader.result,
					crop: {
						unit: '%',
						x: 10,
						y: 10,
						width: 80,
						height: 80 
					}
				})
			});
			reader.readAsDataURL(e.target.files[0]); 
		}
	}

	handleImageLoaded = (image) => {
		console.log(image);
		this.setState({
			imageRef: image
		});
	  // this.imageRef = image;
	}

	handleCropComplete = (crop) => { 
		// this.makeClientCrop(crop)
		this.setState({
			crop
		})
	}

	handleCropChange = (crop, percentCrop) => {
		this.setState({crop});
	}

	makeClientCrop = async (crop) => {
		if (this.state.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.state.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
	}

	getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          // console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }


	render() {
		const { classes } = this.props;		
		const { crop, croppedImageUrl, src } = this.state;

		return (
			<div className={classes.paper}>
				<Typography variant="h6" component="h1" align="center" gutterBottom={true}>
					Upload your image
				</Typography>
				<input 
					type="file" 
					accept="image/*"
					id="file-upload-input"
					style={{display: 'none'}}
					onChange={this.handleSelectFile} />
				<label htmlFor="file-upload-input">
					<Button component="span">
						Selecet File
					</Button>
				</label>
				
				{ src && (
					<ReactCrop 
						src={src}
						crop={crop}
						onImageLoaded={this.props.handleImageLoaded}
						// onComplete={this.handleCropComplete}
						onChange={this.handleCropChange}
					/>)
				}			
				<Button onClick={
					() => { 
						if(crop) this.props.handleMakeClientCrop(crop); 
						this.props.handleClose() 
					}
				}>OK</Button>
				{ croppedImageUrl && (
					<img src={croppedImageUrl} alt="cropped image url" /> 
				)}
			</div>
		)
	}
}

export default withStyles(styles)(FileUpload)