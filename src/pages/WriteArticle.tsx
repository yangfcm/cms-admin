import Container from "@mui/material/Container";
import PageTitle from "../components/PageTitle";
import ArticleForm from "../components/forms/ArticleForm";
import { useSnackbar } from "../components/SnackbarProvider";
import { ARTICLE_CREATED, ARTICLE_CREATED_ERROR } from "../settings/constants";

function WriteArticle() {
  const { addSnackbar } = useSnackbar();

  return (
    <Container>
      <PageTitle title="Write article" />
      <ArticleForm
        onCreateArticleSuccess={() =>
          addSnackbar({ message: ARTICLE_CREATED, severity: "success" })
        }
        onCreateArticleError={(error) =>
          addSnackbar({
            message: error,
            title: ARTICLE_CREATED_ERROR,
            severity: "error",
          })
        }
      />
    </Container>
  );
}

export default WriteArticle;
