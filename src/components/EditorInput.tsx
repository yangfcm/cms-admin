import React from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./editorInput.css";

function EditorInput() {
  const [value, setValue] = useState("");
  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}

export default EditorInput;
