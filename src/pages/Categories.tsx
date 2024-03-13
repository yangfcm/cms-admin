import { useEffect } from "react";
import Container from "@mui/material/Container";
import { useReadCategoriesQuery } from "../features/category/services";
import useUserBlog from "../features/blog/useUserBlog";
import CategoriesTable from "../components/categories/CategoriesTable";
import Loader from "../components/Loader";
import PageTitle from "../components/PageTitle";
import { useSnackbar } from "../components/SnackbarProvider";
import parseError from "../utils/parseError";

function Categories() {
  const { activeBlog } = useUserBlog();
  const address = activeBlog?.address || "";
  const { data, isError, isLoading, isSuccess, error } =
    useReadCategoriesQuery(address);
  const { addSnackbar } = useSnackbar();

  useEffect(() => {
    if (isError) {
      addSnackbar({ message: parseError(error), severity: "error" });
    }
  }, [isError, error]);

  return (
    <Container>
      <PageTitle title="Categories Admin" />
      {isLoading && <Loader />}
      {!isLoading && isSuccess && (
        <CategoriesTable categories={data?.categories || []} />
      )}
    </Container>
  );
}

export default Categories;
