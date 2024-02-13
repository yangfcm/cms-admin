import { useCallback, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
import { useReadArticlesQuery } from "../features/article/services";
import useUserBlog from "../features/blog/useUserBlog";
import ArticlesTable from "../components/ArticlesTable";
import Loader from "../components/Loader";

function Articles() {
  const { activeBlogAddress } = useUserBlog();
  const { data, isError, isLoading, error } =
    useReadArticlesQuery(activeBlogAddress);

  return (
    <Container>
      <Typography variant="h5" sx={{ marginBottom: 1 }}>
        Articles Admin
      </Typography>
      <Divider />
      <br />
      {isLoading && <Loader />}
      {!isLoading && <ArticlesTable />}
    </Container>
  );
}

export default Articles;
