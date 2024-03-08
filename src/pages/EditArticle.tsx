import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import PageTitle from "../components/PageTitle";
import ArticleForm from "../components/forms/ArticleForm";
import { useReadArticleQuery } from "../features/article/services";
import useUserBlog from "../features/blog/useUserBlog";

function EditArticle() {
  const { id = "" } = useParams();
  const { activeBlogAddress: blogAddress } = useUserBlog();
  const { data: { article } = {} } = useReadArticleQuery({ blogAddress, id });

  if (!article) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <PageTitle title="Edit Article" />
      <ArticleForm article={article} />
    </Container>
  );
}

export default EditArticle;
