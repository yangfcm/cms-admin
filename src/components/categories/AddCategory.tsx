import { useState } from "react";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormDialog from "../FormDialog";
import CategoryForm from "../forms/CategoryForm";
import { useSnackbar } from "../SnackbarProvider";
import { CATEGORY_CREATED } from "../../settings/constants";

function AddCategory() {
  const [open, setOpen] = useState(false);
  const { addSnackbar } = useSnackbar();

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        startIcon={<AddCircleIcon />}
      >
        Add Category
      </Button>
      <FormDialog
        title="Add a new category"
        open={open}
        form={
          <CategoryForm
            onCancel={() => setOpen(false)}
            onCreateCategorySuccess={() => {
              setOpen(false);
              addSnackbar({ message: CATEGORY_CREATED, severity: "success" });
            }}
            onCreateCategoryError={(error) => {
              addSnackbar({ message: error, severity: "error" });
            }}
          />
        }
      />
    </>
  );
}

export default AddCategory;
