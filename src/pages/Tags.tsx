import { useEffect } from "react";
import Container from "@mui/material/Container";
import { useReadTagsQuery } from "../features/tag/services";
import useUserBlog from "../features/blog/useUserBlog";
import TagsTable from "../components/tags/TagsTable";
import Loader from "../components/Loader";
import PageTitle from "../components/PageTitle";
import { useSnackbar } from "../components/SnackbarProvider";
import parseError from "../utils/parseError";

function Tags() {
  const { activeBlogAddress } = useUserBlog();
  const {
    data,
    isError,
    isLoading: isReadingTags,
    error,
  } = useReadTagsQuery(activeBlogAddress);
  const { addSnackbar } = useSnackbar();

  useEffect(() => {
    if (isError) {
      addSnackbar({ message: parseError(error), severity: "error" });
    }
  }, [isError, error]);

  return (
    <Container>
      <PageTitle title="Tag admin" />
      {isReadingTags && <Loader />}
      {!isReadingTags && <TagsTable tags={data?.tags || []} />}
    </Container>
  );
}

export default Tags;
