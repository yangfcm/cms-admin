import React from 'react';
import Typography from '@material-ui/core/Typography'; 

const footerStyle = {
	position: 'fixed', 
	bottom: 15,
	left: 50+'%',
	transform: 'translateX(' + -25 + '%)',
	background: '#fafafa'
}

const Footer = (props) => {
	return (
		<div style={footerStyle}>
			<Typography 
				variant="body2"
				color="textSecondary"
				align="center">
				Content Management System built by Fan.Y
			</Typography>
		</div>
	)
}

export default Footer;