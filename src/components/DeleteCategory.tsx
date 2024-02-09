import { useCallback, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ConfirmDialog from "./ConfirmDialog";
import { Category } from "../features/category/types";
import { useDeleteCategoryMutation } from "../features/category/services";
import ErrorMessage from "./ErrorMessage";
import useUserBlog from "../features/blog/useUserBlog";
import SuccessMessage from "./SuccessMessage";
import { CATEGORY_DELETED, CATEGORY_FIXED_CACHE_KEY } from "../settings/constants";

type DeleteCategoryProps = {
  category: Category;
}

function DeleteCategory({ category }: DeleteCategoryProps) {
  const [open, setOpen] = useState(false);

  const { activeBlogAddress } = useUserBlog();
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation({fixedCacheKey: CATEGORY_FIXED_CACHE_KEY});

  const handleDeleteCategory = useCallback(() => {
    deleteCategory({
      blogAddress: activeBlogAddress,
      categoryId: category.id,
    });
  }, [category.id, activeBlogAddress]);

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
  )
}

export default DeleteCategory;