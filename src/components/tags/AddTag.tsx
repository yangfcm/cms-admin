import { useState } from "react";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormDialog from "../FormDialog";
import TagForm from "../forms/TagForm";

function AddTag() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        startIcon={<AddCircleIcon />}
      >
        Add Tag
      </Button>
      <FormDialog
        title="Add new tag"
        open={open}
        form={
          <TagForm
            onCancel={() => setOpen(false)}
            onCreateTagSuccess={() => setOpen(false)}
          />
        }
      />
    </>
  );
}

export default AddTag;
