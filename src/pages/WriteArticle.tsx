import Container from "@mui/material/Container";
import PageTitle from "../components/PageTitle";
import ArticleForm from "../components/forms/ArticleForm";

function WriteArticle() {
  return (
    <Container>
      <PageTitle title="Write article" />
      <ArticleForm />
    </Container>
  );
}

export default WriteArticle;
