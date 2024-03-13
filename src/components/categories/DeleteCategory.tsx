import { useCallback, useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ConfirmDialog from "../ConfirmDialog";
import { Category } from "../../features/category/types";
import { useDeleteCategoryMutation } from "../../features/category/services";
import useUserBlog from "../../features/blog/useUserBlog";
import { useSnackbar } from "../SnackbarProvider";
import { CATEGORY_DELETED } from "../../settings/constants";
import parseError from "../../utils/parseError";

type DeleteCategoryProps = {
  category: Category;
};

function DeleteCategory({ category }: DeleteCategoryProps) {
  const [open, setOpen] = useState(false);

  const { activeBlogAddress } = useUserBlog();
  const [deleteCategory, { isLoading, isError, error, isSuccess, reset }] =
    useDeleteCategoryMutation();
  const { addSnackbar } = useSnackbar();

  const handleDeleteCategory = useCallback(() => {
    deleteCategory({
      blogAddress: activeBlogAddress,
      categoryId: category.id,
    });
  }, [category.id, activeBlogAddress]);

  useEffect(() => {
    if (isError) {
      addSnackbar({ message: parseError(error), severity: "error" });
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      addSnackbar({ message: CATEGORY_DELETED, severity: "success" });
    }
  }, [isSuccess]);

  useEffect(() => {
    return reset;
  }, []);

  return (
    <>
      <Tooltip title="Delete">
        <span>
          <IconButton onClick={() => setOpen(true)}>
            <DeleteOutlineIcon />
          </IconButton>
        </span>
      </Tooltip>
      <ConfirmDialog
        open={open}
        title={`Are you sure to delete the category - ${category.name} ?`}
        onCancel={() => setOpen(false)}
        onConfirm={handleDeleteCategory}
        confirmText="Delete"
        isLoading={isLoading}
      />
    </>
  );
}

export default DeleteCategory;
