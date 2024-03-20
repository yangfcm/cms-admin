import { useEffect } from "react";
import Container from "@mui/material/Container";
import { useReadArticlesQuery } from "../features/article/services";
import useUserBlog from "../features/blog/useUserBlog";
import ArticlesTable from "../components/articles/ArticlesTable";
import Loader from "../components/Loader";
import PageTitle from "../components/PageTitle";
import { useSnackbar } from "../components/SnackbarProvider";
import parseError from "../utils/parseError";

function Articles() {
  const { activeBlogAddress } = useUserBlog();
  const { data, isError, isLoading, error } =
    useReadArticlesQuery(activeBlogAddress);
  const { addSnackbar } = useSnackbar();

  useEffect(() => {
    if (isError) {
      addSnackbar({ message: parseError(error), severity: "error" });
    }
  }, [isError, error]);

  return (
    <Container>
      <PageTitle title="Articles Admin" />
      {isLoading && <Loader />}
      {!isLoading && <ArticlesTable articles={data?.articles} />}
    </Container>
  );
}

export default Articles;
