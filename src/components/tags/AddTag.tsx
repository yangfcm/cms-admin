import { useState } from "react";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormDialog from "../FormDialog";
import TagForm from "../forms/TagForm";
import { useSnackbar } from "../SnackbarProvider";
import { TAG_CREATED } from "../../settings/constants";

function AddTag() {
  const [open, setOpen] = useState(false);
  const { addSnackbar } = useSnackbar();

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
            onCreateTagSuccess={() => {
              setOpen(false);
              addSnackbar({ message: TAG_CREATED, severity: "success" });
            }}
            onCreateTagError={(error) => {
              addSnackbar({
                message: error,
                severity: "error",
              });
            }}
          />
        }
      />
    </>
  );
}

export default AddTag;
