import Container from "@mui/material/Container";
import PageTitle from "../components/PageTitle";
import ArticleForm from "../components/forms/ArticleForm";

function EditArticle() {
  return (
    <Container>
      <PageTitle title="Edit Article" />
      <ArticleForm />
    </Container>
  );
}

export default EditArticle;
