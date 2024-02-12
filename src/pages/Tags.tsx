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
  TAG_CREATED,
  TAG_CREATE_FIXED_CACHE_KEY,
  TAG_DELETED,
  TAG_DELETE_FIXED_CACHE_KEY,
  TAG_UPDATED,
  TAG_UPDATE_FIXED_CACHE_KEY,
} from "../settings/constants";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
import Loader from "../components/Loader";

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
      <SuccessMessage
        open={createTagState.isSuccess}
        message={TAG_CREATED}
        onClose={createTagState.reset}
      />
      <SuccessMessage
        open={updateTagState.isSuccess}
        message={TAG_UPDATED}
        onClose={updateTagState.reset}
      />
      <SuccessMessage
        open={deleteTagState.isSuccess}
        message={TAG_DELETED}
        onClose={deleteTagState.reset}
      />
      <Typography variant="h5" sx={{ marginBottom: 1 }}>
        Tags Admin
      </Typography>
      <Divider />
      <br />
      {isReadingTags && <Loader />}
      {!isReadingTags && <TagsTable tags={data?.tags || []} />}
    </Container>
  );
}

export default Tags;
