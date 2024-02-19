import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import TagForm from "./forms/TagForm";
import FormDialog from "./FormDialog";
import { Tag } from "../features/tag/types";

type EditTagProps = {
  tag: Tag;
};

function EditTag({ tag }: EditTagProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title="Edit">
        <span>
          <IconButton onClick={() => setOpen(true)}>
            <ModeEditIcon />
          </IconButton>
        </span>
      </Tooltip>
      <FormDialog
        title="Edit the tag"
        open={open}
        form={
          <TagForm
            tag={tag}
            onCancel={() => setOpen(false)}
            onUpdateTagSuccess={() => setOpen(false)}
          />
        }
      />
    </>
  );
}

export default EditTag;
