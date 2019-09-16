import React from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const Greeting = (props) => { 
	const date = new Date();
	const hours = date.getHours();
	let greetingMsg;
	if(hours>=6 && hours <=17) {
		greetingMsg = 'Good day! Enjoy your time';
	} else  {
		greetingMsg = 'Good evening! How\'s your day going?'
	} 

	return (
		<ThemeProvider theme={theme}>
			<Container maxWidth='md'> 
				<Typography component="div" variant="h3" color="primary">
					<Box textAlign="center" m={2}>{greetingMsg}</Box>
				</Typography> 
			</Container>
		</ThemeProvider>
	)
}

export default Greeting;