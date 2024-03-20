import { useState } from "react";
import {
  Controller,
  useFormContext,
  UseControllerProps,
} from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./editorInput.css";

type EditorInputProps = UseControllerProps & {
  id?: string;
};

function EditorInput(props: EditorInputProps) {
  const { id, name } = props;
  const formContext = useFormContext();
  const { control } = formContext;
  const [value, setValue] = useState("");
  // return <ReactQuill theme="snow" value={value} onChange={setValue} />;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <ReactQuill
          theme="snow"
          value={field.value}
          onChange={(value) => field.onChange(value)}
        />
      )}
    ></Controller>
  );
}

export default EditorInput;
