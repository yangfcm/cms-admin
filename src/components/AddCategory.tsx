import { useState } from "react";
import Button from "@mui/material/Button";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormDialog from "./FormDialog";
import CategoryForm from "./CategoryForm";

function AddCategory() {
  const [open, setOpen] = useState(false);

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
        form={<CategoryForm onCancel={() => setOpen(false)} onCreateCategorySuccess={() => setOpen(false)} />}
      />
    </>
  )
}

export default AddCategory;