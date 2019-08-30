import React from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { TextField, FormControl, InputLabel } from '@material-ui/core';
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
				margin="dense"
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

export const RenderSelect = ({
	id,
	name,
	label,
	placeholder,
	options, 
	isClearable,
	isMulti,
	defaultValue,
	input: { onChange, value},
	meta: { touched, error },
}) => {
	return (
		<React.Fragment>
			<FormControl fullWidth>
				<label htmlFor={id}>
					{label}
				</label>
				<Select 
					id={id}
					name={name}
					value={value}
					options={options}
					onChange={onChange}
					isClearable={isClearable || false}
					isMulti={isMulti || false}
					placeholder={placeholder || 'Please select...'}
					defaultValue={ defaultValue || null}
				/>
			</FormControl>
			{ touched && error && 
				<FormHelperText error style={{ marginTop: '0'}}>{ error }</FormHelperText> 
			}
		</React.Fragment>
	)
};

export const RenderCreatableSelect = ({
	id,
	name,
	label,
	placeholder,
	options, 
	isClearable,
	isMulti,
	defaultValue,
	input: { onChange, value},
	meta: { touched, error },
}) => {
	return (
		<React.Fragment>
			<FormControl fullWidth>
				<label htmlFor={id}>{label}</label>
				<CreatableSelect 
					id={id}
					name={name}
					placeholder={placeholder || 'Please select...'}
					options={options}
					isClearable={isClearable || true}
					isMulti={isMulti || false}
					defaultValue={defaultValue || []}
					onChange={onChange}
					options={options}
					value={value}
				/> 
			</FormControl>
			{ touched && error && 
				<FormHelperText error style={{ marginTop: '0'}}>{ error }</FormHelperText> 
			}
		</React.Fragment>
	);
};