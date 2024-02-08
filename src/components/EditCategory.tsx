import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CategoryForm from "./CategoryForm";
import FormDialog from "./FormDialog";
import { Category } from "../features/category/types";

type EditCategoryProps = {
  category: Category;
};

function EditCategory({ category }: EditCategoryProps) {
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
        title="Edit the category"
        open={open}
        form={<CategoryForm category={category} onCancel={() => setOpen(false)} />}
      />
    </>
  )
}

export default EditCategory;