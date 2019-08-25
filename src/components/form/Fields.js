import React from 'react';
import TextField from '@material-ui/core/TextField';

export const RenderTextField = ({
	id, 
	type, 
	name,
	label,  
	autoFocus,
	placeholder,
	required,
	input,
	meta: { touched, error }
}) => {
	return (
		<React.Fragment>
			<TextField 
				variant="outlined"
				fullWidth
				margin="normal"
				type={type}
				id={id}
				name={name}
				label={label}
				placeholder={placeholder}
				autoFocus={autoFocus}
				required={required}
				{...input}
			/>
			{ touched && error && <span> {error} </span>}
		</React.Fragment>		
	);
}
