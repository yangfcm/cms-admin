import React from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {
  TextField,
  FormControl,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select as SimpleSelect
} from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";

/** Render text input (including number, hidden...) */
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
      <FormControl fullWidth margin="dense">
        <TextField
          variant="outlined"
          fullWidth
          type={type}
          id={id}
          name={name}
          label={label}
          placeholder={placeholder}
          autoFocus={autoFocus}
          required={required}
          error={!!(touched && error)}
          {...input}
        />
      </FormControl>
      {touched && error && (
        <FormHelperText error style={{ marginTop: "0" }}>
          {error}
        </FormHelperText>
      )}
    </React.Fragment>
  );
};

/** Use material-ui to render check box */
export const RenderCheckBox = ({ id, name, label, input: { onChange } }) => {
  return (
    <FormControlLabel
      control={<Checkbox id={id} name={name} onChange={onChange} />}
      label={label}
    />
  );
};

/** Render select(use react-select) */
export const RenderSelect = ({
  id,
  name,
  label,
  placeholder,
  options,
  isClearable,
  isMulti,
  defaultValue,
  input: { onChange, value },
  meta: { touched, error }
}) => {
  return (
    <React.Fragment>
      <FormControl fullWidth>
        <label htmlFor={id}>{label}</label>
        <Select
          id={id}
          name={name}
          value={value}
          options={options}
          onChange={onChange}
          isClearable={isClearable || false}
          isMulti={isMulti || false}
          placeholder={placeholder || "Please select..."}
          defaultValue={defaultValue || null}
        />
      </FormControl>
      {touched && error && (
        <FormHelperText error style={{ marginTop: "0" }}>
          {error}
        </FormHelperText>
      )}
    </React.Fragment>
  );
};

/** Render creatable select */
export const RenderCreatableSelect = ({
  id,
  name,
  label,
  placeholder,
  options,
  isClearable,
  isMulti,
  defaultValue,
  handleCreateOption,
  input: { onChange, value },
  meta: { touched, error }
}) => {
  return (
    <React.Fragment>
      <FormControl fullWidth>
        <label htmlFor={id}>{label}</label>
        <CreatableSelect
          id={id}
          name={name}
          placeholder={placeholder || "Please select..."}
          options={options}
          isClearable={isClearable || true}
          isMulti={isMulti || false}
          defaultValue={defaultValue || []}
          onChange={onChange}
          onCreateOption={handleCreateOption}
          value={value}
        />
      </FormControl>
      {touched && error && (
        <FormHelperText error style={{ marginTop: "0" }}>
          {error}
        </FormHelperText>
      )}
    </React.Fragment>
  );
};

/** Render select(use material-ui select component) */
export const RenderSimpleSelect = ({
  id,
  name,
  label,
  placeholder,
  options,
  input: { onChange, value },
  meta: { touched, error }
}) => {
  return (
    <React.Fragment>
      <FormControl fullWidth margin="dense">
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <SimpleSelect
          variant="outlined"
          value={value}
          onChange={onChange}
          inputProps={{ name, id }}
        >
          {options.map(option => {
            return (
              <MenuItem value={option.value} key={option.id}>
                {option.label}
              </MenuItem>
            );
          })}
        </SimpleSelect>
      </FormControl>
      {touched && error && (
        <FormHelperText error style={{ marginTop: "0" }}>
          {error}
        </FormHelperText>
      )}
    </React.Fragment>
  );
};
