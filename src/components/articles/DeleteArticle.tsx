import { useState, useCallback, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ConfirmDialog from "../ConfirmDialog";
import useUserBlog from "../../features/blog/useUserBlog";
import { useDeleteArticleMutation } from "../../features/article/services";
import { Article } from "../../features/article/types";
import { useSnackbar } from "../SnackbarProvider";
import { ARTICLE_DELETED } from "../../settings/constants";
import parseError from "../../utils/parseError";

type DeleteArticleProps = {
  article: Article;
};

function DeleteArticle({ article }: DeleteArticleProps) {
  const [open, setOpen] = useState(false);
  const { activeBlogAddress: blogAddress } = useUserBlog();
  const [deleteArticle, { isLoading, isError, error, isSuccess }] =
    useDeleteArticleMutation();

  const { addSnackbar } = useSnackbar();

  const handleDeleteArticle = useCallback(() => {
    deleteArticle({
      blogAddress,
      articleId: article.id,
    });
  }, [article.id, blogAddress]);

  useEffect(() => {
    if (isSuccess) {
      addSnackbar({ message: ARTICLE_DELETED, severity: "success" });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      addSnackbar({ message: parseError(error), severity: "error" });
    }
  }, [isError, error]);

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
        title={`Are you sure to delete the article - ${article.title}?`}
        onCancel={() => setOpen(false)}
        onConfirm={handleDeleteArticle}
        confirmText="Delete"
        isLoading={isLoading}
      />
    </>
  );
}

export default DeleteArticle;
