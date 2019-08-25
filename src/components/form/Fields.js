import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

export const RenderTextField = ({
	id, 
	type, 
	name,
	label,  
	autoFocus,
	placeholder,
	required,
	input,
	meta: { touched, error },
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
				error={ !!(touched && error) }
				{...input}
			/>
			{ touched && error && 
				<FormHelperText error style={{ marginTop: '0'}}>{ error }</FormHelperText> 
			}
		</React.Fragment>		
	);
}
