import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import PageTitle from "../components/PageTitle";
import ArticleForm from "../components/forms/ArticleForm";
import { useReadArticleQuery } from "../features/article/services";
import useUserBlog from "../features/blog/useUserBlog";
import { useSnackbar } from "../components/SnackbarProvider";
import { ARTICLE_UPDATED, ARTICLE_UPDATED_ERROR } from "../settings/constants";

function EditArticle() {
  const { id = "" } = useParams();
  const { activeBlogAddress: blogAddress } = useUserBlog();
  const { data: { article } = {} } = useReadArticleQuery({ blogAddress, id });
  const { addSnackbar } = useSnackbar();

  if (!article) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <PageTitle title="Edit Article" />
      <ArticleForm
        article={article}
        onUpdateArticleSuccess={() =>
          addSnackbar({ message: ARTICLE_UPDATED, severity: "success" })
        }
        onUpdateArticleError={(error) => {
          addSnackbar({
            message: error,
            title: ARTICLE_UPDATED_ERROR,
            severity: "error",
          });
        }}
      />
    </Container>
  );
}

export default EditArticle;
