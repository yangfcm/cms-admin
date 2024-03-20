import { useCallback, useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ConfirmDialog from "../ConfirmDialog";
import { Tag } from "../../features/tag/types";
import { useDeleteTagMutation } from "../../features/tag/services";
import useUserBlog from "../../features/blog/useUserBlog";
import { TAG_DELETED } from "../../settings/constants";
import { useSnackbar } from "../SnackbarProvider";
import parseError from "../../utils/parseError";

type DeleteTagProps = {
  tag: Tag;
};

function DeleteTag({ tag }: DeleteTagProps) {
  const [open, setOpen] = useState(false);

  const { activeBlogAddress } = useUserBlog();
  const [deleteTag, { isLoading, isError, error, isSuccess, reset }] =
    useDeleteTagMutation();
  const { addSnackbar } = useSnackbar();

  const handleDeleteTag = useCallback(() => {
    deleteTag({
      blogAddress: activeBlogAddress,
      tagId: tag.id,
    });
  }, [tag.id, activeBlogAddress]);

  useEffect(() => {
    if (isError) {
      addSnackbar({ message: parseError(error), severity: "error" });
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      addSnackbar({ message: TAG_DELETED, severity: "success" });
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
        title={`Are you sure to delete the tag - ${tag.name}?`}
        onCancel={() => setOpen(false)}
        onConfirm={handleDeleteTag}
        confirmText="Delete"
        isLoading={isLoading}
      />
    </>
  );
}

export default DeleteTag;
