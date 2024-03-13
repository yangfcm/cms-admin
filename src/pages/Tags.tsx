import { useEffect, useMemo, useCallback } from "react";
import Container from "@mui/material/Container";
import { useReadTagsQuery } from "../features/tag/services";
import useUserBlog from "../features/blog/useUserBlog";
import TagsTable from "../components/tags/TagsTable";
import Loader from "../components/Loader";
import PageTitle from "../components/PageTitle";

function Tags() {
  const { activeBlogAddress } = useUserBlog();
  const {
    data,
    isError: isReadingTagsError,
    isLoading: isReadingTags,
    error: readTagsError,
  } = useReadTagsQuery(activeBlogAddress);

  return (
    <Container>
      <PageTitle title="Tag admin" />
      {isReadingTags && <Loader />}
      {!isReadingTags && <TagsTable tags={data?.tags || []} />}
    </Container>
  );
}

export default Tags;
