import { useEffect, useMemo, useCallback } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {
  useCreateTagMutation,
  useDeleteTagMutation,
  useReadTagsQuery,
  useUpdateTagMutation,
} from "../features/tag/services";
import useUserBlog from "../features/blog/useUserBlog";
import TagsTable from "../components/TagsTable";
import {
  TAG_CREATE_FIXED_CACHE_KEY,
  TAG_DELETE_FIXED_CACHE_KEY,
  TAG_UPDATE_FIXED_CACHE_KEY,
} from "../settings/constants";
import ErrorMessage from "../components/ErrorMessage";

function Tags() {
  const { activeBlogAddress } = useUserBlog();
  const {
    data,
    isError: isReadingTagsError,
    isLoading: isReadingTags,
    error: readTagsError,
  } = useReadTagsQuery(activeBlogAddress);

  const [, createTagState] = useCreateTagMutation({
    fixedCacheKey: TAG_CREATE_FIXED_CACHE_KEY,
  });
  const [, updateTagState] = useUpdateTagMutation({
    fixedCacheKey: TAG_UPDATE_FIXED_CACHE_KEY,
  });
  const [, deleteTagState] = useDeleteTagMutation({
    fixedCacheKey: TAG_DELETE_FIXED_CACHE_KEY,
  });

  const hasError = useMemo(
    () =>
      isReadingTagsError ||
      createTagState.isError ||
      updateTagState.isError ||
      deleteTagState.isError,
    [isReadingTagsError, createTagState, updateTagState, deleteTagState]
  );

  const errorMessages = useMemo(
    () =>
      readTagsError ||
      createTagState.error ||
      updateTagState.error ||
      deleteTagState.error,
    [readTagsError, createTagState, updateTagState, deleteTagState]
  );

  const reset = useCallback(() => {
    createTagState.reset();
    updateTagState.reset();
    deleteTagState.reset();
  }, [createTagState.reset, updateTagState.reset, deleteTagState.reset]);

  useEffect(() => {
    reset();
  }, []);

  return (
    <Container>
      <ErrorMessage open={hasError} messages={errorMessages} onClose={reset} />
      <Typography variant="h5" sx={{ marginBottom: 1 }}>
        Tags Admin
      </Typography>
      <Divider />
      <TagsTable tags={data?.tags || []} />
    </Container>
  );
}

export default Tags;
