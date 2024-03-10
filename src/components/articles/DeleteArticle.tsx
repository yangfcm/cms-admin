import { useState, useCallback } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ConfirmDialog from "../ConfirmDialog";
import useUserBlog from "../../features/blog/useUserBlog";
import { useDeleteArticleMutation } from "../../features/article/services";
import { Article } from "../../features/article/types";

type DeleteArticleProps = {
  article: Article;
};

function DeleteArticle({ article }: DeleteArticleProps) {
  const [open, setOpen] = useState(false);

  const { activeBlogAddress: blogAddress } = useUserBlog();
  const [deleteArticle] = useDeleteArticleMutation();

  const handleDeleteArticle = useCallback(() => {
    deleteArticle({
      blogAddress,
      articleId: article.id,
    });
  }, [article.id, blogAddress]);

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
      />
    </>
  );
}

export default DeleteArticle;
