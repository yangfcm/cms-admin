import { useCallback, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ConfirmDialog from "./ConfirmDialog";
import { Tag } from "../features/tag/types";
import { useDeleteTagMutation } from "../features/tag/services";
import useUserBlog from "../features/blog/useUserBlog";
import { TAG_DELETE_FIXED_CACHE_KEY } from "../settings/constants";

type DeleteTagProps = {
  tag: Tag;
};

function DeleteTag({ tag }: DeleteTagProps) {
  const [open, setOpen] = useState(false);

  const { activeBlogAddress } = useUserBlog();
  const [deleteTag, { isLoading }] = useDeleteTagMutation({
    fixedCacheKey: TAG_DELETE_FIXED_CACHE_KEY,
  });

  const handleDeleteTag = useCallback(() => {
    deleteTag({
      blogAddress: activeBlogAddress,
      tagId: tag.id,
    });
  }, [tag.id, activeBlogAddress]);

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
