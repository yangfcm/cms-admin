import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CategoryForm from "../forms/CategoryForm";
import FormDialog from "../FormDialog";
import { Category } from "../../features/category/types";
import { useSnackbar } from "../SnackbarProvider";
import { CATEGORY_UPDATED } from "../../settings/constants";

type EditCategoryProps = {
  category: Category;
};

function EditCategory({ category }: EditCategoryProps) {
  const [open, setOpen] = useState(false);
  const { addSnackbar } = useSnackbar();

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
        title="Edit the category"
        open={open}
        form={
          <CategoryForm
            category={category}
            onCancel={() => setOpen(false)}
            onUpdateCategorySuccess={() => {
              setOpen(false);
              addSnackbar({ message: CATEGORY_UPDATED, severity: "success" });
            }}
            onUpdateCategoryError={(error) => {
              addSnackbar({
                title: "Error",
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

export default EditCategory;
