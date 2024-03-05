import { useCallback, useEffect } from "react";
import Container from "@mui/material/Container";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
import { useReadArticlesQuery } from "../features/article/services";
import useUserBlog from "../features/blog/useUserBlog";
import ArticlesTable from "../components/articles/ArticlesTable";
import Loader from "../components/Loader";
import PageTitle from "../components/PageTitle";

function Articles() {
  const { activeBlogAddress } = useUserBlog();
  const { data, isError, isLoading, error } =
    useReadArticlesQuery(activeBlogAddress);

  return (
    <Container>
      <PageTitle title="Articles Admin" />
      {isLoading && <Loader />}
      {!isLoading && <ArticlesTable articles={data?.articles} />}
    </Container>
  );
}

export default Articles;
