import {
  useController,
  useFormContext,
  ControllerProps,
  UseControllerProps,
} from "react-hook-form";

type TextInputProps = React.DOMAttributes<HTMLInputElement> &
  UseControllerProps & {
    type?: string;
    label?: string;
    defaultValue?: string;
  };

function TextInput(props: TextInputProps) {
  const {
    label,
    name,
    rules,
    defaultValue,
    type = "text",
    ...inputProps
  } = props;
  const { field } = useController({ name, rules, defaultValue });
  const formContext = useFormContext();
  const {
    formState: { errors },
  } = formContext;

  if (!name || !formContext) return null;

  return (
    <div>
      {label && <label>{label}</label>}
      <input type={type} {...field} />
    </div>
  );
}

export default TextInput;
